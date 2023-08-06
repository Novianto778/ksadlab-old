import { ClerkProvider, UserButton } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import ClientRightSidebar from '../components/client-only/ClientRightSidebar';
import { Sidebar } from '../components/layout';
import './globals.css';
import ClientSidebar from '../components/client-only/ClientSidebar';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'KSADLAB',
    description: 'LMS for KSAD',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={outfit.className}>
                    <div className="flex">
                        <ClientSidebar />
                        <div className="lg:hidden absolute top-4 right-4 cursor-pointer">
                            <UserButton afterSignOutUrl="/" />
                        </div>

                        <div className="flex-1 px-8 py-4">{children}</div>
                        <ClientRightSidebar />
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
