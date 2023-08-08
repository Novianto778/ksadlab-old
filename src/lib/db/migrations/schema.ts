import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, varchar, datetime, int, text, tinyint, smallint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const assignment = mysqlTable("assignment", {
	assignmentId: varchar("assignment_id", { length: 36 }).notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	dueDate: datetime("due_date", { mode: 'string'}),
	startDate: datetime("start_date", { mode: 'string'}),
	availableUntil: datetime("available_until", { mode: 'string'}),
	moduleId: int("module_id").references(() => module.moduleId),
},
(table) => {
	return {
		fkAssignmentModule1Idx: index("fk_assignment_module1_idx").on(table.moduleId),
		assignmentAssignmentId: primaryKey(table.assignmentId)
	}
});

export const course = mysqlTable("course", {
	courseId: int("course_id").autoincrement().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	totalModule: tinyint("total_module").notNull(),
	level: smallint("level").notNull(),
	cover: varchar("cover", { length: 255 }),
	courseTypeId: smallint("course_type_id").notNull().references(() => courseType.courseTypeId),
},
(table) => {
	return {
		fkCourseCourseTypeIdx: index("fk_course_course_type_idx").on(table.courseTypeId),
		courseCourseId: primaryKey(table.courseId)
	}
});

export const courseType = mysqlTable("course_type", {
	courseTypeId: smallint("course_type_id").autoincrement().notNull(),
	type: varchar("type", { length: 100 }).notNull(),
},
(table) => {
	return {
		courseTypeCourseTypeId: primaryKey(table.courseTypeId)
	}
});

export const member = mysqlTable("member", {
	memberId: int("member_id").autoincrement().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	username: varchar("username", { length: 45 }).notNull(),
	level: tinyint("level").default(1),
	point: smallint("point"),
	angkatan: smallint("angkatan").notNull(),
	userId: varchar("user_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		memberMemberId: primaryKey(table.memberId)
	}
});

export const memberAssignment = mysqlTable("member_assignment", {
	assignmentId: varchar("assignment_id", { length: 36 }).notNull().references(() => assignment.assignmentId),
	memberId: int("member_id").notNull().references(() => member.memberId),
	url: varchar("url", { length: 255 }).notNull(),
},
(table) => {
	return {
		fkMemberAssignmentMember1Idx: index("fk_member_assignment_member1_idx").on(table.memberId),
		memberAssignmentAssignmentIdMemberId: primaryKey(table.assignmentId, table.memberId)
	}
});

export const memberCourse = mysqlTable("member_course", {
	memberCourseId: int("member_course_id").autoincrement().notNull(),
	progress: smallint("progress").notNull(),
	status: varchar("status", { length: 45 }),
	memberId: int("member_id").notNull().references(() => member.memberId),
	courseId: int("course_id").notNull().references(() => course.courseId),
},
(table) => {
	return {
		fkMemberCourseCourse1Idx: index("fk_member_course_course1_idx").on(table.courseId),
		fkMemberCourseMember1Idx: index("fk_member_course_member1_idx").on(table.memberId),
		memberCourseMemberCourseId: primaryKey(table.memberCourseId)
	}
});

export const memberProgress = mysqlTable("member_progress", {
	memberCourseId: int("member_course_id").notNull(),
	submoduleId: int("submodule_id").notNull(),
	status: varchar("status", { length: 45 }).notNull(),
},
(table) => {
	return {
		fkMemberProgressSubmodule1Idx: index("fk_member_progress_submodule1_idx").on(table.submoduleId),
		memberProgressMemberCourseIdSubmoduleId: primaryKey(table.memberCourseId, table.submoduleId)
	}
});

export const module = mysqlTable("module", {
	moduleId: int("module_id").autoincrement().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	order: smallint("order").notNull(),
	courseId: int("course_id").notNull(),
},
(table) => {
	return {
		fkModuleCourse1Idx: index("fk_module_course1_idx").on(table.courseId),
		moduleModuleId: primaryKey(table.moduleId)
	}
});

export const submodule = mysqlTable("submodule", {
	submoduleId: int("submodule_id").autoincrement().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	type: varchar("type", { length: 45 }).notNull(),
	moduleUrl: varchar("moduleUrl", { length: 255 }).notNull(),
	order: smallint("order").notNull(),
	moduleId: int("module_id").notNull(),
},
(table) => {
	return {
		fkSubmoduleModule1Idx: index("fk_submodule_module1_idx").on(table.moduleId),
		submoduleSubmoduleId: primaryKey(table.submoduleId)
	}
});