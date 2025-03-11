import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout realizado com sucesso" },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      "ftoken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}