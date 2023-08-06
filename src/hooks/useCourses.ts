import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { CourseWithCourseType } from '../type/courses.type';

const useCourses = () => {
    const { data, error, isLoading } = useSWR<CourseWithCourseType[]>(
        '/api/courses',
        fetcher
    );

    return {
        courses: data,
        isLoading,
        isError: error,
    };
};

export default useCourses;
