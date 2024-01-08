import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { CourseModuleSubmodule } from '../type/courses.type';

const useCourseModules = (courseId: number) => {
    const { data, error, isLoading } = useSWR<CourseModuleSubmodule>(
        courseId ? `/api/courses/${courseId}/module` : null,
        fetcher
    );

    return {
        courseModules: data,
        isLoading,
        isError: error,
    };
};

export default useCourseModules;
