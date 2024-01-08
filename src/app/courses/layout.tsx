import Heading from '@/components/heading';

type Props = {
    children: React.ReactNode;
};

const CoursesLayout = ({ children }: Props) => {
    return (
        <main>
            <Heading heading="h1">Courses</Heading>
            {children}
        </main>
    );
};

export default CoursesLayout;
