// Stop-hook gate for Claude Code: the session cannot end while your self-test fails.
// EDIT THE TWO CONSTANTS BELOW, then wire this file in settings.json
// (see settings-snippet.json). Fails open on tooling errors — the gate must
// never brick a session for reasons unrelated to your system.
//
// Contract with your self-test script: exit 0 = pass (GREEN/AMBER),
// exit 1 = RED (critical failure). One summary line on stdout.
const { spawnSync } = require('child_process');

const SELFTEST = 'C:\\path\\to\\your\\selftest.js';          // EDIT ME
const FIX_HINT = 'Re-run the selftest after fixing. If a server is down, restart it first.'; // EDIT ME

let input = '';
try { input = require('fs').readFileSync(0, 'utf8'); } catch {}
let hook = {};
try { hook = JSON.parse(input); } catch {}

// stop_hook_active is set when a stop was already blocked once — never loop.
if (hook.stop_hook_active) process.exit(0);

const r = spawnSync(process.execPath, [SELFTEST], { timeout: 60000, encoding: 'utf8' });
if (r.error) process.exit(0); // tooling failure → fail open

const summary = (r.stdout || '').trim();

if (r.status === 1) {
  console.error('SELFTEST RED — do not end the turn yet. ' + summary + '\n' + FIX_HINT);
  process.exit(2); // blocks the stop; stderr is fed back to Claude to act on
}

console.log('selftest gate: ' + (summary || 'ok'));
process.exit(0);
