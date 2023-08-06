import { Course, CourseType } from '@/lib/db/schema';

export type CourseWithCourseType = {
    course: Course;
    course_type: CourseType;
};
