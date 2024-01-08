import { InferModel, relations, sql } from 'drizzle-orm';
import {
    datetime,
    index,
    int,
    mysqlTable,
    primaryKey,
    smallint,
    text,
    tinyint,
    varchar,
} from 'drizzle-orm/mysql-core';

export const assignment = mysqlTable(
    'assignment',
    {
        assignmentId: varchar('assignment_id', { length: 36 }).notNull(),
        title: varchar('title', { length: 255 }).notNull(),
        dueDate: datetime('due_date', { mode: 'string' }),
        startDate: datetime('start_date', { mode: 'string' }),
        availableUntil: datetime('available_until', { mode: 'string' }),
        moduleId: int('module_id').references(() => courseModule.moduleId),
    },
    (table) => {
        return {
            fkAssignmentModule1Idx: index('fk_assignment_module1_idx').on(
                table.moduleId
            ),
            assignmentAssignmentId: primaryKey(table.assignmentId),
        };
    }
);

export const course = mysqlTable(
    'course',
    {
        courseId: int('course_id').autoincrement().notNull(),
        title: varchar('title', { length: 255 }).notNull(),
        description: text('description').notNull(),
        totalModule: tinyint('total_module').notNull(),
        level: smallint('level').notNull(),
        cover: varchar('cover', { length: 255 }),
        courseTypeId: smallint('course_type_id')
            .notNull()
            .references(() => courseType.courseTypeId),
    },
    (table) => {
        return {
            fkCourseCourseTypeIdx: index('fk_course_course_type_idx').on(
                table.courseTypeId
            ),
            courseCourseId: primaryKey(table.courseId),
        };
    }
);

export const courseType = mysqlTable(
    'course_type',
    {
        courseTypeId: smallint('course_type_id').autoincrement().notNull(),
        type: varchar('type', { length: 100 }).notNull(),
    },
    (table) => {
        return {
            courseTypeCourseTypeId: primaryKey(table.courseTypeId),
        };
    }
);

export const member = mysqlTable(
    'member',
    {
        memberId: int('member_id').autoincrement().notNull(),
        name: varchar('name', { length: 100 }).notNull(),
        username: varchar('username', { length: 45 }).notNull(),
        level: tinyint('level').default(1),
        point: smallint('point'),
        angkatan: smallint('angkatan').notNull(),
        userId: varchar('user_id', { length: 36 }).notNull(),
    },
    (table) => {
        return {
            memberMemberId: primaryKey(table.memberId),
        };
    }
);

export const memberAssignment = mysqlTable(
    'member_assignment',
    {
        assignmentId: varchar('assignment_id', { length: 36 })
            .notNull()
            .references(() => assignment.assignmentId),
        memberId: int('member_id')
            .notNull()
            .references(() => member.memberId),
        url: varchar('url', { length: 255 }).notNull(),
    },
    (table) => {
        return {
            fkMemberAssignmentMember1Idx: index(
                'fk_member_assignment_member1_idx'
            ).on(table.memberId),
            memberAssignmentAssignmentIdMemberId: primaryKey(
                table.assignmentId,
                table.memberId
            ),
        };
    }
);

export const memberCourse = mysqlTable(
    'member_course',
    {
        memberCourseId: int('member_course_id').autoincrement().notNull(),
        progress: smallint('progress').notNull(),
        status: varchar('status', { length: 45 }).default('ongoing'),
        memberId: int('member_id')
            .notNull()
            .references(() => member.memberId),
        courseId: int('course_id')
            .notNull()
            .references(() => course.courseId),
    },
    (table) => {
        return {
            fkMemberCourseCourse1Idx: index('fk_member_course_course1_idx').on(
                table.courseId
            ),
            fkMemberCourseMember1Idx: index('fk_member_course_member1_idx').on(
                table.memberId
            ),
            memberCourseMemberCourseId: primaryKey(table.memberCourseId),
        };
    }
);

export const memberProgress = mysqlTable(
    'member_progress',
    {
        memberCourseId: int('member_course_id')
            .notNull()
            .references(() => memberCourse.memberCourseId),
        submoduleId: int('submodule_id')
            .notNull()
            .references(() => submodule.submoduleId),
        completed: tinyint('completed').default(0),
        createdAt: datetime('created_at', { mode: 'date' }).default(
            sql`CURRENT_TIMESTAMP`
        ),
        updatedAt: datetime('updated_at', { mode: 'date' }).default(
            sql`CURRENT_TIMESTAMP`
        ),
    },
    (table) => {
        return {
            fkMemberProgressSubmodule1Idx: index(
                'fk_member_progress_submodule1_idx'
            ).on(table.submoduleId),
            memberProgressMemberCourseIdSubmoduleId: primaryKey(
                table.memberCourseId,
                table.submoduleId
            ),
        };
    }
);

export const courseModule = mysqlTable(
    'module',
    {
        moduleId: int('module_id').autoincrement().notNull(),
        title: varchar('title', { length: 255 }).notNull(),
        order: smallint('order').notNull(),
        courseId: int('course_id').notNull(),
    },
    (table) => {
        return {
            fkModuleCourse1Idx: index('fk_module_course1_idx').on(
                table.courseId
            ),
            moduleModuleId: primaryKey(table.moduleId),
        };
    }
);

export const submodule = mysqlTable(
    'submodule',
    {
        submoduleId: int('submodule_id').autoincrement().notNull(),
        title: varchar('title', { length: 255 }).notNull(),
        type: varchar('type', { length: 45 }).notNull(),
        moduleUrl: varchar('moduleUrl', { length: 255 }).notNull(),
        order: smallint('order').notNull(),
        moduleId: int('module_id').notNull(),
    },
    (table) => {
        return {
            fkSubmoduleModule1Idx: index('fk_submodule_module1_idx').on(
                table.moduleId
            ),
            submoduleSubmoduleId: primaryKey(table.submoduleId),
        };
    }
);

export const memberRelations = relations(member, ({ many }) => ({
    memberCourse: many(memberCourse),
    memberAssignment: many(memberAssignment),
}));

export const memberCourseRelations = relations(
    memberCourse,
    ({ many, one }) => ({
        memberProgress: many(memberProgress),
        member: one(member, {
            fields: [memberCourse.memberId],
            references: [member.memberId],
        }),
    })
);

export const memberProgressRelations = relations(memberProgress, ({ one }) => ({
    submodule: one(submodule, {
        fields: [memberProgress.submoduleId],
        references: [submodule.submoduleId],
    }),
    memberCourse: one(memberCourse, {
        fields: [memberProgress.memberCourseId],
        references: [memberCourse.memberCourseId],
    }),
}));

export const memberAssignmentRelations = relations(
    memberAssignment,
    ({ one }) => ({
        assignment: one(assignment, {
            fields: [memberAssignment.assignmentId],
            references: [assignment.assignmentId],
        }),
        member: one(member, {
            fields: [memberAssignment.memberId],
            references: [member.memberId],
        }),
    })
);

export const coursesRelations = relations(course, ({ many, one }) => ({
    courseModule: many(courseModule),
    courseType: one(courseType, {
        fields: [course.courseTypeId],
        references: [courseType.courseTypeId],
    }),
}));

export const courseModuleRelations = relations(
    courseModule,
    ({ many, one }) => ({
        submodules: many(submodule),
        course: one(course, {
            fields: [courseModule.courseId],
            references: [course.courseId],
        }),
    })
);

export const submoduleRelations = relations(submodule, ({ one }) => ({
    module: one(courseModule, {
        fields: [submodule.moduleId],
        references: [courseModule.moduleId],
    }),
}));

export type Assignment = InferModel<typeof assignment>;
export type NewAssignment = InferModel<typeof assignment, 'insert'>;
export type Course = InferModel<typeof course>;
export type NewCourse = InferModel<typeof course, 'insert'>;
export type CourseType = InferModel<typeof courseType>;
export type NewCourseType = InferModel<typeof courseType, 'insert'>;
export type Member = InferModel<typeof member>;
export type NewMember = InferModel<typeof member, 'insert'>;
export type MemberAssignment = InferModel<typeof memberAssignment>;
export type NewMemberAssignment = InferModel<typeof memberAssignment, 'insert'>;
export type MemberCourse = InferModel<typeof memberCourse>;
export type NewMemberCourse = InferModel<typeof memberCourse, 'insert'>;
export type MemberProgress = InferModel<typeof memberProgress>;

export type NewMemberProgress = InferModel<typeof memberProgress, 'insert'>;
export type CourseModule = InferModel<typeof courseModule>;
export type NewCourseModule = InferModel<typeof courseModule, 'insert'>;
export type Submodule = InferModel<typeof submodule>;
export type NewSubmodule = InferModel<typeof submodule, 'insert'>;
