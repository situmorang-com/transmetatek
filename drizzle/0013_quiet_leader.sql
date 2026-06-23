ALTER TABLE `applications` ADD `hired_at` text;--> statement-breakpoint
ALTER TABLE `applications` ADD `actual_performance_score` integer;--> statement-breakpoint
ALTER TABLE `applications` ADD `actual_performance_notes` text;--> statement-breakpoint
ALTER TABLE `applications` ADD `performance_reviewed_at` text;--> statement-breakpoint
ALTER TABLE `builder_applications` ADD `hired_at` text;--> statement-breakpoint
ALTER TABLE `builder_applications` ADD `actual_performance_score` integer;--> statement-breakpoint
ALTER TABLE `builder_applications` ADD `actual_performance_notes` text;--> statement-breakpoint
ALTER TABLE `builder_applications` ADD `performance_reviewed_at` text;--> statement-breakpoint
ALTER TABLE `internships` ADD `hired_at` text;--> statement-breakpoint
ALTER TABLE `internships` ADD `actual_performance_score` integer;--> statement-breakpoint
ALTER TABLE `internships` ADD `actual_performance_notes` text;--> statement-breakpoint
ALTER TABLE `internships` ADD `performance_reviewed_at` text;