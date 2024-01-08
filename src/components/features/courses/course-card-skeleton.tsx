import React from 'react';
import { Skeleton } from '../../ui/skeleton';

type Props = {};

const CourseCardSkeleton = (props: Props) => {
    return (
        <Skeleton className="h-80">
            <Skeleton className="h-32 bg-background rounded-t-lg"></Skeleton>
            <Skeleton className="p-6 flex flex-col flex-1">
                <Skeleton className="h-4 bg-background rounded"></Skeleton>
                <Skeleton className="h-4 bg-background rounded mt-2"></Skeleton>
                <Skeleton className="h-4 bg-background rounded mt-2"></Skeleton>

                <Skeleton className="flex gap-2 items-center mt-4">
                    <Skeleton className="h-4 bg-background rounded w-1/3"></Skeleton>
                    <Skeleton className="h-4 bg-background rounded w-1/3"></Skeleton>
                </Skeleton>
            </Skeleton>
        </Skeleton>
    );
};

export default CourseCardSkeleton;
