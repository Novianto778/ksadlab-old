'use client';
import { UserButton } from '@clerk/nextjs';
import RightSidebar from '@/components/layout/RightSidebar';
import { usePathname } from 'next/navigation';

type Props = {};

const ClientRightSidebar = (props: Props) => {
    const pathname = usePathname();
    const isShowRightSidebar = pathname === '/';
    return (
        isShowRightSidebar && (
            <>
                <RightSidebar className="hidden lg:block" />
                <div className="lg:hidden absolute top-4 right-4 cursor-pointer">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </>
        )
    );
};

export default ClientRightSidebar;
