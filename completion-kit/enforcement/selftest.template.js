// Self-test template — layer 3 of the completion kit.
// Replace the EXAMPLE checks with checks for YOUR actual system, keep the
// harness. Contract: prints one summary line; exit 0 = GREEN/AMBER, exit 1 = RED.
// critical:true failures make it RED; critical:false only AMBER.
//
// Rules for good checks (learned the hard way):
// - Test outcomes, not intentions: "page contains the button" beats "file saved".
// - Round-trip what you can: write a probe, verify it landed, clean it up.
// - Freshness is a check: data older than its cadence = broken, whatever it says.
// - Every check must be able to FAIL. A check that can't fail is decoration.
const fs = require('fs');
const checks = [];

function check(name, critical, fn) {
  return Promise.resolve()
    .then(fn)
    .then((detail) => checks.push({ name, pass: true, critical, detail: detail || '' }))
    .catch((e) => checks.push({ name, pass: false, critical, detail: String(e.message || e).slice(0, 120) }));
}

(async () => {
  // ── EXAMPLE CHECKS — replace with your own ─────────────────────────────
  await check('example_file_exists', true, async () => {
    const p = 'C:\\path\\to\\something\\your\\system\\needs.json'; // EDIT ME
    if (!fs.existsSync(p)) throw new Error('missing ' + p);
    return 'present';
  });

  await check('example_data_fresh', true, async () => {
    const p = 'C:\\path\\to\\output\\your\\pipeline\\writes.json';  // EDIT ME
    const ageH = (Date.now() - fs.statSync(p).mtimeMs) / 36e5;
    if (ageH > 36) throw new Error(`stale: ${Math.round(ageH)}h old`);
    return `${Math.round(ageH)}h old`;
  });

  // await check('server_up', true, async () => { ... http GET, assert 200 + expected content ... });
  // await check('roundtrip', true, async () => { ... write probe, verify, clean up ... });
  // ────────────────────────────────────────────────────────────────────────

  const failCrit = checks.filter((c) => !c.pass && c.critical);
  const failSoft = checks.filter((c) => !c.pass && !c.critical);
  const status = failCrit.length ? 'RED' : failSoft.length ? 'AMBER' : 'GREEN';
  const report = { generated: new Date().toISOString(), status, pass: checks.filter((c) => c.pass).length, total: checks.length, checks };
  try { fs.writeFileSync(__dirname + '/selftest-report.json', JSON.stringify(report, null, 2)); } catch {}
  console.log(`SELFTEST: ${status} ${report.pass}/${report.total}` +
    (failCrit.length ? ' | CRITICAL: ' + failCrit.map((c) => c.name).join(', ') : '') +
    (failSoft.length ? ' | soft: ' + failSoft.map((c) => c.name).join(', ') : ''));
  process.exit(status === 'RED' ? 1 : 0);
})();
