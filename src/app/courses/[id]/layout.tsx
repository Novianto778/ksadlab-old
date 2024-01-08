'use client';
import Link from 'next/link';
import React from 'react';
import useCourse from '@/hooks/useCourse';
import useUser from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import Loader from '@/components/loader';

type Props = {
    children: React.ReactNode;
    params: {
        id: number;
    };
};

const CourseLayout = ({ children, params }: Props) => {
    const { isUserCanAccessCourse } = useUser();

    const { course, isLoading } = useCourse(params.id);

    if (isLoading) {
        return <Loader />;
    }

    if (!isUserCanAccessCourse(course?.course)) {
        return (
            <div className="text-center flex flex-col h-course-content w-full items-center justify-center">
                <h2 className="font-bold text-2xl">
                    You are not allowed to access this course
                </h2>
                <Button asChild variant="primary" className="mt-4">
                    <Link href="/courses">Back to Courses</Link>
                </Button>
            </div>
        );
    }
    return children;
};

export default CourseLayout;
