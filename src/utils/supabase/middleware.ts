import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getRoleFromUser, hasPermission } from "@/lib/rbac/rbac";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data: { user } } = await supabase.auth.getUser();

    // Public routes - always accessible
    const publicRoutes = ['/', '/sign-in', '/sign-up', '/forgot-password'];
    if (publicRoutes.includes(request.nextUrl.pathname)) {
      // Redirect authenticated users from home to dashboard
      if (user && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return response;
    }

    // Authentication check for protected routes
    if (request.nextUrl.pathname.startsWith("/dashboard") || 
        request.nextUrl.pathname.startsWith("/protected")) {
      // If not authenticated, redirect to sign-in
      if (!user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    // Role-specific routes protection using our RBAC system
    const role = getRoleFromUser(user);

    // Define permissions required for specific routes
    const routePermissions: Record<string, { action: string; subject: string }> = {
      '/protected/patient': { action: 'read', subject: 'patient-profile' },
      '/protected/doctor': { action: 'read', subject: 'doctor-profile' },
    };

    // Check permissions for specific routes
    for (const [route, permission] of Object.entries(routePermissions)) {
      if (request.nextUrl.pathname.startsWith(route)) {
        if (!hasPermission(role, permission.action, permission.subject)) {
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      }
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
