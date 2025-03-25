import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"; 

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("mfToken")?.value || "";
  const protectedRoutes = ["/home", "/dashboard", "/transactions", "/metas", "/settings", "/reports"];

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const isValid = await validateToken(token);

    if (!isValid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string): Promise<boolean> {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === "string") {
      return false;
    }

    if ("exp" in decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export const config = {
  matcher: [
    "/home/:path*", "/dashboard/:path*", "/transactions/:path*", 
    "/metas/:path*", "/settings/:path*", "/reports/:path*"],
};
