import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const applications = sqliteTable('applications', {
  id:           integer('id').primaryKey({ autoIncrement: true }),
  role:         text('role').notNull(),
  firstName:    text('first_name').notNull(),
  lastName:     text('last_name').notNull(),
  email:        text('email').notNull(),
  city:         text('city').notNull(),
  phone:        text('phone'),
  photo:        text('photo'),
  experience:   text('experience').notNull(),
  skills:       text('skills').notNull(),        // JSON: [{skill,category,yearStarted,proficiency},...]
  linkedin:     text('linkedin').notNull(),
  portfolio:    text('portfolio'),
  currentOrg:   text('current_org'),
  currentSalary:  text('current_salary'),
  expectedSalary: text('expected_salary'),
  workHistory:    text('work_history'),          // JSON: [{company,position,startDate,endDate,current,description}]
  whyTmk:       text('why_tmk').notNull(),
  aiProject:    text('ai_project').notNull(),
  roleQuestion: text('role_question').notNull(),
  matchScore:   integer('match_score'),               // legacy completeness score, retired — see screenStatus
  screenStatus: text('screen_status'),                 // Stage 1 screen: 'pass' | 'hold' | 'reject', set by admin (null = not yet screened)
  // ── Stage 2 character assessment (shared instrument — see character-assessment.ts) ──
  // Null until the candidate completes the assessment step after submitting this application.
  drivers:           text('drivers'),                  // JSON: { most, least } ipsative driver pick
  sjt:                text('sjt'),                     // JSON: 12×{best,worst} picks
  sjtScore:           integer('sjt_score'),
  workSample:         text('work_sample'),
  storyLearning:      text('story_learning'),
  vision:             text('vision'),
  noMoneyStory:       text('no_money_story'),
  acknowledged:       integer('acknowledged'),
  traitScores:        text('trait_scores'),             // JSON: 7 trait scores (0–100)
  characterScore:     integer('character_score'),       // weighted avg of the 7 traits
  loyaltyScore:        integer('loyalty_score'),
  moneyOrientation:    integer('money_orientation'),
  assessmentCompletedAt: text('assessment_completed_at'),
  // ── Stage 2 capability layer: job-knowledge test (professional track only) ──
  jobKnowledgeAnswers:    text('job_knowledge_answers'),     // JSON: array of selected option indices
  jobKnowledgeScore:      integer('job_knowledge_score'),    // 0–100, scored against a hidden key
  jobKnowledgeCompletedAt: text('job_knowledge_completed_at'),
  // ── Stage 3 structured interview: independent scorer entry (mechanical roll-up) ──
  interviewScores: text('interview_scores'),           // JSON: { attrKey: 1|3|5, ... } set by interviewer in admin
  interviewScore:  integer('interview_score'),         // 0–100, mechanical avg of interviewScores (1→20,3→60,5→100)
  // ── Stage 6 calibration: predicted vs actual at 3–6 months (see doc §6) ──
  hiredAt:                 text('hired_at'),
  actualPerformanceScore:   integer('actual_performance_score'),  // 0–100, admin's read of real on-the-job performance
  actualPerformanceNotes:   text('actual_performance_notes'),
  performanceReviewedAt:    text('performance_reviewed_at'),
  createdAt:    text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Application    = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;

export const internships = sqliteTable('internships', {
  id:                integer('id').primaryKey({ autoIncrement: true }),
  firstName:         text('first_name').notNull(),
  lastName:          text('last_name').notNull(),
  email:             text('email').notNull(),
  photo:             text('photo'),
  university:        text('university').notNull(),
  course:            text('course').notNull(),
  yearOfStudy:       text('year_of_study').notNull(),
  area:              text('area').notNull(),
  duration:          text('duration').notNull(),
  availability:      text('availability').notNull(),
  skills:            text('skills').notNull(),    // JSON array
  github:            text('github'),
  linkedin:          text('linkedin'),
  whatExcites:       text('what_excites').notNull(),
  ambitiousProject:  text('ambitious_project').notNull(),
  aiDream:           text('ai_dream').notNull(),
  screenStatus:      text('screen_status'),            // Stage 1 screen: 'pass' | 'hold' | 'reject', set by admin
  // ── Stage 2 character assessment (shared instrument — see character-assessment.ts) ──
  drivers:           text('drivers'),
  sjt:               text('sjt'),
  sjtScore:          integer('sjt_score'),
  workSample:        text('work_sample'),
  storyLearning:     text('story_learning'),
  vision:            text('vision'),
  noMoneyStory:      text('no_money_story'),
  acknowledged:      integer('acknowledged'),
  traitScores:       text('trait_scores'),
  characterScore:    integer('character_score'),
  loyaltyScore:       integer('loyalty_score'),
  moneyOrientation:   integer('money_orientation'),
  assessmentCompletedAt: text('assessment_completed_at'),
  interviewScores: text('interview_scores'),
  interviewScore:  integer('interview_score'),
  hiredAt:                 text('hired_at'),
  actualPerformanceScore:   integer('actual_performance_score'),
  actualPerformanceNotes:   text('actual_performance_notes'),
  performanceReviewedAt:    text('performance_reviewed_at'),
  createdAt:         text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Internship    = typeof internships.$inferSelect;
export type NewInternship = typeof internships.$inferInsert;

export const builderApplications = sqliteTable('builder_applications', {
  id:                integer('id').primaryKey({ autoIncrement: true }),
  firstName:         text('first_name').notNull(),
  lastName:          text('last_name').notNull(),
  email:             text('email').notNull().unique(),
  city:              text('city').notNull(),
  phone:             text('phone').unique(),                // WhatsApp number (required at app layer, unique to prevent duplicates)
  photo:             text('photo'),                         // profile photo data URL (required at app layer)
  area:              text('area').notNull(),
  interviewLanguage: text('interview_language').notNull(),  // 'id' | 'en'
  linkedin:          text('linkedin').notNull(),
  portfolio:         text('portfolio'),
  grit:              text('grit').notNull(),          // JSON: 6 Grit-S item values (1–5)
  tradeoffs:         text('tradeoffs').notNull(),      // JSON: 4 slider values (0–100)
  sjt:               text('sjt').notNull(),            // JSON: 5×{best,worst} picks
  sjtScore:          integer('sjt_score'),
  workSample:        text('work_sample').notNull(),
  storyLearning:     text('story_learning').notNull(),
  vision:            text('vision').notNull(),         // merged vision + drive answer
  acknowledged:      integer('acknowledged').notNull(),
  traitScores:       text('trait_scores').notNull(),   // JSON: 7 trait scores (0–100), incl. loyalty
  builderScore:      integer('builder_score').notNull(),
  drivers:           text('drivers'),                  // JSON: { most, least } ipsative driver pick (admin)
  noMoneyStory:      text('no_money_story'),           // behavioral: worked hard with little/no money (admin)
  loyaltyScore:      integer('loyalty_score'),         // 0–100 loyalty & commitment index (admin)
  moneyOrientation:  integer('money_orientation'),     // 0–100, higher = more money-driven (admin flag)
  screenStatus:      text('screen_status'),            // Stage 1 screen: 'pass' | 'hold' | 'reject', set by admin
  interviewScores: text('interview_scores'),
  interviewScore:  integer('interview_score'),
  hiredAt:                 text('hired_at'),
  actualPerformanceScore:   integer('actual_performance_score'),
  actualPerformanceNotes:   text('actual_performance_notes'),
  performanceReviewedAt:    text('performance_reviewed_at'),
  createdAt:         text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type BuilderApplication    = typeof builderApplications.$inferSelect;
export type NewBuilderApplication = typeof builderApplications.$inferInsert;
