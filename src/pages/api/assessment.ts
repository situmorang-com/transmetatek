import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { applications, internships } from '../../db/schema';
import { computeAssessmentScores } from '../../lib/character-assessment';

const TABLES = {
  job:        applications,
  internship: internships,
} as const;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      track, id,
      sjtPicks, driverPicks,
      workSample, storyLearning, vision, noMoneyStory, acknowledged,
    } = body as {
      track: keyof typeof TABLES; id: number;
      sjtPicks: Record<string, { best: number | null; worst: number | null }>;
      driverPicks: { most: string | null; least: string | null };
      workSample: string; storyLearning: string; vision: string; noMoneyStory: string;
      acknowledged: boolean;
    };

    const table = TABLES[track];
    if (!table || !id || !sjtPicks || !driverPicks || !workSample || !storyLearning || !vision || !noMoneyStory || !acknowledged) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Recompute server-side from raw picks rather than trusting client-submitted
    // scores — the hidden SJT key must never be derivable from what we send back,
    // and the score itself should not be client-controlled.
    const scores = computeAssessmentScores({ sjtPicks, driverPicks, workSample, storyLearning, vision, noMoneyStory });

    await db.update(table).set({
      drivers:               JSON.stringify(driverPicks),
      sjt:                   JSON.stringify(sjtPicks),
      sjtScore:               scores.sjtScore,
      workSample,
      storyLearning,
      vision,
      noMoneyStory,
      acknowledged:           1,
      traitScores:            JSON.stringify(scores.traitScores),
      characterScore:         scores.builderScore,
      loyaltyScore:           scores.loyaltyScore,
      moneyOrientation:       scores.moneyOrientation,
      assessmentCompletedAt:  new Date().toISOString(),
    } as any).where(eq((table as any).id, id));

    return new Response(JSON.stringify({ ok: true, ...scores }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[assessment] POST error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
