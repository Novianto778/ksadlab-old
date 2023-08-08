import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import ClientRightSidebar from '@/components/client-only/ClientRightSidebar';
import ClientSidebar from '@/components/client-only/ClientSidebar';
import './globals.css';
import { Toaster } from 'react-hot-toast';

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
                    <div className="flex w-full max-w-full">
                        <ClientSidebar />
                        <Toaster />
                        <div className="flex-1 px-8 py-4 max-w-full w-course-content">
                            {children}
                        </div>
                        <ClientRightSidebar />
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
