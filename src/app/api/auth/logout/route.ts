import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout realizado com sucesso" },
      { status: 200 }
    );

    const deleteCookie = (name: string) => 
      `${name}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

    response.headers.append("Set-Cookie", deleteCookie("mfToken"));
    response.headers.append("Set-Cookie", deleteCookie("moneyId"));

    return response;
  } catch {
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}