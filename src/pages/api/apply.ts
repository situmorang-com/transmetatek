import type { APIRoute } from 'astro';
import { db } from '../../db';
import { applications } from '../../db/schema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const {
      role, firstName, lastName, email, city, phone, photo,
      experience, skills, linkedin, portfolio, currentOrg,
      currentSalary, expectedSalary, workHistory,
      whyTmk, aiProject, roleQuestion, matchScore,
    } = body;

    // Basic required field check
    if (!role || !firstName || !lastName || !email || !city || !experience || !linkedin || !whyTmk || !aiProject || !roleQuestion) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const [inserted] = await db.insert(applications).values({
      role,
      firstName,
      lastName,
      email,
      city,
      phone:        phone        || null,
      photo:        photo        || null,
      experience,
      skills:       JSON.stringify(skills ?? []),
      linkedin,
      portfolio:    portfolio    || null,
      currentOrg:   currentOrg  || null,
      currentSalary:  currentSalary  || null,
      expectedSalary: expectedSalary || null,
      workHistory:    JSON.stringify(workHistory ?? []),
      whyTmk,
      aiProject,
      roleQuestion,
      matchScore:   matchScore   ?? null,
    }).returning({ id: applications.id });

    return new Response(JSON.stringify({ ok: true, id: inserted.id }), {
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
