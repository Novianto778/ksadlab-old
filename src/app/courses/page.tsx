'use client';
import Loader from '@/components/loader';
import CourseCard from '@/features/courses/course-card';
import useCourses from '@/hooks/useCourses';
import useUser from '@/hooks/useUser';
import { useSidebarStore } from '@/store/sidebarStore';
import { cn } from '@/utils/cn';

const CoursePage = () => {
    const { courses, isLoading, isError } = useCourses();
    const { isUserCanAccessCourse } = useUser();

    const isOpen = useSidebarStore((state) => state.isOpen);

    let gridClass;

    if (isOpen) {
        gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    } else {
        gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <>
            <div className={cn('grid gap-4 mt-8', gridClass)}>
                {courses?.map(({ course, course_type }) => {
                    const isAllowed = isUserCanAccessCourse(course);

                    return (
                        <CourseCard
                            key={course.courseId}
                            course={course}
                            course_type={course_type}
                            isAllowed={isAllowed}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default CoursePage;
