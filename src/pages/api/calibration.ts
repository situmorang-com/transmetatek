import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { applications, internships, builderApplications } from '../../db/schema';

const TABLES = {
  applications: applications,
  internships:  internships,
  builder:      builderApplications,
} as const;

// Stage 6 calibration (doc/recruitment-funnel.md §6): record the hire date now,
// and the actual on-the-job performance read later (typically 3–6 months in) —
// the only honest way to find out whether the funnel's predicted scores track
// real outcomes.
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
    const { track, id, action, actualPerformanceScore, actualPerformanceNotes } = body as {
      track: keyof typeof TABLES; id: number; action: 'mark-hired' | 'unmark-hired' | 'review';
      actualPerformanceScore?: number; actualPerformanceNotes?: string;
    };

    const table = TABLES[track];
    if (!table || !id || !action) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'mark-hired') {
      await db.update(table).set({ hiredAt: new Date().toISOString() } as any).where(eq((table as any).id, id));
    } else if (action === 'unmark-hired') {
      await db.update(table).set({ hiredAt: null } as any).where(eq((table as any).id, id));
    } else if (action === 'review') {
      if (actualPerformanceScore == null || actualPerformanceScore < 0 || actualPerformanceScore > 100) {
        return new Response(JSON.stringify({ ok: false, error: 'actualPerformanceScore must be 0-100' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      await db.update(table).set({
        actualPerformanceScore,
        actualPerformanceNotes: actualPerformanceNotes || null,
        performanceReviewedAt: new Date().toISOString(),
      } as any).where(eq((table as any).id, id));
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[calibration] POST error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
