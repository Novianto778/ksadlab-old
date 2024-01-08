import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import ClientRightSidebar from '@/components/client-only/client-right-sidebar';
import ClientSidebar from '@/components/client-only/client-sidebar';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';

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
                    <NextTopLoader
                        color="#2299DD"
                        crawlSpeed={200}
                        height={3}
                        crawl={true}
                        showSpinner={true}
                        easing="ease"
                        speed={200}
                        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                    />
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
