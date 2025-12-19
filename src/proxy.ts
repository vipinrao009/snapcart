import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ public routes
  const publicRoutes = ["/login", "/register", "/api/auth"];

  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ✅ IMPORTANT: NEXTAUTH_SECRET only
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (!token) {
    // ✅ NEVER use req.url here
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";

    // ✅ DO NOT encode manually
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);

    return NextResponse.redirect(loginUrl);
  }

  const role = token.role;

  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (pathname.startsWith("/delivery") && role !== "deliveryBoy") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ✅ logged in
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
