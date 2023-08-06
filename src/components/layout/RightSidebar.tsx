'use client';
import { Edit, Sun, Moon } from 'lucide-react';
import { Calendar } from '@/components/ui';
import { cn } from '@/utils/cn';
import useDarkMode from '@/hooks/useDarkMode';
import { UserButton, useUser } from '@clerk/nextjs';

type Props = {
    className?: string;
};

const RightSidebar = ({ className }: Props) => {
    const { theme, toggleTheme } = useDarkMode();
    const { isLoaded, user } = useUser();
    return (
        <div className={cn('w-80 p-4 flex flex-col items-center', className)}>
            <div className="flex items-center justify-between w-full">
                <h2 className="text-lg font-bold">Profile</h2>
                <div className="flex gap-4">
                    {theme === 'dark' ? (
                        <Sun
                            className="cursor-pointer select-none"
                            size={20}
                            onClick={toggleTheme}
                            fill="white"
                        />
                    ) : (
                        <Moon
                            className="cursor-pointer select-none"
                            size={20}
                            onClick={toggleTheme}
                            fill="black"
                        />
                    )}
                    <Edit className="cursor-pointer select-none" size={20} />
                </div>
            </div>
            <div className="mt-6 flex flex-col items-center">
                <UserButton afterSignOutUrl="/" />
                <h3 className="mt-2 text-lg font-bold">
                    Hello, {isLoaded ? user?.username : 'Loading...'}
                </h3>
                <Calendar className="mt-4" />
            </div>
        </div>
    );
};

export default RightSidebar;
