import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Public routes that don't require authentication
    if (
      pathname.startsWith("/auth") ||
      pathname === "/" ||
      pathname.startsWith("/api/contact")
    ) {
      return NextResponse.next();
    }

    // Check if user is authenticated
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const role = token.role as string;

    // Role-based route protection
    if (pathname.startsWith("/dashboard")) {
      const allowedRoles = {
        "/dashboard/super-admin": ["super_admin"],
        "/dashboard/principal": ["super_admin", "principal"],
        "/dashboard/vice-principal": [
          "super_admin",
          "principal",
          "vice_principal",
        ],
        "/dashboard/teacher": [
          "super_admin",
          "principal",
          "vice_principal",
          "teacher",
        ],
        "/dashboard/parent": [
          "super_admin",
          "principal",
          "vice_principal",
          "parent",
        ],
      };

      const matchedRoute = Object.keys(allowedRoles).find((route) =>
        pathname.startsWith(route)
      );

      if (
        matchedRoute &&
        !allowedRoles[matchedRoute as keyof typeof allowedRoles].includes(role)
      ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow public routes
        if (
          pathname.startsWith("/auth") ||
          pathname === "/" ||
          pathname.startsWith("/api/contact")
        ) {
          return true;
        }

        // Require authentication for protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
