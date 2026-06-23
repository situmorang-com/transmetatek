import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { applications, internships, builderApplications } from '../../db/schema';
import { INTERVIEW_LEVEL_TO_PCT } from '../../lib/skills';

const TABLES = {
  applications: applications,
  internships:  internships,
  builder:      builderApplications,
} as const;

export const POST: APIRoute = async ({ request }) => {
  try {
    const adminToken = import.meta.env.ADMIN_TOKEN;
    const token = new URL(request.url).searchParams.get('token') ?? request.headers.get('x-admin-token');
    if (!adminToken || token !== adminToken) {
      return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { track, id, scores } = body as { track: keyof typeof TABLES; id: number; scores: Record<string, number> };

    const table = TABLES[track];
    if (!table || !id || !scores || typeof scores !== 'object') {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 'money' is a risk flag from the character assessment, not an interview
    // capability rating — exclude it from the mechanical average.
    const entries = Object.entries(scores).filter(([k]) => k !== 'money');
    const pcts = entries.map(([, v]) => INTERVIEW_LEVEL_TO_PCT[v] ?? 0);
    const interviewScore = pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : null;

    await db.update(table).set({
      interviewScores: JSON.stringify(scores),
      interviewScore,
    } as any).where(eq((table as any).id, id));

    return new Response(JSON.stringify({ ok: true, interviewScore }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[interview-score] POST error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
