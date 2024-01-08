import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const useCourseLastProgress = (
    memberId: number,
    courseId: number,
    isAllowed: boolean
) => {
    const { data, isLoading, error, mutate } = useSWR<number>(
        memberId && courseId && isAllowed
            ? `/api/member-progress/${memberId}/course/${courseId}/last-progress`
            : null,
        fetcher
    );

    return {
        lastProgressId: data,
        isLoading,
        error,
        mutate,
    };
};

export default useCourseLastProgress;
