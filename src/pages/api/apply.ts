import type { APIRoute } from 'astro';
import { db } from '../../db';
import { applications } from '../../db/schema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const {
      role, firstName, lastName, email, city, phone,
      experience, skills, linkedin, portfolio, currentOrg,
      whyTmk, aiProject, roleQuestion, matchScore,
    } = body;

    // Basic required field check
    if (!role || !firstName || !lastName || !email || !city || !experience || !linkedin || !whyTmk || !aiProject || !roleQuestion) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db.insert(applications).values({
      role,
      firstName,
      lastName,
      email,
      city,
      phone:        phone        || null,
      experience,
      skills:       JSON.stringify(skills ?? []),
      linkedin,
      portfolio:    portfolio    || null,
      currentOrg:   currentOrg  || null,
      whyTmk,
      aiProject,
      roleQuestion,
      matchScore:   matchScore   ?? null,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[apply] POST error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
