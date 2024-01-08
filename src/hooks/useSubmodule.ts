import { Submodule } from '@/lib/db/schema';
import fetcher from '@/lib/fetcher';
import axios from 'axios';
import useSWR from 'swr';

export const getNextSubmodule = async (
    courseId: number,
    submoduleId: number,
    memberCourseId: number
) => {
    const res = await axios.post(
        `/api/courses/${courseId}/submodule/${submoduleId}`,
        {
            memberCourseId,
        }
    );

    return res.data;
};

const useSubmodule = (courseId: number, submoduleId: number) => {
    const { data, error, isLoading, mutate } = useSWR<Submodule>(
        submoduleId && courseId
            ? `/api/courses/${courseId}/submodule/${submoduleId}`
            : null,
        fetcher
    );

    return {
        submodule: data,
        isLoading,
        isError: error,
        mutate,
    };
};

export default useSubmodule;
