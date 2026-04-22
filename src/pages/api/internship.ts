import type { APIRoute } from 'astro';
import { db } from '../../db';
import { internships } from '../../db/schema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const {
      firstName, lastName, email, university, course, yearOfStudy,
      area, duration, availability, skills,
      github, linkedin,
      whatExcites, ambitiousProject, aiDream,
    } = body;

    if (!firstName || !lastName || !email || !university || !course ||
        !yearOfStudy || !area || !duration || !availability ||
        !whatExcites || !ambitiousProject || !aiDream) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db.insert(internships).values({
      firstName,
      lastName,
      email,
      university,
      course,
      yearOfStudy,
      area,
      duration,
      availability,
      skills:           JSON.stringify(skills ?? []),
      github:           github    || null,
      linkedin:         linkedin  || null,
      whatExcites,
      ambitiousProject,
      aiDream,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[internship] POST error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
