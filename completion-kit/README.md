# AI Completion Kit

Stops AI assistants from doing half-done work while claiming it's finished, and from confidently making things up. Works with any AI — prompt files are universal; machine-enforcement pieces are included for agentic tools (Claude Code today; the pattern ports anywhere that supports hooks).

Origin: built from real failures — an AI-assisted project that lost ~4 months and real money because the tools were tuned to help build instead of warning, followed by weeks of catching "done" claims that weren't. Public domain. No warranty; spot-checking the AI remains your job.

## The problem, in two halves

| Failure | Looks like | Fixed by |
|---|---|---|
| **Lying / guessing** | confident answers with invented facts, "tested" that never ran | `PROMPTS/truth-kernel.md` |
| **Quitting early** | the named task works, everything it touched is stale; silent scope shrink; decorative output | `PROMPTS/completion-contract.md` + machine gates |

Prompts alone help a lot but decay in long chats. The 90%+ zone comes from layering:

1. **Truth kernel** (prompt) — honesty, confidence labels, lead with failure modes
2. **Completion contract** (prompt) — forced ✅/⚠️/🔁 closing sections; empty sections are checkable lies
3. **Self-test** (script) — machine-checks that your actual system works (template included; you define the checks)
4. **Stop gate** (hook) — the AI literally cannot end its turn while the self-test fails
5. **Scheduled re-verify** (cron/routine) — daily sweep that leads its report with failures
6. **You** — read the ⚠️ sections; call out every slip. The AI drifts if nobody checks.

## Quick start by platform

- **ChatGPT / Gemini / any chat AI**: paste the CONTRACT block from `PROMPTS/completion-contract.md` and the KERNEL block from `PROMPTS/truth-kernel.md` into custom instructions / saved info. Done — layers 1–2.
- **Claude Code**: see `claude-code/INSTALL.md` — rule file (all projects), skill, and the Stop-hook gate (layers 1–4).
- **Cursor**: put both PROMPTS blocks in `.cursorrules` or a `.mdc` rules file.
- **Codex / agents reading AGENTS.md**: append both blocks to `AGENTS.md`.
- **Replit Agent**: paste both blocks at the start of a project's first prompt; re-paste when behavior drifts (no persistent rules surface).

## Files

```
PROMPTS/completion-contract.md   universal anti-half-done contract (paste block + rationale)
PROMPTS/truth-kernel.md          universal anti-hallucination kernel (paste block)
claude-code/INSTALL.md           step-by-step for Claude Code (rules, skill, hook)
claude-code/rules/completion-contract.md      drop into ~/.claude/rules/common/
claude-code/skill/completion-contract/SKILL.md  drop into ~/.claude/skills/
claude-code/hooks/stop-gate.js   Stop-hook gate (blocks ending on failing self-test)
claude-code/hooks/settings-snippet.json       hook wiring for settings.json
enforcement/selftest.template.js een template — replace the example checks with YOUR system's checks
```

## See also

**[LIES.md](https://github.com/dario933/ai-truth-checklist/blob/main/LIES.md)** — the field guide: 13 categories of what AIs lie about (fake memory, summary drift, correction theater, reward hacking, invented packages…), each with the prompt that catches it. This kit is the structural fix for categories 11–13; the guide covers the rest.

## Honest limits

- A contract nobody reads stops working — models learn within a chat what goes unchecked.
- The stop gate only exists where hooks exist (Claude Code today). Chat AIs get layers 1–2 only.
- Percentages are estimates from field use, not benchmarks. Structure makes drift harder, not impossible.
