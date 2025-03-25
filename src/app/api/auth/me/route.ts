import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("mfToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string, name: string };

    return NextResponse.json({ id: decoded.id, email: decoded.email, name: decoded.name }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}