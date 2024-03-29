'use client';
import useMediaQuery from '@/hooks/useMediaQueries';
import { useSidebarStore } from '@/store/sidebarStore';
import { cn } from '@/utils/cn';
import { SignOutButton } from '@clerk/nextjs';
import {
    BookOpen,
    ChevronsRight,
    ClipboardList,
    GraduationCap,
    LayoutDashboard,
    LogOut,
} from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import SidebarListItem from './sidebar-list-item';
const Sidebar = () => {
    const { isOpen, toggleSidebar, setIsOpen } = useSidebarStore();
    const matches = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        if (matches) {
            setIsOpen(false);
        }
    }, [matches, setIsOpen]);

    const pathname = usePathname();

    const Menus = [
        { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { title: 'Courses', icon: BookOpen, path: '/courses' },
        { title: 'Assignment', icon: ClipboardList, path: '/assignment' },
        { title: 'members', icon: GraduationCap, path: '/members' },
    ];

    return (
        <>
            <div
                className={` ${
                    isOpen ? 'w-72' : 'w-20 '
                } bg-sidebar h-screen p-5 pt-8 sticky top-0 duration-300`}
            >
                {!matches ? (
                    <div>
                        <ChevronsRight
                            className={`absolute cursor-pointer -right-3 top-9 w-7
                                        border-2 rounded-full  ${
                                            !isOpen && 'rotate-180'
                                        }`}
                            onClick={toggleSidebar}
                        />
                    </div>
                ) : null}
                <div className="flex gap-x-4 items-center">
                    <Image alt="logo" src="/logo.png" width={40} height={40} />
                    <h1
                        className={`text-foreground font-bold origin-left text-xl duration-200 tracking-widest ${
                            !isOpen && 'scale-0'
                        }`}
                    >
                        KSADLAB
                    </h1>
                </div>
                <div className="pt-6">
                    {Menus.map((Menu, index) => {
                        const isActive =
                            pathname === '/'
                                ? Menu.path === pathname
                                : pathname.startsWith(Menu.path) &&
                                  Menu.path !== '/';
                        return (
                            <SidebarListItem
                                key={index}
                                path={Menu.path}
                                title={Menu.title}
                                icon={Menu.icon}
                                isOpen={isOpen}
                                isActive={isActive}
                            />
                        );
                    })}
                    <SignOutButton>
                        <SidebarListItem
                            icon={LogOut}
                            path="/"
                            title="Logout"
                            isOpen={isOpen}
                            asChild
                            className={cn(
                                'absolute bottom-0 left-8 p-2',
                                !isOpen && 'left-1/2 -translate-x-1/2'
                            )}
                        />
                    </SignOutButton>
                </div>
            </div>
        </>
    );
};
export default Sidebar;
