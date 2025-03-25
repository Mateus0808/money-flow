import { connectDB } from "@/libs/mongodb";
import Goal from "@/models/Goal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams

    const goal = await Goal.findById(id)
    return NextResponse.json({ goal })
  } catch {
    return NextResponse.json({ message: "Erro ao atualizar meta" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams

    const data = await req.json();
    
    const goal = await Goal.findByIdAndUpdate(id, data)
    return NextResponse.json({ goal })
  } catch {
    return NextResponse.json({ message: "Erro ao atualizar meta" }, { status: 400 });
  }
}