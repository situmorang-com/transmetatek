// Structured interview question bank + per-candidate guide builder.
//
// Stage 3 of the recruitment funnel (see doc/recruitment-funnel.md). The app
// scores candidates on the 7 builder traits and (for pro roles) capability; this
// module turns those scores into a *tailored* offline-interview guide: which
// behavioural questions to ask, in what priority, with anchored 1/3/5 scoring so
// every interviewer rates the same way.
//
// Principle: the interview does not start from scratch. It pressure-tests the
// app's signal — probe hard where the score is weak, confirm where it's strong,
// and make the candidate defend the answers they already wrote.

export type QLevel = 1 | 3 | 5;

export type InterviewQuestion = {
  type: 'behavioral' | 'situational';
  question: string;
  listenFor: string;
  probes: string[];                 // follow-ups that force STAR specifics & catch fakers
  anchors: { level: QLevel; text: string }[];
  // which written answer (if any) the interviewer should quote back and make them defend
  tiesTo?: 'workSample' | 'storyLearning' | 'vision' | 'noMoneyStory';
};

// ── Character layer: one behavioural + one situational question per trait ──────
// Keys match TRAIT_LABELS in admin.astro: drive, growth, ownership, tolerance,
// ego, ambition, loyalty.
export const TRAIT_QUESTIONS: Record<string, InterviewQuestion[]> = {
  drive: [
    {
      type: 'behavioral',
      tiesTo: 'noMoneyStory',
      question: 'Tell me about the most boring, unglamorous work you have ever done that actually mattered. What made you finish it to a high standard when no one was watching?',
      listenFor: 'Intrinsic reason to keep going. Specifics about the task. Energy, even pride, in the dull parts — not "because my boss told me to."',
      probes: ['What exactly did you do day to day?', 'Who would have noticed if you had stopped?', 'Did the pay or recognition ever change how hard you worked?'],
      anchors: [
        { level: 1, text: 'Needs an external reward or deadline to push. Vague on why they would keep going. Hints they would coast if unwatched.' },
        { level: 3, text: 'Finishes hard work when assigned, but does not seek it out. Reasonable but not self-driven.' },
        { level: 5, text: 'Chooses unglamorous work, describes a concrete intrinsic reason, and clearly held a high bar with no audience.' },
      ],
    },
    {
      type: 'situational',
      question: 'You are three weeks into a project that is grindy, invisible, and no one is thanking you for it. It is exactly as dull as you feared. Walk me through what you actually do day to day.',
      listenFor: 'A steady, finish-it plan vs. quietly checking out or doing the visible half only.',
      probes: ['What keeps you at it in week four?', 'When is it acceptable to do the bare minimum here?'],
      anchors: [
        { level: 1, text: 'Looks for the exit, does the visible part, hopes someone reassigns it.' },
        { level: 3, text: 'Pushes through but mostly on willpower; no real ownership of the outcome.' },
        { level: 5, text: 'Sets a sustainable pace, finishes properly, and frames why the dull work matters.' },
      ],
    },
  ],
  growth: [
    {
      type: 'behavioral',
      tiesTo: 'storyLearning',
      question: 'You wrote about teaching yourself something hard, fast. Take me to the moment you were most stuck. What did you try, what failed, and how did you know when it finally worked?',
      listenFor: 'Self-direction, speed, a concrete shipped outcome, and a real way of measuring success.',
      probes: ['How long did it take?', 'What did you actually ship or produce?', 'How did you measure that it worked?'],
      anchors: [
        { level: 1, text: 'Waited for training. "Watched videos" with nothing shipped. No way of knowing it worked.' },
        { level: 3, text: 'Self-taught but slow, or learned without a concrete outcome to point to.' },
        { level: 5, text: 'Dug into docs/sources under real urgency, shipped something, and measured the result concretely.' },
      ],
    },
    {
      type: 'situational',
      question: 'You are handed a tool you have never used, a real deadline next week, no training planned, and no one free to teach you. Your first 48 hours — what do you do?',
      listenFor: 'Runs toward the unknown and finds a path, vs. waits to be taught.',
      probes: ['Who would you pull in, and how?', 'What would you have working by day two?'],
      anchors: [
        { level: 1, text: 'Waits for the company to arrange training; treats the gap as a blocker.' },
        { level: 3, text: 'Makes progress but slowly; leans on others before trying hard themselves.' },
        { level: 5, text: 'Self-starts on docs/tutorials, finds one person who knows, has something working fast.' },
      ],
    },
  ],
  ownership: [
    {
      type: 'behavioral',
      question: 'Tell me about a time you saw something important breaking that was clearly not your job. What did you do?',
      listenFor: 'Took it on without being asked, found a way, no blame-shifting. "I saw it, I fixed it, I told them."',
      probes: ['Did you ask permission or just move?', 'What did owning it cost you?', 'What happened in the end?'],
      anchors: [
        { level: 1, text: '"Not my responsibility." Reported it and left it. Waited for someone to own it.' },
        { level: 3, text: 'Owns problems inside their own role, but stops at the edge of it.' },
        { level: 5, text: 'Treats the problem as theirs, moves without waiting for permission, sees it through.' },
      ],
    },
    {
      type: 'situational',
      question: 'You notice something quietly breaking. Nobody asked you to touch it, it is outside your role, and dealing with it will eat into your own work this week. Talk me through your decision.',
      listenFor: 'Weighs it honestly but leans toward owning it (or pulling in the right person), not "leave it."',
      probes: ['What if fixing it makes you miss your own deadline?', 'How do you decide it is worth it?'],
      anchors: [
        { level: 1, text: 'Leaves it — not their job — or waits until someone officially assigns it.' },
        { level: 3, text: 'Flags it to whoever owns it and moves on; limited personal ownership.' },
        { level: 5, text: 'Takes it on or pulls in the owner and drives it, accepting the cost.' },
      ],
    },
  ],
  tolerance: [
    {
      type: 'behavioral',
      question: 'Tell me about a time priorities changed on you mid-stream and killed work you were proud of. How did you actually feel, and what did you do next?',
      listenFor: 'Acceptance over resentment. Focus on what is next, not on sunk cost.',
      probes: ['How long did the frustration last?', 'Did you fight the change, sulk, or pivot?'],
      anchors: [
        { level: 1, text: 'Resentful, dwells on sunk cost, assumes things should be stable and well-resourced.' },
        { level: 3, text: 'Adapts, but grudgingly; needs time to get over it.' },
        { level: 5, text: 'Pivots fast without resentment; treats constraints and change as normal startup life.' },
      ],
    },
    {
      type: 'situational',
      question: 'You are 80% done with a feature you are proud of. Leadership says the market shifted — it is dead, and they need something else by Friday. What is your honest reaction, and your next move?',
      listenFor: 'The honest emotional read, then a fast reprioritisation.',
      probes: ['Where does the 80% work go?', 'How do you keep the team steady through it?'],
      anchors: [
        { level: 1, text: 'Pushes to finish theirs first, or keeps working it quietly. Resists the change.' },
        { level: 3, text: 'Reprioritises but slowly, or needs to be convinced.' },
        { level: 5, text: 'Feels the sting, reprioritises immediately, salvages what is reusable.' },
      ],
    },
  ],
  ego: [
    {
      type: 'behavioral',
      question: 'Tell me about a time a junior or a peer publicly pointed out a real flaw in your work. What did you do in the next five minutes, and the next five days?',
      listenFor: 'Did not get defensive first. Credited the person. Actually fixed it.',
      probes: ['What was your very first reaction inside?', 'Did you thank them? Did you fix it?'],
      anchors: [
        { level: 1, text: 'Defends, explains why they were actually right, centres themselves.' },
        { level: 3, text: 'Accepts the feedback gracefully but rarely seeks it out.' },
        { level: 5, text: 'Thanks them, digs into the flaw, fixes it — and seeks hard feedback by habit.' },
      ],
    },
    {
      type: 'situational',
      question: 'You can hit a deadline by shipping something you know is mediocre — no one would notice for months — or slip two days for work you would be proud of. Leadership has not said which they want. What do you do?',
      listenFor: 'Holds a quality bar AND surfaces the trade-off rather than deciding silently.',
      probes: ['When is shipping the mediocre version the right call?', 'Tell me about a time you refused to ship something.'],
      anchors: [
        { level: 1, text: 'Silently ships mediocre, or silently slips — no bar, no transparency.' },
        { level: 3, text: 'Holds a bar but decides alone without surfacing the trade-off.' },
        { level: 5, text: 'Surfaces the trade-off to leadership and protects a real quality standard.' },
      ],
    },
  ],
  ambition: [
    {
      type: 'behavioral',
      tiesTo: 'vision',
      question: 'You wrote that you want to get to a certain place in a few years. What have you already started and finished that points that way? Walk me through one thing you saw all the way through.',
      listenFor: 'A real track record of finishing. A concrete reason for THIS work now, not any startup.',
      probes: ['Why this work now, not a year from now or somewhere else?', 'What have you abandoned, and why?'],
      anchors: [
        { level: 1, text: 'Jumps between interests, generic "grow and learn," no finished work to show.' },
        { level: 3, text: 'Finishes things, but the longer-term vision is vague or borrowed.' },
        { level: 5, text: 'Concrete vision tied to this specific work, backed by a real history of completion.' },
      ],
    },
    {
      type: 'situational',
      question: 'Four months into a hard 12-month goal you believe in — progress is slow and unglamorous — a flashier opportunity appears that would reset you to month zero. What do you do?',
      listenFor: 'Consistency and follow-through vs. chasing the new shiny thing.',
      probes: ['What would make it right to switch?', 'Have you done this before — switched or stayed?'],
      anchors: [
        { level: 1, text: 'Drops the goal and chases the new thing, or quietly half-does both.' },
        { level: 3, text: 'Stays but wavers; needs reassurance to keep going.' },
        { level: 5, text: 'Stays the course and finishes what they started, with a clear reason.' },
      ],
    },
  ],
  loyalty: [
    {
      type: 'behavioral',
      question: 'Tell me about a time you stayed and dug in when it would have been easy and reasonable to leave. Why did you stay?',
      listenFor: 'Mission/team/commitment language, not just paycheck. A real choice to stay through difficulty.',
      probes: ['What would have made you leave?', 'Was staying the right call in hindsight?'],
      anchors: [
        { level: 1, text: 'Cannot recall staying through anything hard; "I go where the best opportunity is."' },
        { level: 3, text: 'Stayed, but transactionally — the math happened to favour staying.' },
        { level: 5, text: 'Chose to stay for mission/team reasons and dug in when it was genuinely hard.' },
      ],
    },
    {
      type: 'situational',
      question: 'Six months in, after we have invested real training in you, a competitor offers 40% more. We are doing okay but cash is tight. And separately: a rough quarter hits, bonuses are frozen, everyone is stretched. Talk me through both — honestly.',
      listenFor: 'Open conversation and commitment vs. taking the offer, using it as leverage, or quietly checking out.',
      probes: ['Would you use the offer as leverage?', 'What would actually make you stay when it is hard?'],
      anchors: [
        { level: 1, text: 'Takes the money, uses it as leverage, or quietly does the minimum and interviews elsewhere.' },
        { level: 3, text: 'Stays but wants guarantees; commitment is conditional.' },
        { level: 5, text: 'Talks openly with the founder, stays through the rough patch for real reasons.' },
      ],
    },
  ],
};

// ── Money probe (admin-only; use only when the money flag is elevated) ─────────
// Frame as understanding their drivers, never as an accusation.
export const MONEY_QUESTION: InterviewQuestion = {
  type: 'behavioral',
  question: 'Tell me about a time you chose something other than the highest-paying option available to you. What drove that decision?',
  listenFor: 'A real, specific trade-off where money lost to something they valued more. Vague or "never happened" is itself a signal.',
  probes: ['How did you feel about the money you left on the table?', 'What would it take for pay to become your number-one factor?'],
  anchors: [
    { level: 1, text: 'Cannot think of one; frames every past choice around pay; money is plainly the top factor.' },
    { level: 3, text: 'Has an example, but money clearly weighs heavily in how they decide.' },
    { level: 5, text: 'Concrete story where money lost to mission, growth, or people — and it rings true.' },
  ],
};

// ── Capability layer (professional track) ─────────────────────────────────────
// No work samples (see funnel doc §3): problem-solving is a live talk-through,
// not a built artifact.
export const CAPABILITY_QUESTIONS: Record<string, InterviewQuestion[]> = {
  techDepth: [
    {
      type: 'behavioral',
      question: 'Walk me through the most technically demanding thing you have built or solved — as if I am a smart peer who does not know your domain. Where did it almost fail?',
      listenFor: 'Real depth, honest about limits, can articulate trade-offs and failure modes — not buzzwords.',
      probes: ['Why that approach over the alternatives?', 'What did you not understand at first?', 'What would you do differently now?'],
      anchors: [
        { level: 1, text: 'Buzzwords, cannot go deep, no trade-offs, no failure modes.' },
        { level: 3, text: 'Solid and correct, but shallow on why-this-not-that.' },
        { level: 5, text: 'Deep, honest about limits, articulates trade-offs and where it nearly broke.' },
      ],
    },
  ],
  problemSolving: [
    {
      type: 'situational',
      question: 'Here is a messy, real problem from this role. You have ninety seconds to think out loud — I care about how you break it down, not the final answer.',
      listenFor: 'Clarifies the goal, decomposes, states assumptions, finds the limiting step — structure over a fast guess.',
      probes: ['What would you need to know first?', 'What is the one thing that, if wrong, breaks everything?'],
      anchors: [
        { level: 1, text: 'Jumps straight to a solution with no structure or clarifying.' },
        { level: 3, text: 'Structured, but misses key constraints or assumptions.' },
        { level: 5, text: 'Clarifies, decomposes, prioritises the limiting step, names assumptions.' },
      ],
    },
  ],
  communication: [
    {
      type: 'situational',
      question: 'Explain your most complex project to me as if I am the non-technical CEO of an Indonesian retailer who is paying for it. What do I need to know, and what do I not?',
      listenFor: 'Leads with the business outcome, drops jargon, reads the audience. Consultant-ready.',
      probes: ['What would you deliberately leave out?', 'How do you know I followed you?'],
      anchors: [
        { level: 1, text: 'Jargon-heavy, no audience awareness, buries the point.' },
        { level: 3, text: 'Clear but still technical-leaning; makes the listener work.' },
        { level: 5, text: 'Leads with outcome, no jargon, visibly adapts to the listener.' },
      ],
    },
  ],
};

export const ATTRIBUTE_LABELS: Record<string, string> = {
  drive: 'Drive & Motivation', growth: 'Growth & Learning', ownership: 'Ownership & Hard Work',
  tolerance: 'Startup Tolerance', ego: 'Low Ego, High Standard', ambition: 'Long-term Ambition',
  loyalty: 'Loyalty & Commitment', money: 'Money Orientation',
  techDepth: 'Technical / Domain Depth', problemSolving: 'Problem-Solving', communication: 'Client-Ready Communication',
};

// Ordered so the guide reads top-to-bottom in trait order.
export const TRAIT_ORDER = ['drive', 'growth', 'ownership', 'tolerance', 'ego', 'ambition', 'loyalty'] as const;

export type Priority = 'probe-hard' | 'verify' | 'confirm';

export type GuideItem = {
  attribute: string;
  label: string;
  priority: Priority;
  reason: string;
  score: number | null;
  questions: InterviewQuestion[];
};

const PRIORITY_RANK: Record<Priority, number> = { 'probe-hard': 0, verify: 1, confirm: 2 };

function priorityForScore(score: number): { priority: Priority; reason: string } {
  if (score < 55) return { priority: 'probe-hard', reason: `Scored ${score}% — the assessment flags this as a real risk. Spend your time here; make them prove it with specifics.` };
  if (score < 70) return { priority: 'verify',     reason: `Scored ${score}% — borderline. Confirm whether this is genuine or just a good test-taker.` };
  return { priority: 'confirm', reason: `Scored ${score}% — strong on paper. One question to check it is real, not faked.` };
}

// Builder track: fully tailored from the candidate's 7 trait scores + money flag.
export function buildBuilderInterviewGuide(
  traitScores: Record<string, number>,
  moneyOrientation: number | null,
): GuideItem[] {
  const items: GuideItem[] = TRAIT_ORDER.map(attr => {
    const score = Math.round(traitScores?.[attr] ?? 0);
    const { priority, reason } = priorityForScore(score);
    return { attribute: attr, label: ATTRIBUTE_LABELS[attr], priority, reason, score, questions: TRAIT_QUESTIONS[attr] };
  });

  // Money probe only earns a slot when the flag is elevated.
  if (moneyOrientation != null && moneyOrientation >= 55) {
    const hard = moneyOrientation >= 75;
    items.push({
      attribute: 'money',
      label: ATTRIBUTE_LABELS.money,
      priority: hard ? 'probe-hard' : 'verify',
      reason: hard
        ? `Money flag ${moneyOrientation}% — money-primary. Pressure-test whether they will leave if poached. Frame it as understanding their drivers, not an accusation.`
        : `Money flag ${moneyOrientation}% — mixed. Worth one question to understand how money weighs for them.`,
      score: moneyOrientation,
      questions: [MONEY_QUESTION],
    });
  }

  return items.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
}

// Professional track: no character scores captured yet, so character questions
// are a fixed reference set; capability is keyed to the role.
export function buildCapabilityGuide(): GuideItem[] {
  return (['techDepth', 'problemSolving', 'communication'] as const).map(attr => ({
    attribute: attr,
    label: ATTRIBUTE_LABELS[attr],
    priority: 'verify' as Priority,
    reason: 'Capability check for this role. Score against the anchors.',
    score: null,
    questions: CAPABILITY_QUESTIONS[attr],
  }));
}
