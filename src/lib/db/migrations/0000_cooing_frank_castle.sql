CREATE TABLE `assignment` (
	`assignment_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`due_date` datetime,
	`start_date` datetime,
	`available_until` datetime,
	`module_id` int,
	CONSTRAINT `assignment_assignment_id` PRIMARY KEY(`assignment_id`)
);
--> statement-breakpoint
CREATE TABLE `course` (
	`course_id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`total_module` tinyint NOT NULL,
	`cover` varchar(255),
	`course_type_id` smallint NOT NULL,
	CONSTRAINT `course_course_id` PRIMARY KEY(`course_id`)
);
--> statement-breakpoint
CREATE TABLE `module` (
	`module_id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`order` smallint NOT NULL,
	`course_id` int NOT NULL,
	CONSTRAINT `module_module_id` PRIMARY KEY(`module_id`)
);
--> statement-breakpoint
CREATE TABLE `course_type` (
	`course_type_id` smallint AUTO_INCREMENT NOT NULL,
	`type` varchar(100) NOT NULL,
	CONSTRAINT `course_type_course_type_id` PRIMARY KEY(`course_type_id`)
);
--> statement-breakpoint
CREATE TABLE `member` (
	`member_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(45) NOT NULL,
	`level` tinyint DEFAULT 1,
	`point` smallint,
	`angkatan` smallint NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `member_member_id` PRIMARY KEY(`member_id`)
);
--> statement-breakpoint
CREATE TABLE `member_assignment` (
	`assignment_id` varchar(36) NOT NULL,
	`member_id` int NOT NULL,
	`url` varchar(255) NOT NULL,
	CONSTRAINT `member_assignment_assignment_id_member_id` PRIMARY KEY(`assignment_id`,`member_id`)
);
--> statement-breakpoint
CREATE TABLE `member_course` (
	`member_course_id` int AUTO_INCREMENT NOT NULL,
	`progress` smallint NOT NULL,
	`status` varchar(45),
	`member_id` int NOT NULL,
	`course_id` int NOT NULL,
	CONSTRAINT `member_course_member_course_id` PRIMARY KEY(`member_course_id`)
);
--> statement-breakpoint
CREATE TABLE `member_progress` (
	`member_course_id` int NOT NULL,
	`submodule_id` int NOT NULL,
	`status` varchar(45) NOT NULL,
	CONSTRAINT `member_progress_member_course_id_submodule_id` PRIMARY KEY(`member_course_id`,`submodule_id`)
);
--> statement-breakpoint
CREATE TABLE `submodule` (
	`submodule_id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`type` varchar(45) NOT NULL,
	`moduleUrl` varchar(255) NOT NULL,
	`order` smallint NOT NULL,
	`module_id` int NOT NULL,
	CONSTRAINT `submodule_submodule_id` PRIMARY KEY(`submodule_id`)
);
--> statement-breakpoint
CREATE INDEX `fk_assignment_module1_idx` ON `assignment` (`module_id`);--> statement-breakpoint
CREATE INDEX `fk_course_course_type_idx` ON `course` (`course_type_id`);--> statement-breakpoint
CREATE INDEX `fk_module_course1_idx` ON `module` (`course_id`);--> statement-breakpoint
CREATE INDEX `fk_member_assignment_member1_idx` ON `member_assignment` (`member_id`);--> statement-breakpoint
CREATE INDEX `fk_member_course_member1_idx` ON `member_course` (`member_id`);--> statement-breakpoint
CREATE INDEX `fk_member_course_course1_idx` ON `member_course` (`course_id`);--> statement-breakpoint
CREATE INDEX `fk_member_progress_submodule1_idx` ON `member_progress` (`submodule_id`);--> statement-breakpoint
CREATE INDEX `fk_submodule_module1_idx` ON `submodule` (`module_id`);--> statement-breakpoint
ALTER TABLE `assignment` ADD CONSTRAINT `assignment_module_id_module_module_id_fk` FOREIGN KEY (`module_id`) REFERENCES `module`(`module_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course` ADD CONSTRAINT `course_course_type_id_course_type_course_type_id_fk` FOREIGN KEY (`course_type_id`) REFERENCES `course_type`(`course_type_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `module` ADD CONSTRAINT `module_course_id_course_course_id_fk` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `member_assignment` ADD CONSTRAINT `member_assignment_assignment_id_assignment_assignment_id_fk` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`assignment_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `member_assignment` ADD CONSTRAINT `member_assignment_member_id_member_member_id_fk` FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `member_course` ADD CONSTRAINT `member_course_member_id_member_member_id_fk` FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `member_course` ADD CONSTRAINT `member_course_course_id_course_course_id_fk` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `member_progress` ADD CONSTRAINT `member_progress_member_course_id_member_course_member_course_id_fk` FOREIGN KEY (`member_course_id`) REFERENCES `member_course`(`member_course_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `member_progress` ADD CONSTRAINT `member_progress_submodule_id_submodule_submodule_id_fk` FOREIGN KEY (`submodule_id`) REFERENCES `submodule`(`submodule_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `submodule` ADD CONSTRAINT `submodule_module_id_module_module_id_fk` FOREIGN KEY (`module_id`) REFERENCES `module`(`module_id`) ON DELETE no action ON UPDATE no action;