import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { CourseWithCourseType } from '../type/courses.type';

const useCourse = (courseId: number) => {
    const { data, error, isLoading } = useSWR<CourseWithCourseType>(
        courseId ? `/api/courses/${courseId}` : null,
        fetcher
    );

    return {
        course: data,
        isLoading,
        isError: error,
    };
};

export default useCourse;
