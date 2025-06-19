import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const publicUrls = ["/login", "/register"];

  const path = request.nextUrl.pathname;

  const isPublicUrl = publicUrls.some((url) => url === path);

  const token = request.cookies.get("token")?.value || "";

  if (isPublicUrl && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!isPublicUrl && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login, /register ,"],
};
