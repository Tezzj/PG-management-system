import { NextRequest } from 'next/server';
import authenticated from '@/app/(auth)/authenticated';
import {
  authRoutes,
  publicRoutes,
  protectedRoutes,
  unauthenticatedRoutes,
} from '@/lib/constants/routes';

export async function middleware(request: NextRequest) {
  const isAuthenticated = await authenticated();
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);
  const isPublicRoute = publicRoutes.some(
    (route) => route.path === request.nextUrl.pathname
  );
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If user is authenticated and tries to access auth routes (login/register)
  if (isAuthenticated && isAuthRoute) {
    return Response.redirect(new URL('/', request.url));
  }

  // If user is not authenticated and tries to access protected routes (including dashboard)
  if (!isAuthenticated && isProtectedRoute) {
    return Response.redirect(new URL('/login', request.url));
  }

  // For all other routes that aren't public or auth routes
  if (
    !isAuthenticated &&
    !isPublicRoute &&
    !unauthenticatedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route.path)
    )
  ) {
    return Response.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
