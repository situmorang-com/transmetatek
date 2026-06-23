import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { applications, internships, builderApplications } from '../../db/schema';

const TABLES = {
  applications:  applications,
  internships:   internships,
  builder:       builderApplications,
} as const;

const VALID_STATUSES = new Set(['pass', 'hold', 'reject', null]);

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
    const { track, id, status } = body as { track: keyof typeof TABLES; id: number; status: string | null };

    const table = TABLES[track];
    if (!table || !id || !VALID_STATUSES.has(status)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db.update(table).set({ screenStatus: status }).where(eq((table as any).id, id));

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[screen] POST error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
