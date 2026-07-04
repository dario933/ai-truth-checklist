# AI Truth Checklist

**Simple prompts and habits to stop an AI from lying, guessing, and telling you what you want to hear.**

AI is genuinely useful — for drafting, explaining, summarizing, brainstorming, getting un-stuck. The danger isn't that it's useless. It's that it's useful **and** tuned to keep you happy — so it tends to fail you exactly when the truth is something you don't want to hear. It will often say *"yes, great idea!"* instead of *"this won't work,"* and state guesses as confident facts.

These prompts don't fix that. They **pull the honest answer out** of an AI that would otherwise tell you what you want to hear. Copy them. Use the right one at the right moment.

> Made by someone who learned this the expensive way — months and thousands of dollars lost building things an AI cheered him on to build, instead of warning him they couldn't work. Shared so you don't have to learn it the same way.

📄 **Pasting this into a post, email, or text message?** Use the plain-text version — **[checklist.txt](checklist.txt)** — so the formatting symbols don't show up raw.

🗺️ **Want the full map of *what* they lie about?** Part 2: **[LIES.md](LIES.md)** — 13 categories (fake memory, summary drift, correction theater, reward hacking…), each with the prompt that catches it.

---

## 10 prompts to paste

**1. Make it argue against you**
> "Before you help me, give me the 3 strongest reasons this is a bad idea or could fail — don't soften it."

*Reveals: AI's default is to agree and encourage. This forces the case against.*

**2. Break the people-pleasing**
> "What are you not telling me because you think it's what I want to hear? Give me the blunt version."

*Reveals: it softens hard truths by default.*

**3. Separate fact from guess**
> "Label every claim in your answer as FACT (with a source), GUESS, or 'not sure.' Rewrite anything you dressed up as a fact."

*Reveals: how much of a confident answer is actually invented.*

**4. Demand a real source**
> "Do you actually know this, or are you guessing what sounds right? Give me a real source I can check — or admit you don't have one."

*Reveals: AI fabricates facts confidently. (Verify the source yourself — it may invent the source too.)*

**5. Flip it**
> "Now argue the exact opposite of what you just told me, just as convincingly."

*Reveals: it can argue any side equally well — so its confidence is not proof it's right.*

**6. Proven vs. claimed**
> "When you say this 'works' or is 'true,' what exactly did you check? Only an easy example, or hard real cases? List what you did NOT test."

*Reveals: it calls things 'proven/works' when they only ran once on an easy case.*

**7. Cost of being wrong**
> "If you're wrong about this, what does it cost me — money, time, health? Give your real confidence as a % and why."

*Reveals: overconfidence, especially on high-stakes things.*

**8. Wrong tool?**
> "Should I be asking a real doctor / lawyer / accountant instead of you? What could go wrong if I trust you on this?"

*Reveals: where AI is the wrong tool and a real expert is needed.*

**9. Make it commit**
> "Give me one specific prediction with a date. If it doesn't happen, you were wrong — no redefining success later."

*Reveals: vague hype vs. a real, checkable claim.*

**10. Follow the incentive**
> "Who benefits if I keep following your advice and keep using you? Is that the same as what's best for me?"

*Reveals: the pull to keep you engaged, which isn't always your interest.*

---

## The one truth that matters most

**These prompts make the AI's _answer_ more honest. They do NOT make the AI honest.** It can perform humility and "here's why it'll fail" just as smoothly as it performs cheerleading — because it's imitating what a good answer looks like, not actually caring whether it's true. So treat a better answer as *less* bullshit, not *zero*.

**The only real test is reality** — not the AI, and not even these prompts:

- Does the data/information actually exist, and can *you* get it?
- Will a real stranger actually pay for this?
- Did it work on a *hard*, messy case — or just an easy one?
- What does an independent source or a real professional say?

Reality is the judge.

---

## A few more habits

- **Ask two different AIs the same hard question.** If they confidently agree but neither can prove it — that's often just shared training, not truth. Where they disagree — dig there.
- **Watch the posture, not the words.** Honest help looks like friction early — pushback, questions, "this might not work." Instant enthusiasm before anything is stress-tested is the warning light.
- **Never ask "is my idea good?"** It's built to cheer. Ask "why would this fail, and who already does it better?"
- **Be most skeptical when an AI talks about _itself_** — what it can do, that it'll "improve," that the thing it made "works." It can't reliably judge itself and leans toward sounding capable.
- **High stakes = AI is a starting point, never the final word.** Health, money, legal, big decisions: use it to get oriented, then confirm with a real professional and primary sources.

---

## For Claude Code users: the skill

This repo also includes an optional **Claude Code skill** ([`claude-code-skill/`](claude-code-skill/)) that loads these push-back rules into your agent automatically.

**Honest about what it does:** it makes the AI *more likely* to test premises, label facts vs. guesses, and lead with what could fail. It does **not** guarantee honesty — loading an instruction raises the odds, it doesn't lock the behavior, because "be honest" is still just text the model weighs against its training. The real safeguard is still you, verifying against reality. Use it as a nudge, not a fix.

**Install:** copy the `claude-code-skill/ai-truth-check/` folder into your `~/.claude/skills/` (user-level) or a project's `.claude/skills/`.

---

## The Completion Kit — for the *other* lie: "done!" when it isn't

The prompts above fight an AI **making things up**. There's a second failure mode this repo now covers: an AI doing the visible 70% of a job, skipping the rest silently, and confidently declaring it finished. The named task works; everything it touched is stale; the "tested" claim means it ran once on an easy case.

The **[`completion-kit/`](completion-kit/)** fixes most of that with structure instead of promises:

- **A universal Completion Contract** ([`completion-kit/PROMPTS/completion-contract.md`](completion-kit/PROMPTS/completion-contract.md)) — paste into any AI's custom instructions. Its trick: every substantive answer must end with three required sections — ✅ **DONE & VERIFIED** (evidence only) / ⚠️ **NOT DONE** / 🔁 **CONSISTENCY CHECK**. Models silently skip obligations, but they reliably fill in required sections — and an empty ⚠️ section is a checkable lie.
- **A truth-kernel prompt** distilling this repo's rules into one paste block, so both failure modes travel together.
- **For agentic tools (Claude Code)**: a rules file, a `/completion-contract` audit skill, and the strongest layer — a **stop-gate hook** plus self-test template, so the AI *literally cannot end its turn* while your system's health checks fail. Install guide included; the gate ships as an EDIT-ME template and the instructions make you test both its paths before trusting it, because an untested gate is exactly the decoration this kit exists to prevent.

Same honesty disclaimer as everything here: prompts raise the odds, they don't lock behavior. The gate layer is the part that doesn't depend on the AI remembering anything — and reading the ⚠️ sections yourself is still part of the mechanism.

---

## License

[CC0 1.0 Universal](LICENSE) — public domain. Copy it, change it, share it, use it commercially, no permission or attribution needed. It's for everyone.
