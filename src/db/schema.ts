import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const applications = sqliteTable('applications', {
  id:           integer('id').primaryKey({ autoIncrement: true }),
  role:         text('role').notNull(),
  firstName:    text('first_name').notNull(),
  lastName:     text('last_name').notNull(),
  email:        text('email').notNull(),
  city:         text('city').notNull(),
  phone:        text('phone'),
  experience:   text('experience').notNull(),
  skills:       text('skills').notNull(),        // JSON string: ["PyTorch","Python",...]
  linkedin:     text('linkedin').notNull(),
  portfolio:    text('portfolio'),
  currentOrg:   text('current_org'),
  whyTmk:       text('why_tmk').notNull(),
  aiProject:    text('ai_project').notNull(),
  roleQuestion: text('role_question').notNull(),
  matchScore:   integer('match_score'),
  createdAt:    text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Application    = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;

export const internships = sqliteTable('internships', {
  id:                integer('id').primaryKey({ autoIncrement: true }),
  firstName:         text('first_name').notNull(),
  lastName:          text('last_name').notNull(),
  email:             text('email').notNull(),
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
  createdAt:         text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type BuilderApplication    = typeof builderApplications.$inferSelect;
export type NewBuilderApplication = typeof builderApplications.$inferInsert;
