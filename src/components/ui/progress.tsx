'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/utils/cn';

type ProgressProps = React.ComponentPropsWithoutRef<
    typeof ProgressPrimitive.Root
> & {
    start: number;
    end: number;
    value?: number;
};

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressProps
>(({ className, value = 0, start, end, ...props }, ref) => {
    let percentage = 0;
    if (value) percentage = value;
    if (start && end) percentage = (start / end) * 100;

    return (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(
                'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
                className
            )}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className="h-full w-full flex-1 bg-primary transition-all"
                style={{
                    transform: `translateX(-${100 - (percentage || 0)}%)`,
                }}
            />
            {start >= 0 && end >= 0 && (
                <div className="flex h-full w-full justify-center items-center absolute top-0 left-0 text-sm">
                    <span className="text-foreground">{start}</span>
                    <span className="text-foreground mx-2">/</span>
                    <span className="text-foreground">{end}</span>
                </div>
            )}
        </ProgressPrimitive.Root>
    );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
