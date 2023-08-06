import React from 'react';
import { MAX_LEVEL } from '../config/constant/course';

type Props = {
    level: number;
};

const LevelBar = ({ level }: Props) => {
    return (
        <div className="flex gap-1 items-end">
            {Array.from({ length: MAX_LEVEL }).map((_, index) => (
                <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                        index < level
                            ? 'bg-blue-600'
                            : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                />
            ))}
        </div>
    );
};

export default LevelBar;
