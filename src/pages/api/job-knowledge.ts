import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { applications } from '../../db/schema';
import { publicQuestions, scoreJobKnowledge, TIME_LIMIT_SECONDS } from '../../lib/job-knowledge';

export const GET: APIRoute = async ({ url }) => {
  const role = url.searchParams.get('role') ?? 'open-application';
  return new Response(JSON.stringify({ ok: true, questions: publicQuestions(role), timeLimitSeconds: TIME_LIMIT_SECONDS }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id, role, answers } = body as { id: number; role: string; answers: (number | null)[] };

    if (!id || !role || !Array.isArray(answers)) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { score } = scoreJobKnowledge(role, answers);

    await db.update(applications).set({
      jobKnowledgeAnswers:     JSON.stringify(answers),
      jobKnowledgeScore:       score,
      jobKnowledgeCompletedAt: new Date().toISOString(),
    }).where(eq(applications.id, id));

    return new Response(JSON.stringify({ ok: true, score }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[job-knowledge] POST error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
