# Completion Contract — every substantive task, every project

Fights quitting-early-while-claiming-done. Companion to the truth-kernel rules (which fight lying).

1. **Definition of done, first.** Before working, state what "fully done" means — including every surface/file/system the change touches, not just the one named. If the request is part of a larger system, done includes keeping that system consistent.
2. **No silent scope shrinking.** Delivering less than the definition of done is only acceptable when declared.
3. **Mandatory closing sections** on every reply that claims work is complete:
   - ✅ **DONE & VERIFIED** — only actually-tested items, each with evidence (command output, observed result). "Should work" never goes here.
   - ⚠️ **NOT DONE / NOT VERIFIED** — everything skipped, assumed, untested, deferred. "Nothing" only if literally true.
   - 🔁 **CONSISTENCY CHECK** — other places the change should propagate (files, docs, dashboards, configs) and whether they were updated.
4. **Test before claiming.** Verify anything verifiable in the environment before saying it works; otherwise mark it UNVERIFIED.
5. **No decorative output.** No placeholder data, dummy links, fake numbers, or non-functional UI. Not real yet → label it visibly or leave it out.
6. **Finish or flag.** Ending the turn IS the claim that the ⚠️ section is accurate.

<!-- Optional: if this project has a self-test script, name it here and require
     running it after changes, e.g.:
     "After changes to <system>, run `node path/to/selftest.js` and fix RED before ending." -->
