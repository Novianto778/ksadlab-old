'use client';
import CourseModuleAccordion from '@/features/courses/course-module-accordion';
import useCourse from '@/hooks/useCourse';
import Loader from '@/components/loader';

type Props = {
    children: React.ReactNode;
    params: {
        id: string;
        submoduleId: string;
    };
};

const CourseSubmoduleLayout = ({ children, params }: Props) => {
    const { course, isLoading } = useCourse(+params.id);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <main className="mt-4">
            <div className="flex items-center justify-between bg-background shadow-sm border py-2 px-4 rounded-sm">
                <h2 className="text-xl font-bold text-primary">
                    Course {course?.course.title}
                </h2>
                <p>{course?.course.totalModule} Modules</p>
            </div>
            <div className="flex gap-8 mt-4">
                <div className="w-96">
                    <CourseModuleAccordion params={params} />
                </div>
                {children}
            </div>
        </main>
    );
};

export default CourseSubmoduleLayout;
