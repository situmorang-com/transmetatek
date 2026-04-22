CREATE TABLE `internships` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
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
	`created_at` text NOT NULL
);
