PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_internships` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`photo` text NOT NULL,
	`cv` text NOT NULL,
	`university` text NOT NULL,
	`course` text NOT NULL,
	`year_of_study` text NOT NULL,
	`area` text NOT NULL,
	`duration` text NOT NULL,
	`availability` text NOT NULL,
	`skills` text NOT NULL,
	`github` text,
	`linkedin` text,
	`what_excites` text NOT NULL,
	`ambitious_project` text NOT NULL,
	`ai_dream` text NOT NULL,
	`screen_status` text,
	`drivers` text,
	`sjt` text,
	`sjt_score` integer,
	`work_sample` text,
	`story_learning` text,
	`vision` text,
	`no_money_story` text,
	`acknowledged` integer,
	`trait_scores` text,
	`character_score` integer,
	`loyalty_score` integer,
	`money_orientation` integer,
	`assessment_completed_at` text,
	`interview_scores` text,
	`interview_score` integer,
	`hired_at` text,
	`actual_performance_score` integer,
	`actual_performance_notes` text,
	`performance_reviewed_at` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_internships`("id", "first_name", "last_name", "email", "phone", "photo", "cv", "university", "course", "year_of_study", "area", "duration", "availability", "skills", "github", "linkedin", "what_excites", "ambitious_project", "ai_dream", "screen_status", "drivers", "sjt", "sjt_score", "work_sample", "story_learning", "vision", "no_money_story", "acknowledged", "trait_scores", "character_score", "loyalty_score", "money_orientation", "assessment_completed_at", "interview_scores", "interview_score", "hired_at", "actual_performance_score", "actual_performance_notes", "performance_reviewed_at", "created_at") SELECT "id", "first_name", "last_name", "email", "phone", "photo", "cv", "university", "course", "year_of_study", "area", "duration", "availability", "skills", "github", "linkedin", "what_excites", "ambitious_project", "ai_dream", "screen_status", "drivers", "sjt", "sjt_score", "work_sample", "story_learning", "vision", "no_money_story", "acknowledged", "trait_scores", "character_score", "loyalty_score", "money_orientation", "assessment_completed_at", "interview_scores", "interview_score", "hired_at", "actual_performance_score", "actual_performance_notes", "performance_reviewed_at", "created_at" FROM `internships`;--> statement-breakpoint
DROP TABLE `internships`;--> statement-breakpoint
ALTER TABLE `__new_internships` RENAME TO `internships`;--> statement-breakpoint
PRAGMA foreign_keys=ON;