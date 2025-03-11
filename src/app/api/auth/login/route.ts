import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Email ou senha incorreto' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Email ou senha incorreto" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    
    const response = NextResponse.json(
      { user, message: "Login realizado com sucesso" },
      { status: 200 }
    );
    response.headers.set("Set-Cookie", `ftoken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`);

    return response
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
  }
}