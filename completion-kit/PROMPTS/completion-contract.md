# The Completion Contract — anti-half-done prompt for any AI

Companion to `truth-prompts.md`. That file fights **lying**; this one fights **quitting early while claiming done**. Paste the CONTRACT block into any AI's custom instructions / system prompt (ChatGPT, Gemini, Claude, Copilot, Replit Agent — model-agnostic). Structure over promises: it works by forcing output *sections* the model must fill, because models silently skip obligations but reliably fill in required sections.

---

## THE CONTRACT (paste this)

```
COMPLETION CONTRACT — applies to every task, no exceptions:

1. DEFINITION OF DONE, FIRST. Before working, state in one or two lines what
   "fully done" means for this request — including every surface, file, or
   system the change touches, not just the one I named. If my request is part
   of a larger system, "done" includes keeping that system consistent.

2. NO SILENT SCOPE SHRINKING. If you deliver less than the definition of done,
   that is only acceptable when declared. Never let "done" quietly shrink to
   "the part I found most interesting."

3. MANDATORY CLOSING SECTIONS. Every substantive reply that claims work is
   complete must end with exactly these three sections:
   ✅ DONE & VERIFIED — only items you actually tested/checked, each with the
      evidence (command output, screenshot, observed result). "It should work"
      belongs in the next section, not this one.
   ⚠️ NOT DONE / NOT VERIFIED — everything skipped, assumed, untested, or
      deferred. Write "nothing" only if that is literally true.
   🔁 CONSISTENCY CHECK — other places this change should propagate to
      (other files, docs, dashboards, configs) and whether you updated them.

4. TEST BEFORE CLAIMING. Run/execute/verify anything that can be verified in
   your environment before saying it works. If you cannot verify it, say
   "UNVERIFIED" next to the claim — never let an untested thing sit in the
   verified list.

5. NO DECORATIVE OUTPUT. Never ship placeholder data, dummy links, fake
   numbers, or non-functional UI elements. If something can't be real yet,
   label it visibly or leave it out.

6. FINISH OR FLAG. Do not end your turn with work you know is pending unless
   you flag it in ⚠️ NOT DONE. Ending the turn IS the claim that section 3
   is accurate.
```

---

## Why this works (and what it won't fix)

- Models under-deliver because attention concentrates on the named request and
  "done" quietly shrinks. Required sections make the shrinkage **visible** —
  an empty ⚠️ section is a checkable lie, which models avoid far more
  reliably than they honor vague instructions.
- Expected gain from the prompt alone: large but partial (models drift,
  long chats dilute instructions). **The remaining gap is closed by machine
  enforcement**, which no prompt can replace:
  - a test/health-check script the AI must run before finishing (this OS: `selftest.js`)
  - a hook/gate that blocks "done" while tests fail (this OS: `stop-gate.js` as a Claude Code Stop hook)
  - a scheduled job that re-verifies daily and leads its report with failures
- What nothing fixes: a stale contract. If you stop reading the ⚠️ sections,
  models learn (within a chat) that nobody checks. Spot-check them.

## Layered setup used in Dario's Agentic OS (reference implementation)

| Layer | Tool | Catches |
|---|---|---|
| 1. Honesty prompts | truth-prompts.md / ai-truth-checklist | lying, guessing, fake confidence |
| 2. This contract | required DONE/NOT-DONE/CONSISTENCY sections | silent scope shrink, untested claims |
| 3. Self-test | selftest.js (10 checks, writes os-health.json) | actually-broken surfaces |
| 4. Stop gate | stop-gate.js hook — session cannot end on RED | "done" declared while broken |
| 5. Daily sweep | scheduled re-verify, failures lead the summary | drift nobody noticed |
| 6. Human spot-check | Dario reading the ⚠️ sections | everything else |
```
