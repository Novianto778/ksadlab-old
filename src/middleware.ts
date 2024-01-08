import { authMiddleware, clerkClient, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
    publicRoutes: ['/api/webhook/clerk'],
    ignoredRoutes: ['/api/webhook/clerk'],
    afterAuth: async (auth, req, evt) => {
        const pathname = req.nextUrl.pathname;
        const publicRoutes = auth.isPublicRoute;
        if (!publicRoutes && !auth.userId) {
            return redirectToSignIn({
                returnBackUrl: req.url,
            });
        }
        if (!auth.userId) return console.log('no user');
        const user = await clerkClient.users.getUser(auth.userId);
        if (pathname === '/members' && user.publicMetadata.role !== 'admin') {
            const homeUrl = new URL('/', req.nextUrl.origin);
            return NextResponse.redirect(homeUrl.href);
        }
    },
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
