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
