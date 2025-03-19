import { IGoalType } from "@/types/goal-type";
import { connectDB } from "@/libs/mongodb";
import Goal from "@/models/Goal";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "@/utils/get-user-id-from-cookies";

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const userId = await getUserIdFromCookies()

    const goalData = await req.json() as IGoalType;

    const requiredFields: (keyof IGoalType)[] = [
      "goalName", "initialAmount", "targetAmount", "goalType",
      "priority", "deadline", "frequency"
    ];

    if (!userId) {
      return NextResponse.json(
        { message: 'Os seguintes campos são obrigatórios: userId' },
        { status: 400 }
      );
    }

    const missingFields = requiredFields.filter(field => !goalData[field]);

    if (missingFields.length) {
      return NextResponse.json(
        { message: `Os seguintes campos são obrigatórios: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const goal = await Goal.create({ userId, ...goalData });

    return NextResponse.json(goal, { status: 201 });
  } catch (error) {
    console.log("Erro ao criar meta:", error)
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getUserIdFromCookies()

    const url = new URL(req.url);

    const priority = url.searchParams.get('priority');
    const deadline = url.searchParams.get('deadline');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '8', 10), 8);
    const skip = (page - 1) * limit;

    const filter: any = { userId };

    if (priority) filter.priority = priority;
    if (deadline) {
      const [year, month] = deadline.split('-');
      if (year && month) {
        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth() + 1); // Próximo mês
        endDate.setHours(endDate.getHours() + 23);
        endDate.setMinutes(endDate.getMinutes() + 59);
        endDate.setSeconds(endDate.getSeconds() + 59);
        endDate.setMilliseconds(endDate.getMilliseconds() + 999);

        filter.deadline = {
          $gte: startDate,
          $lt: endDate,
        };
      } else {
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);

        filter.deadline = {
          $gte: startDate,
          $lt: endDate,
        };
      }
    }
    
    const goals = await Goal.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await Goal.countDocuments(filter);

    return NextResponse.json({
      goals,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: "ID da meta é obrigatório" },
        { status: 400 }
      );
    }
    
    const transaction = await Goal.findById(id);
    if (!transaction) {
      return NextResponse.json({ message: "Meta não encontrada" },
        { status: 404 }
      );
    }
    
    await Goal.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Meta excluída com sucesso" },
      { status: 200 }
    );
    } catch(error) {
      console.log(error)
      return NextResponse.json({ message: "Erro ao excluir meta" },
        { status: 500 }
      );
    }
}