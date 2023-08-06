'use client';
import Heading from '@/components/heading';
import LevelBar from '@/components/level-bar';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { placeholderImageURL } from '@/config/constant/url';
import useCourses from '@/hooks/useCourses';
import { useSidebarStore } from '@/store/sidebarStore';
import { cn } from '@/utils/cn';
import { Lock } from 'lucide-react';
import Image from 'next/image';

const CoursePage = () => {
    const { courses, isLoading, isError } = useCourses();
    const isOpen = useSidebarStore((state) => state.isOpen);

    let gridClass;

    if (isOpen) {
        gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    } else {
        gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            <Heading heading="h1">Courses</Heading>
            <div className={cn('grid gap-4 mt-8', gridClass)}>
                {courses?.map(({ course, course_type }) => (
                    <div
                        key={course.courseId}
                        className="overflow-hidden bg-white rounded-lg shadow-lg"
                    >
                        <Image
                            src={course.cover || placeholderImageURL}
                            className="object-cover w-full h-48"
                            width={400}
                            height={400}
                            alt={course.title}
                        />
                        <div className="p-6">
                            <h3 className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                {course_type.type}
                            </h3>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {course.title}
                            </h2>
                            <div className="flex gap-2 items-center">
                                <p className="text-sm font-medium text-blue-600">
                                    {course.totalModule} Modules
                                </p>
                                <span>|</span>
                                Level <LevelBar level={course.level} />
                            </div>
                            <Button
                                className="rounded-full mt-4 w-full flex gap-2"
                                variant="primary"
                            >
                                <Lock size={18} />
                                Enroll Now
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursePage;
