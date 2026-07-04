# Installing the kit in Claude Code

Three pieces, in order of impact. Piece 1 alone gets most of the prompt-level benefit.

## 1. Rules file → every session, every project (2 minutes)

Copy `rules/completion-contract.md` to:
```
~/.claude/rules/common/completion-contract.md      (Windows: C:\Users\<you>\.claude\rules\common\)
```
Also paste the KERNEL block from `PROMPTS/truth-kernel.md` into a sibling rules file if you don't already have honesty rules. New sessions load these automatically. Already-running sessions won't see them until restarted.

## 2. Skill → on-demand deep audit (2 minutes)

Copy the `skill/completion-contract/` folder to:
```
~/.claude/skills/completion-contract/
```
Then in any session: `/completion-contract` → the model audits the current task against the contract, re-verifies claims, fixes gaps, and reports in ✅/⚠️/🔁 sections. Useful mid-conversation when you suspect a "done" that isn't.

## 3. Stop-hook gate → machine enforcement (30 minutes, needs a self-test)

This is the layer that doesn't depend on the model remembering anything.

1. Build a self-test for YOUR system from `../enforcement/selftest.template.js` — replace the example checks with real ones (server up? data fresh? round-trip works?). Rule of thumb: every check must be able to fail.
2. Edit the two EDIT-ME constants in `hooks/stop-gate.js` (path to your selftest + a fix hint).
3. Merge `hooks/settings-snippet.json` into your **project's** `.claude/settings.json` (project scope recommended — a global gate blocks unrelated projects on your system's failures).
4. Test both paths before trusting it:
   ```
   echo {} | node stop-gate.js            → expect exit 0 when healthy
   (break your system deliberately)
   echo {} | node stop-gate.js            → expect exit 2 + fix instructions
   ```
   An untested gate is exactly the decorative non-working element this kit exists to prevent.

Result: any Claude Code session in that project that tries to end while your self-test is RED gets blocked once, told what's broken, and fixes it before finishing.
