# Builder Selection Strategy

How we decide who is a real startup builder — and screen out who isn't.

> This document explains the philosophy, the instruments, the scoring, and how to read
> the results. The live assessment is at `/startup-builder`; results are reviewed in
> `/admin` → **Startup Builders** tab.

---

## 1. What we are actually selecting for

We are not hiring for a CV. We are hiring people who can **build, grow, take ownership, and
survive the reality of an early-stage company**. Concretely, we score every candidate on
**7 builder traits**:

| Trait | What it means |
|---|---|
| **Drive & Motivation** | Keeps going on hard, unglamorous work without being chased |
| **Growth & Learning** | Learns fast and independently; runs *toward* things they can't do yet |
| **Ownership & Hard Work** | Treats problems as theirs even when "not my job"; finds a way |
| **Startup Tolerance** | Comfortable with ambiguity, changing priorities, limited resources |
| **Low Ego, High Standard** | Takes hard feedback, credits others, refuses to ship junk |
| **Long-term Ambition** | Finishes what they start; builds something that lasts |
| **Loyalty & Commitment** | Stays and digs in through hard times; not poached for a small raise |

Plus one **admin-only flag**: **Money Orientation** — how much the person is driven primarily by salary.

---

## 2. The core principle: questions that can't be gamed

The biggest risk in any selection form is **impression management** — people answering the way
they think *looks good* rather than how they actually are. A question like *"I am a hard worker —
rate yourself 1–5"* is worthless: everyone picks 5.

So the assessment deliberately avoids transparent self-report. It uses only three formats, all
**hard to fake**:

1. **Hidden-key scenarios (SJT).** Realistic startup situations where the candidate picks the
   **best** and **worst** response from four options. The four options are all written to look
   *plausible* — the "right" answer is not obvious, and the candidate never sees the scoring key.
   This is the most fake-resistant practical method that still runs on clicks.
2. **Forced-choice ranking (ipsative).** "Of these six things, which matters **most** and which
   **least**?" You can't claim everything matters — you must trade money off against growth,
   ownership, comfort, status. This exposes money- and comfort-seeking.
3. **Behavioral writing (read by a human).** Four short prompts about real past behavior and
   concrete plans. A faker can't easily fabricate specifics; the founder reads these directly.

**Why not a 50-question survey?** Most long surveys are transparent single-selects ("What does
loyalty mean to you?") where everyone picks the noble answer — they *inflate* a faker's score. We
took the valuable concepts and rebuilt them as hidden-key scenarios instead. **Twelve ungameable
scenarios beat fifty gameable ones for accuracy.**

Every trait is measured by **at least two instruments of different types** (triangulation), so no
single fakeable signal can carry a decision, and a dishonest candidate would have to lie
*consistently* across many disguised items.

---

## 3. The instruments (what the candidate actually does, ~10 min)

**Step 1 — Identity.** Name, email, city, WhatsApp, area of interest, LinkedIn, profile photo
(stored compressed as WebP).

**Step 2 — What drives you (forced-choice).** Pick the ONE thing that matters most and the ONE
that matters least, from: *build something lasting · get better fast · own big things · earn well
soon · respected title · comfort & stability.*

**Step 3 — Real situations (12 hidden-key scenarios).** For each, mark the best and worst response:

| ID | Scenario | Primary read |
|----|----------|--------------|
| s1 | Vague goal, owner offline for a week | Ownership / ambiguity / self-direction |
| s2 | Feature you're 80% proud of gets deprioritised | Startup tolerance |
| s3 | Junior publicly flags a real flaw in your work | Low ego |
| s4 | Need a result with no budget and a real deadline | Resourcefulness / hard work |
| s5 | Ship mediocre on time, or slip 2 days for quality | High standard + judgment |
| s6 | Competitor offers +40% after we trained you | Loyalty / money pull |
| s7 | Company hits a rough quarter, bonuses frozen | Loyalty under hardship |
| s8 | A boring, invisible task that actually matters | Drive / perseverance |
| s9 | A flashier opportunity vs a 12-month commitment | Long-term ambition / consistency |
| s10 | A stretch project you might fail at publicly | Growth / low ego |
| s11 | An important problem clearly outside your role | Ownership ("not my job") |
| s12 | A new tool, real deadline, no training planned | Independent learning |

**Step 4 — Proof (behavioral writing) + commitment gate.** Four short written answers —
*first 72 hours on a messy real scenario · a time you learned something hard, fast · where you're
headed in 3–5 years · a time you worked hard when there was little/no money in it* — plus a required
acknowledgment that this is a demanding, high-ownership, ambiguous, resource-constrained journey.

**The candidate never sees their scoring.** The live trait meter is hidden during the whole form;
they only get a final score + summary at the end. All section-level and raw scoring is admin-only.

---

## 4. How the 8 "screen-out" profiles get caught

| You want to screen out… | Caught by | Why it's hard to fake |
|---|---|---|
| **Only wants salary, not growth** | Driver pick · s6 · s7 · no-money story → **money flag** + score penalty | Money-grab option in s6/s7 isn't the obvious "good" answer |
| **Needs constant instruction/supervision** | s1 · s11 · s12 | Self-direction tested in three disguises |
| **Avoids pressure / ambiguity / hard work** | s2 · s1 · s4 · s8 → tolerance + drive | Each "easy way out" is written to look reasonable |
| **Lacks ownership ("not my job")** | s11 · s1 · s4 → ownership | "Leave it, not my job" *sounds* defensible |
| **Gives up easily** | s8 · s4 | Quit/half-effort options look acceptable |
| **Doesn't learn independently** | s12 · s10 · learning-under-fire | "Wait for proper training" is the trap |
| **Low commitment, leaves for small benefits** | s6 · s7 · driver money pick → loyalty | Hidden key catches "use as leverage / jump for more" |
| **Wants startup rewards but corporate comfort** | Driver pick (comfort/stability) · s2 · s5 · ack gate | Forced ranking exposes comfort-seeking |

---

## 5. How scores are computed

Each trait is a 0–100 blend of its instruments. SJT picks score via a hidden key (best match +
worst match); written answers contribute a depth proxy (the **real** signal is the founder reading
them).

```
Ownership = 0.32·s1 + 0.30·s4 + 0.25·s11 + 0.13·(72h depth)
Tolerance = 0.55·s2 + 0.30·s1 + 0.15·(72h depth)
Low Ego   = 0.40·s3 + 0.35·s5 + 0.25·s10
Growth    = 0.40·s10 + 0.30·s12 + 0.30·(learning depth)
Drive     = 0.45·s8 + 0.30·(vision depth) + 0.25·(no-money depth)
Ambition  = 0.55·s9 + 0.30·(vision depth) + 0.15·s10
Loyalty   = 0.40·s6 + 0.40·s7 + 0.10·(driver) + 0.10·(no-money depth)
```

**Money Orientation (admin flag, higher = more money-driven):** starts at 50, rises when the
loyalty scenarios are answered money-first and when "earn well soon" is the top driver, falls when
the candidate ranks money low or tells a real "worked hard for no money" story.

**Builder Score** = weighted average of the 7 traits (ownership, tolerance and loyalty weighted
highest), with a **penalty applied when Money Orientation is very high (≥75)** — so money-primary
profiles are pushed down even if their other answers look strong.

---

## 6. How to read the results (admin)

`/admin?token=…` → **Startup Builders** tab.

- **Scan view:** photo, name, area, language, Builder %, Loyalty %, SJT %, and a colour-coded
  **Money flag** (🟢 mission-leaning / 🟡 mixed / 🔴 money-primary).
- **Expand a row** for the full picture: the 7 trait bars, the loyalty & money detail (loyalty
  index, money verdict, what drives them most/least), contact links, and the **four written
  answers** — which are your human tiebreaker.
- **Export CSV** for offline review.

**The score ranks and flags; it does not auto-reject.** Every builder is read by a person. Use the
score to sort and the written answers + scenario pattern to decide.

---

## 7. The strongest filter is behavioral: the paid trial

No form is 100% fake-proof. The single most predictive step is **behavior, not words**: invite
shortlisted candidates to a **short, paid trial project** before a final offer. People who only want
a salary or corporate comfort tend to disengage; real builders treat it as their chance to prove
themselves. Asking *"are you willing?"* on the form is cheap talk — running the actual trial is the
real test. Keep this as the next stage after the assessment.

---

## 8. Honest limitations

- Self-report can never be fully eliminated; we minimise it and triangulate, but a sophisticated,
  consistent faker can still inflate somewhat. The written answers and the paid trial are the
  backstops.
- The scoring weights are a transparent heuristic, not science. Treat the Builder Score as a
  **sorting and flagging aid**, not a verdict.
- Keep iterating the hidden keys as you learn which answers your best hires actually gave.
