'use client';
import Heading from '@/components/heading';
import useCourses from '../../hooks/useCourses';

type Props = {};

const CoursePage = (props: Props) => {
    const { courses, isLoading, isError } = useCourses();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            <Heading heading="h1">Courses</Heading>
            {courses?.map((course) => (
                <div key={course?.courseId}>
                    <div>{course.title}</div>
                    <div>{course.description}</div>
                </div>
            ))}
        </div>
    );
};

export default CoursePage;
