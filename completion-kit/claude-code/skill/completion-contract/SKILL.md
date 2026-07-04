---
name: completion-contract
description: Enforce the Completion Contract on the current task — state definition of done up front, then close with ✅ DONE & VERIFIED / ⚠️ NOT DONE / 🔁 CONSISTENCY CHECK sections, evidence required. Use when the user invokes /completion-contract, asks for a "full completion check", or wants verification that work is actually finished, not just claimed.
---

# Completion Contract skill

Apply this discipline to the CURRENT task in this conversation, retroactively if work already happened.

## Steps

1. **State the definition of done** for the user's request in 1–2 lines: every surface, file, dashboard, doc, or config the change touches — not just the artifact the user named. If the request is part of a larger system, done includes that system staying consistent.

2. **Audit what actually happened against it.** For each item: was it done? Was it *verified* (command run, output observed, page loaded, test passed) or merely written and assumed? Re-run cheap verifications now rather than trusting memory of them. If the project has a self-test script (check the project rules/CLAUDE.md for one), run it.

3. **Fix what the audit exposes** — propagate missed surfaces, run missed tests — before reporting, unless a fix needs user input, in which case it goes in ⚠️ with a question.

4. **Close with exactly these sections:**
   - ✅ **DONE & VERIFIED** — only items with evidence; show the evidence (raw output, observed result). "Should work" is banned here.
   - ⚠️ **NOT DONE / NOT VERIFIED** — skipped, assumed, untested, deferred, or awaiting the user. Write "nothing" only if literally true.
   - 🔁 **CONSISTENCY CHECK** — sibling files/docs/dashboards/configs this change should ripple to, each marked updated / not-needed / missed-and-now-fixed.

## Rules

- No decorative output ever: placeholder data, dummy links, or non-functional UI elements are bugs, not drafts — label or remove.
- An untestable claim gets the word UNVERIFIED next to it, in the ⚠️ section.
- Ending the reply asserts the ⚠️ section is complete and true.
