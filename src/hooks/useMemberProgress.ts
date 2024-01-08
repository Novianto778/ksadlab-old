import fetcher from '@/lib/fetcher';
import useSWR from 'swr';
import { MemberCourseProgress } from '../type/courses.type';

const useMemberProgress = (memberId: number) => {
    const { data, isLoading, error, mutate } = useSWR<MemberCourseProgress>(
        memberId ? `/api/member-progress/${memberId}` : null,
        fetcher
    );

    return {
        member_progress: data,
        isLoading,
        error,
        mutate,
    };
};

export default useMemberProgress;
