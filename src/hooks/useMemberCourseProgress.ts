import fetcher from '@/lib/fetcher';
import axios from 'axios';
import useSWR from 'swr';
import { MemberCourse, MemberProgress } from '../lib/db/schema';

type CourseProgress = MemberCourse & {
    memberProgress: MemberProgress[];
};

export const learnCourse = async (courseId: number, memberId: number) => {
    const res = await axios.post(
        `/api/member-progress/${memberId}/course/${courseId}`,
        {
            memberId,
        }
    );

    return res.data;
};

const useMemberCourseProgress = (memberId: number, courseId: number) => {
    const { data, isLoading, error, mutate } = useSWR<CourseProgress>(
        memberId && courseId
            ? `/api/member-progress/${memberId}/course/${courseId}`
            : null,
        fetcher
    );

    return {
        memberCourseProgress: data,
        isLoading,
        error,
        mutate,
    };
};

export default useMemberCourseProgress;
