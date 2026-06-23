# Recruitment Funnel — End-to-End Selection Design

The unifying design for how TransMetaTek selects people: one funnel for both
professional hires and startup builders, grounded in what actually predicts job
performance.

> This is the parent document. The existing [`builder-selection-strategy.md`](builder-selection-strategy.md)
> describes the character assessment in detail; this document places that assessment
> inside a complete, evidence-based pipeline and extends it to professional hires.
>
> Status: **built.** All 7 phases of the roadmap (§10) are implemented and verified
> end-to-end as of 2026-06-23. The three application tracks (job, internship, builder)
> now share one questionnaire workflow.

---

## 1. Why this document exists

Today we run two disconnected flows:

- **Professional hires** — the `apply.astro` form. Captures a profile and computes a
  "match score" that is really a *completeness* score (role selected, experience
  provided, LinkedIn present, word count). None of those predict performance well.
- **Startup builders** — the `startup-builder.astro` assessment. A genuinely strong,
  fake-resistant character assessment (hidden-key SJT, ipsative drivers, behavioral
  writing). Already close to best practice.

The decision (June 2026) is to **unify these into one funnel** so both tracks share the
same evidence-based stages, the same scoring discipline, and the same decision surface
in admin — with a track/role flag controlling how much capability rigor applies.

---

## 2. The evidence base

Meta-analytic research on selection-method validity (Schmidt & Hunter 1998, **corrected**
by Sackett, Zhang, Berry & Lievens 2021–22) ranks what predicts on-the-job performance:

| Method | Validity | Note |
|---|---|---|
| Structured interview | Strong | Highest after the 2022 correction |
| Job-knowledge test | Strong | Timed Q&A — fake-resistant, *not* a work sample |
| Work sample test | Strong | **We are opting out — see §3** |
| Cognitive ability (GMA) | Strong | Adverse-impact concerns |
| Integrity / SJT (hidden key) | Moderate | We already use this |
| Conscientiousness / drive | Moderate | The builder-trait layer |
| Unstructured interview | Weak | The common default |
| Years of experience | Weak | Surprisingly low |
| Years of education | Very weak | |
| References (unstructured) | Near zero | Strong only if *structured* |

Five design principles fall out of this and govern the whole funnel:

1. **Define "great" before meeting anyone** — write the scorecard first (§4).
2. **Structure everything** — same questions, same order, anchored rating scales.
   Structure matters more than which method you pick.
3. **Mechanical beats holistic** — sum rubric scores by formula, *then* discuss (Meehl).
4. **Assess fewer things, deeply** — 3–5 attributes measured well beats 12 impressions.
5. **Design against faking** — SJT hidden keys, ipsative formats, behavioral evidence
   over claims. (Already the spine of the builder assessment.)

---

## 3. The "no work samples" constraint — read this first

We have decided **not** to use take-home work samples or paid work trials, for market and
bandwidth reasons. This is a deliberate trade-off with a real cost:

- Work samples and paid trials are two of the **strongest** predictors in §2. The current
  `builder-selection-strategy.md` §7 explicitly calls the paid trial "the single most
  predictive step."
- Removing them **lowers the ceiling accuracy** of the funnel. The load shifts onto the
  three methods we keep, which must therefore be run rigorously or quality drops sharply:
  1. **Structured interviews** (the top remaining predictor) — done with anchored rubrics,
     not freestyle conversations.
  2. **Hidden-key SJTs** — already strong; generalized to both tracks.
  3. **Job-knowledge tests** — *timed questions with a scoring key, not an artifact to
     build.* This is distinct from a work sample and is the recommended capability
     instrument. It can be dropped if even this is too heavy, at a further accuracy cost.
  4. **Structured reference checks** — behavioral, specific, "would you hire again."

> Reintroducing a single short paid trial for finalists is the **highest-value future
> addition** to this funnel. The design leaves a clean slot for it at Stage 4.

---

## 4. Stage 0 — the scorecard (the foundation)

Before any candidate, each role gets a scorecard. We assess two layers:

**Character layer (shared across both tracks).** The existing 7 builder traits plus the
money-orientation flag, measured by the ungameable instruments already built:

> Drive · Growth · Ownership · Startup tolerance · Low ego/high standard ·
> Long-term ambition · Loyalty  (+ money-orientation flag)

**Capability layer (role-specific, sized to the role).** What the person must be able to
*do*. For professional roles this is technical/domain depth, problem-solving, and — since
we are a consultancy — client-ready communication.

| Track | Character layer | Capability layer |
|---|---|---|
| Startup builder | Full (7 traits) — primary | Light (area of interest only) |
| Professional hire | Full (7 traits) — shared | Heavy (role skills + knowledge + comms) |

Each scorecard attribute needs **anchored levels** written in advance — what a 1, a 3, and
a 5 actually look like — so every later score means the same thing across interviewers.
These anchors live alongside the role definitions in `src/lib/skills.ts`.

---

## 5. The unified funnel, stage by stage

| Stage | Purpose | Instrument | Fake-resistance | Lives in |
|---|---|---|---|---|
| 0 · Define the bar | Set the scorecard | Attributes + anchors | n/a | `skills.ts` |
| 1 · Apply & screen | Knockouts + profile | Form, hard filters | n/a | `apply.astro` |
| 2 · Async assessment | Character + capability | SJT + ipsative + writing + job-knowledge test | High | unified assessment |
| 3 · Structured interview | Deep, role-specific | Behavioral + situational, anchored | High | admin interview kit |
| 4 · (Trial — reserved) | *Removed for now* | *paid trial slot* | Highest | future |
| 5 · Decide | De-biased call | Mechanical combine → committee | n/a | `admin.astro` |
| 6 · Calibrate | Improve the funnel | Predicted vs actual at 3–6 mo | n/a | admin + DB |

### Stage 1 — Apply & screen
Two jobs only: **knock out** the disqualified (location, work authorization, hard
requirements) and **capture a structured profile**. Output is `pass / hold / reject`, not
a fake-precise percentage. The current completeness "match score" is retired here — it is
replaced by routing into Stage 2, where the real signal is collected.

### Stage 2 — Async assessment
Every candidate, both tracks, takes the **character assessment** (the existing 12
hidden-key scenarios + ipsative drivers + behavioral writing, read by hand). Professional
candidates *additionally* take a **job-knowledge test**: a short, timed set of role-relevant
questions with a hidden scoring key. This is the fake-resistant substitute for a work
sample — there is nothing to build, only questions answered under time. Skills self-ratings
are kept only as a conversation-starter and filter, never as a score (self-report is weak).

### Stage 3 — Structured interview
The top remaining predictor, so it carries the most weight. Same questions, same order,
every candidate. Each interviewer owns one or two scorecard attributes and scores against
the anchors **before** comparing notes. Mix **behavioral** ("tell me about a time…") and
**situational** ("what would you do if…"). For both tracks, probe the written answers from
Stage 2 live: "you wrote X — walk me through exactly what you did."

### Stage 4 — Trial (reserved, not built)
Intentionally empty. The slot exists so a short paid trial can be added later without
restructuring the funnel. Until then, Stage 3 + references carry this weight.

### Stage 5 — Decide
Combine the scorecard scores **mechanically** into a ranked shortlist first. *Then* a
hiring committee — or a single bar-raiser (a trained reviewer with veto, guarding the bar
against urgency pressure) — reviews. The score sorts and flags; a person decides. Structured
reference checks happen here: behavioral, specific, talk to people who managed them and
were managed by them.

### Stage 6 — Calibrate
Record each hire's predicted scores. At 3–6 months, score their actual performance and
check which signals predicted. Drop signals that don't. This is the loop that turns the
heuristic weights in §6 into something that actually tracks reality — and the only honest
answer to "is our funnel working."

---

## 6. The scoring model

Reuse the builder math that already exists (`builder-selection-strategy.md` §5): each trait
is a 0–100 blend of its instruments, triangulated so no single fakeable signal carries a
decision. The unified model adds a parallel **capability score** for professional roles:

```
Character score  = weighted avg of 7 builder traits        (existing math)
Capability score = 0.55·job-knowledge + 0.45·interview-capability   (professional only)
Money flag       = admin-only, penalizes character score when ≥ 75  (existing)

Overall (builder track)      = Character score
Overall (professional track) = w·Character + (1−w)·Capability,  w set per role
```

All combination is **mechanical** — computed, not eyeballed. The overall number is a
**sorting and flagging aid, not a verdict** (same stance as the builder doc). Every
candidate is read by a person before any decision.

---

## 7. Unifying the data model

Today: separate `applications` and `builder_applications` tables. The unification does not
require merging them immediately; it requires a **shared assessment layer** both can write
to. Recommended direction:

- A shared `assessments` concept holding the character instruments (SJT picks, drivers,
  writing, trait scores, money flag) — already the shape of the builder columns.
- A `track` field (`professional` | `builder`) and a `role` reference on every candidate.
- Capability columns (`job_knowledge_score`, interview scorecards) populated only for the
  professional track.
- Interview scorecards as their own rows (one per interviewer per attribute) so Stage 3
  scoring is independent and auditable.

Migrations follow the existing Drizzle workflow (`db:generate` → `db:migrate`). Detailed
schema is deferred to the build phase — see §10.

---

## 8. The decision surface (admin)

`admin.astro` is already the right Stage 5 surface — it shows scores, trait bars, written
answers, and a verdict. To complete the funnel it needs:

- **Independent interviewer score entry** (Stage 3) — not a rebuild, an addition.
- **Mechanical roll-up** of character + capability into the ranked shortlist.
- **Scorecard anchors visible** next to each score so reviewers calibrate consistently.
- **Calibration fields** (Stage 6) — predicted vs. later actual performance.

---

## 9. Honest limitations

- Removing work samples and trials lowers the funnel's ceiling (§3). The structured
  interview and references *must* be run rigorously to compensate.
- Self-report can never be fully eliminated; we minimize and triangulate it.
- The scoring weights are a transparent heuristic, not validated science. Stage 6
  calibration is what makes them trustworthy over time — without it, they are educated
  guesses.
- A sophisticated, consistent faker can still inflate somewhat. Behavioral writing read by
  a human and structured references are the backstops now that the trial is gone.

---

## 10. Build roadmap

| Phase | Deliverable | Depends on | Status |
|---|---|---|---|
| 1 | Stage 0 scorecards — attributes + anchors | — | **Built** — `src/lib/skills.ts` (`ROLE_CHARACTER_WEIGHT`, `ROLE_CAPABILITY_FOCUS`) + anchors already in `interview-questions.ts` |
| 2 | Retire the completeness score in `apply.astro`; make Stage 1 a screen | Phase 1 | **Built** — `screenStatus` (pass/hold/reject) on all 3 tables, set by admin via `api/screen.ts`; candidate-facing "match score" language removed |
| 3 | Port the character assessment to the professional track (one funnel) | Phase 1 | **Built** — `src/lib/character-assessment.ts` + shared `/startup-builder?track=job\|internship&id=` redirect flow, scored server-side in `api/assessment.ts` |
| 4 | Add the job-knowledge test (capability layer) | Phase 1, 3 | **Built** — `src/lib/job-knowledge.ts` + `api/job-knowledge.ts`, timed MCQ step after the character assessment (job track only) |
| 5 | Structured interview kit in admin (question bank + anchored scorecards) | Phase 1 | **Built** — `src/lib/interview-questions.ts` + rendering in `admin.astro`, now shared across all 3 tracks |
| 6 | Mechanical roll-up + independent scoring in the decision surface | Phase 5 | **Built** — `computeOverallScore()` in `skills.ts`, 1/3/5 interviewer entry via `api/interview-score.ts`, sortable "Overall" column in admin |
| 7 | Calibration loop (predicted vs actual) | hires over time | **Built** — `hiredAt`/`actualPerformanceScore` fields, `api/calibration.ts`, Calibration tab in admin. *Mechanism only* — needs real hires aging 3-6 months before the data is meaningful |

Phase 1 turned out to be mostly already covered by the existing `interview-questions.ts`
anchors (written for Phase 5); it only needed the per-role character/capability weight
(`ROLE_CHARACTER_WEIGHT`) added. Phases 3 and 4 deliberately avoided duplicating the
~800-line builder assessment UI into `apply.astro` and the internship form — instead,
job/internship candidates submit their profile first, then get redirected into the
existing `/startup-builder` flow tagged with `?track=job|internship&id=<row>`, which skips
the identity step (already captured) and posts to a shared `/api/assessment` endpoint.

### Known limitations going in

- **Job-knowledge questions are a first draft**, not written or reviewed by a subject-matter
  expert per role (see `src/lib/job-knowledge.ts` header comment). Wrong answers in the
  hidden key would silently penalize good candidates — have someone who does each job
  review them before relying on real scores.
- **No hard Stage 1 knockouts** — by user decision, everyone who completes the form proceeds
  to Stage 2. Admin sets pass/hold/reject manually; nothing is auto-rejected today.
- **Calibration has no data yet** — the recording mechanism works, but "does the scoring
  actually predict performance" can't be answered until real hires are reviewed at 3–6 months.
- **Internships have no capability layer** — by design (§4), their Overall is just the
  character score; no job-knowledge test or capability-interview blend.

---

## 11. Open decisions

- **Weight `w` per role** — how much character vs. capability for each professional role.
- **Job-knowledge test depth** — how many questions, which roles, who authors the keys.
- **Bar-raiser** — who plays the outside-reviewer-with-veto role on a small team.
- **Calibration commitment** — are we willing to track hires for 3–6 months to close the
  loop. Without it, the funnel cannot self-correct.
