'use client';
import useMemberCourseProgress from '@/hooks/useMemberCourseProgress';
import useUser from '@/hooks/useUser';
import { Submodule } from '@/lib/db/schema';
import { cn } from '@/utils/cn';
import { CheckCircle2, FileText, LinkIcon, PlaySquare } from 'lucide-react';
import Link from 'next/link';

type Props = {
    type: string;
    title: string;
    currentSubmoduleId: string;
    submodule: Submodule;
    courseId: string;
};

const CourseSubmoduleItem = ({
    type,
    title,
    currentSubmoduleId,
    submodule,
    courseId,
}: Props) => {
    const { user } = useUser();
    const { memberCourseProgress } = useMemberCourseProgress(
        user?.memberId,
        +courseId
    );

    const isActive = +currentSubmoduleId === submodule.submoduleId;
    const isFinished = memberCourseProgress?.memberProgress?.some(
        (progress) => progress.submoduleId === submodule.submoduleId
    );
    return (
        <Link
            href={`/courses/${courseId}/submodule/${submodule.submoduleId}`}
            className={cn(
                'flex items-center justify-between p-2 px-4',
                isActive && 'border-primary border bg-primary/20 rounded-sm'
            )}
        >
            <div className="flex items-center gap-2">
                {type === 'video' && <PlaySquare size={16} />}
                {type === 'pdf' && <FileText size={16} />}
                {type === 'resource' && <LinkIcon size={16} />}

                {title}
            </div>
            {isFinished && <CheckCircle2 size={16} className="text-primary" />}
        </Link>
    );
};

export default CourseSubmoduleItem;
