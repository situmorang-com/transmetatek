CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`role` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`city` text NOT NULL,
	`phone` text,
	`experience` text NOT NULL,
	`skills` text NOT NULL,
	`linkedin` text NOT NULL,
	`portfolio` text,
	`current_org` text,
	`why_tmk` text NOT NULL,
	`ai_project` text NOT NULL,
	`role_question` text NOT NULL,
	`match_score` integer,
	`created_at` text NOT NULL
);
