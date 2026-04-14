import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/"
])
const isPublicApiRoute = createRouteMatcher([
    // Public API routes if any
])


export default clerkMiddleware((auth, req) => {
    try {
        const { userId, sessionClaims } = auth();
        const currentUrl = new URL(req.url);
        
        // Detailed Backend Logging
        console.log(`[AUTH] Route: ${currentUrl.pathname} | UserID: ${userId || 'Unauthenticated'} | Method: ${req.method}`);
        
        const isAccessingDashboard = currentUrl.pathname === "/home";
        const isApiRequest = currentUrl.pathname.startsWith("/api");

        // If user is logged in and accessing a public route but not the dashboard
        if (userId && isPublicRoute(req) && !isAccessingDashboard) {
            console.log(`[AUTH] Logged-in user redirected from public route to /home`);
            return NextResponse.redirect(new URL("/home", req.url));
        }

        // Not logged in handling
        if (!userId) {
            // Protected routes
            if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
                console.log(`[AUTH] Unauthenticated access to protected route: ${currentUrl.pathname}. Redirecting to /sign-in`);
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }

            // Protected API routes
            if (isApiRequest && !isPublicApiRoute(req)) {
                console.log(`[AUTH] Unauthenticated API request: ${currentUrl.pathname}. Blocking access.`);
                return new NextResponse("Authentication required", { status: 401 });
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error(`[AUTH_ERROR] Middleware failure:`, error);
        return NextResponse.next(); // Fallback to allow next step even if logging fails
    }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
