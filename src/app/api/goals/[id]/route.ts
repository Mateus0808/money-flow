import { connectDB } from "@/libs/mongodb";
import Goal from "@/models/Goal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    const id = context.params.id

    const goal = await Goal.findById(id)
    return NextResponse.json({ goal })
  } catch (error) {
    console.log(error)
  }
}