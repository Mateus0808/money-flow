import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"; 

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("ftoken")?.value;
  const protectedRoutes = ["/home", "/dashboard", "/transactions", "/metas", "/settings", "/reports"];

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const isValid = await validateToken(token);
    console.log("isvalid", isValid, token)
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

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return false;
  }
}

export const config = {
  matcher: ["/home", "/dashboard", "/transactions", "/metas", "/settings", "/reports"],
};
