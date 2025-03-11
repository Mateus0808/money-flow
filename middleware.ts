import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("ftoken")?.value;
  const protectedRoutes = ["/home", "/dashboard", "/transactions", "/metas", "/settings", "/reports"];

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/dashboard", "/transactions", "/metas", "/settings", "/reports"],
};
