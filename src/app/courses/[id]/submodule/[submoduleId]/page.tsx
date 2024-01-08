'use client';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import CourseSubmoduleContent from '@/features/courses/course-submodule-content';
import useMemberCourseProgress from '@/hooks/useMemberCourseProgress';
import useSubmodule, { getNextSubmodule } from '@/hooks/useSubmodule';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import useCourseModules from '../../../../../hooks/useCourseModules';
import { is } from 'drizzle-orm';

type Props = {
    params: {
        id: number;
        submoduleId: number;
    };
};

const CourseSubmodulePage = ({ params: { id, submoduleId } }: Props) => {
    const { user } = useUser();
    const { submodule, isLoading, mutate } = useSubmodule(id, submoduleId);
    const { memberCourseProgress } = useMemberCourseProgress(user.memberId, id);
    const { courseModules } = useCourseModules(+id);
    const router = useRouter();

    const isLastSubmodule =
        courseModules?.courseModule.slice(-1)[0].submodules.slice(-1)[0]
            .submoduleId === +submoduleId;

    const isLastSubmoduleToFinish =
        memberCourseProgress?.progress! >= courseModules?.totalModule! - 1;

    const handleNextSubmodule = async () => {
        if (!memberCourseProgress) return;
        const nextSubmodule = await getNextSubmodule(
            id,
            submoduleId,
            memberCourseProgress?.memberCourseId
        );

        mutate(nextSubmodule);
        router.push(
            `/courses/${id}/submodule/${
                nextSubmodule.submoduleId || nextSubmodule.submodule_id
            }`
        );
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            {isLastSubmodule ? (
                isLastSubmoduleToFinish ? (
                    <Button
                        className="w-max self-end"
                        // onClick={handleNextSubmodule}
                        variant="primary"
                    >
                        Finish
                    </Button>
                ) : null
            ) : (
                <Button
                    className="w-max self-end"
                    onClick={handleNextSubmodule}
                >
                    Continue
                </Button>
            )}
            <CourseSubmoduleContent
                type={submodule?.type || 'video'}
                url={submodule?.moduleUrl || ''}
            />
        </div>
    );
};

export default CourseSubmodulePage;
