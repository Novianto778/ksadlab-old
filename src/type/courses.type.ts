import {
    Course,
    CourseModule,
    CourseType,
    Member,
    MemberCourse,
    MemberProgress,
    Submodule,
} from '@/lib/db/schema';

export type CourseWithCourseType = {
    course: Course;
    course_type: CourseType;
};

export type CourseModuleSubmodule = Course & {
    courseModule: (CourseModule & {
        submodules: Submodule[];
    })[];
};

export type MemberCourseProgress = Member & {
    memberCourse: (MemberCourse & {
        memberProgress: MemberProgress[];
    })[];
};
