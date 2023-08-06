'use client';
import { cn } from '@/utils/cn';
import {
    BookOpen,
    ChevronsRight,
    ClipboardList,
    GraduationCap,
    LayoutDashboard,
    LogOut,
} from 'lucide-react';
import { useSidebarStore } from '@/store/sidebarStore';
import SidebarListItem from './SidebarListItem';
import Image from 'next/image';
import { SignOutButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
const Sidebar = () => {
    const { isOpen, toggleSidebar } = useSidebarStore();

    const pathname = usePathname();

    const Menus = [
        { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { title: 'Course', icon: BookOpen, path: '/course' },
        { title: 'Assignment', icon: ClipboardList, path: '/assignment' },
        { title: 'Student', icon: GraduationCap, path: '/student' },
    ];

    return (
        <>
            <div
                className={` ${
                    isOpen ? 'w-72' : 'w-20 '
                } bg-sidebar h-screen p-5 pt-8 sticky top-0 duration-300`}
            >
                <ChevronsRight
                    className={`absolute cursor-pointer -right-3 top-9 w-7
                            border-2 rounded-full  ${!isOpen && 'rotate-180'}`}
                    onClick={toggleSidebar}
                />
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
                <ul className="pt-6">
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
                </ul>
            </div>
        </>
    );
};
export default Sidebar;
