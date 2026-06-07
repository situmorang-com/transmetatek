import type { APIRoute } from 'astro';
import { db } from '../../db';
import { builderApplications } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const {
      firstName, lastName, email, city, phone, photo,
      area, interviewLanguage, linkedin, portfolio,
      grit, tradeoffs, sjt, sjtScore,
      workSample, storyLearning, vision,
      acknowledged, traitScores, builderScore,
      drivers, noMoneyStory, loyaltyScore, moneyOrientation,
    } = body;

    if (!firstName || !lastName || !email || !city || !phone || !photo ||
        !area || !interviewLanguage || !linkedin ||
        !workSample || !storyLearning || !vision || !noMoneyStory || !acknowledged) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check for duplicates: reject if email or phone (WhatsApp) already exists
    const existingByEmail = await db.select().from(builderApplications).where(eq(builderApplications.email, email)).limit(1);
    const existingByPhone = phone ? await db.select().from(builderApplications).where(eq(builderApplications.phone, phone)).limit(1) : [];

    if (existingByEmail.length > 0) {
      return new Response(JSON.stringify({ ok: false, error: 'This email has already submitted. Only one submission per email allowed.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (existingByPhone.length > 0) {
      return new Response(JSON.stringify({ ok: false, error: 'This WhatsApp number has already submitted. Only one submission per number allowed.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // No duplicates found, insert new row
    await db.insert(builderApplications).values({
      firstName,
      lastName,
      email,
      city,
      phone,
      photo,
      area,
      interviewLanguage,
      linkedin,
      portfolio:         portfolio  || null,
      grit:              JSON.stringify(grit        ?? []),
      tradeoffs:         JSON.stringify(tradeoffs   ?? []),
      sjt:               JSON.stringify(sjt         ?? []),
      sjtScore:          sjtScore   ?? null,
      workSample,
      storyLearning,
      vision,
      acknowledged:      acknowledged ? 1 : 0,
      traitScores:       JSON.stringify(traitScores ?? {}),
      builderScore:      builderScore ?? 0,
      drivers:           JSON.stringify(drivers ?? {}),
      noMoneyStory,
      loyaltyScore:      loyaltyScore     ?? null,
      moneyOrientation:  moneyOrientation ?? null,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[builder] POST error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
