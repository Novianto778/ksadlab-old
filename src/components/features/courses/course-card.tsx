'use client';
import { placeholderImageURL } from '@/config/constant/url';
import useMemberProgress from '@/hooks/useMemberProgress';
import useUser from '@/hooks/useUser';
import { Course, CourseType } from '@/lib/db/schema';
import Image from 'next/image';
import LevelBar from '../../level-bar';
import { Progress } from '../../ui/progress';
import CourseCardButton from './course-card-button';
import CourseCardSkeleton from './course-card-skeleton';
import useCourseLastProgress from '@/hooks/useCourseLastProgress';
import { useRouter } from 'next/navigation';
import useMemberCourseProgress, {
    learnCourse,
} from '@/hooks/useMemberCourseProgress';

type Props = {
    course: Course;
    course_type: CourseType;
    isAllowed?: boolean;
};

const CourseCard = ({ course, course_type, isAllowed = false }: Props) => {
    const { user } = useUser();
    const router = useRouter();
    const { mutate } = useMemberCourseProgress(user?.memberId, course.courseId);
    const { member_progress, isLoading } = useMemberProgress(user?.memberId);
    const { lastProgressId } = useCourseLastProgress(
        user?.memberId,
        course.courseId,
        isAllowed
    );
    if (isLoading) {
        return <CourseCardSkeleton />;
    }

    const userProgress = member_progress?.memberCourse.find(
        (memberCourse) => memberCourse.courseId === course.courseId
    );

    const isUserProgressExist = userProgress ? true : false;

    const userCourseProgress = userProgress?.progress || 0;
    const totalModule = course.totalModule;

    const handleNavigate = () => {
        if (isAllowed) {
            if (lastProgressId) {
                router.push(
                    `/courses/${course.courseId}/submodule/${lastProgressId}`
                );
            }
        }
    };

    const handleLearn = async () => {
        const res = await learnCourse(course.courseId, user.memberId);
        mutate(res);
    };

    return (
        <div
            key={course.courseId}
            className="overflow-hidden bg-background rounded-lg shadow-lg h-80 flex flex-col"
        >
            <Image
                src={course.cover || placeholderImageURL}
                className="object-cover w-full h-32"
                width={400}
                height={400}
                alt={course.title}
            />
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xs font-semibold tracking-wide text-foreground/90 uppercase">
                    {course_type.type}
                </h3>
                <h2 className="text-xl font-semibold text-foreground">
                    {course.title}
                </h2>
                <div className="flex gap-2 items-center">
                    <p className="text-sm font-medium text-blue-600">
                        {course.totalModule} Modules
                    </p>
                    <span>|</span>
                    Level <LevelBar level={course.level} />
                </div>
                {isUserProgressExist && (
                    <Progress
                        className="mt-2"
                        start={userCourseProgress}
                        end={totalModule}
                    />
                )}
                <CourseCardButton
                    isAllowed={isAllowed}
                    isUserProgressExist={isUserProgressExist}
                    className="mt-auto"
                    onNavigate={handleNavigate}
                    onLearn={handleLearn}
                />
            </div>
        </div>
    );
};

export default CourseCard;
