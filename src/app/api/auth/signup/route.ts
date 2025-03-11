import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "E-mail inválido" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "A senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'Usuário já cadastrado' }, { status: 400 });
    }

    const createdUser = await User.create({ name, email, password })

    return NextResponse.json(
      { message: "Usuário cadastrado com sucesso", userId: createdUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
  }
}