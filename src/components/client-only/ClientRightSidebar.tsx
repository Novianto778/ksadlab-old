'use client';
import RightSidebar from '../layout/RightSidebar';
import { usePathname } from 'next/navigation';

type Props = {};

const ClientRightSidebar = (props: Props) => {
    const pathname = usePathname();
    const isShowRightSidebar = pathname === '/';
    return isShowRightSidebar && <RightSidebar className="hidden lg:block" />;
};

export default ClientRightSidebar;
