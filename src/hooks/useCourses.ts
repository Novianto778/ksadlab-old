import useSWR from 'swr';
import { Course } from '../lib/db/schema';
import fetcher from '../lib/fetcher';

const useCourses = () => {
    const { data, error, isLoading } = useSWR<Course[]>(
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
