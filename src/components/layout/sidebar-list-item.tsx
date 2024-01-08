import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

type Props = {
    path: string;
    title: string;
    icon: LucideIcon;
    isOpen: boolean;
    className?: string;
    asChild?: boolean;
    isActive?: boolean;
    onClick?: () => void;
};

const SidebarListItem = ({
    path,
    title,
    icon: Icon,
    isOpen,
    isActive,
    className,
    asChild = false,
    onClick,
    ...props
}: Props) => {
    const Comp = asChild ? 'div' : Link;
    return (
        <Comp
            href={path as any}
            className={cn(
                'flex rounded-md p-4 cursor-pointer text-foreground items-center gap-x-4 mt-2 hover:bg-foreground hover:text-background duration-200',
                !isOpen && 'justify-center p-2 mb-6',
                isActive && 'bg-foreground text-background',
                className
            )}
            onClick={onClick}
            {...props}
        >
            <Icon
                className={`origin-left duration-200 flex-shrink-0`}
                size={24}
            />

            <span
                className={`font-medium ${
                    !isOpen && 'hidden'
                } origin-left duration-200`}
            >
                {title}
            </span>
        </Comp>
    );
};

export default SidebarListItem;
