'use client';
import fetcher from '@/lib/fetcher';
import { UserMember } from '@/type/user.types';
import { useUser as getUser } from '@clerk/nextjs';
import useSWR from 'swr';
import { Course } from '../lib/db/schema';

const useUser = () => {
    const { user } = getUser();
    const { data, isLoading, error, mutate } = useSWR(
        user?.id ? `/api/members/${user.id}` : null,
        fetcher
    );

    const userWithMember = {
        ...user,
        ...data,
    } as UserMember;

    const isUserCanAccessCourse = (course: Course | undefined) => {
        const courseLevel = course?.level || 1;
        if ((data?.level || 1) >= courseLevel) {
            return true;
        }
        return false;
    };

    return {
        user: userWithMember,
        isLoading,
        error,
        mutate,
        isUserCanAccessCourse,
    };
};

export default useUser;
