'use client'
import { usePathname } from 'next/navigation';
import { Sidebar } from '../layout';

type Props = {};

const ClientSidebar = (props: Props) => {
    const pathname = usePathname();
    const isHideSidebar =
        pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
    return !isHideSidebar && <Sidebar />;
};

export default ClientSidebar;
