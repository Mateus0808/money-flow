import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Transaction from "@/models/Transaction";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { title, amount, category, type } = await req.json();

    if (!title || !amount || !category || !type) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const transaction = await Transaction.create({ title, amount, category, type });
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Erro ao criar transação" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = searchParams.get("limit")
    const minLimit = Math.min(parseInt(limitParam || '10', 10), 10);
    const limit = limitParam === "all" ? undefined : minLimit

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const category = searchParams.get("category");
    const type = searchParams.get("type") as "income" | "expense" | null;

    const filter: any = {};

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    // else {
    //   const thirtyDaysAgo = new Date();
    //   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    //   filter.date = { $gte: thirtyDaysAgo };
    // }
    if (category) filter.category = category;
    if (type) filter.type = type;

    const query = Transaction.find(filter).sort({ date: -1 });

    if (limit !== undefined) {
      query.skip((page - 1) * limit).limit(limit);
    }

    const transactions = await query;
    const totalTransactions = await Transaction.countDocuments(filter);

    return NextResponse.json({
      transactions,
      pagination: {
        total: totalTransactions,
        page: limit === undefined ? 1 : page,
        totalPages: limit === undefined ? 1 : Math.ceil(totalTransactions / limit),
        limit: limit === undefined ? 10 : limit
      }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID da transação é obrigatório" },
        { status: 400 }
      );
    }

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return NextResponse.json({ message: "Transação não encontrada" },
        { status: 404 }
      );
    }

    await Transaction.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Transação excluída com sucesso" },
      { status: 200 }
    );
  } catch(error) {
    console.log(error)
    return NextResponse.json({ message: "Erro ao excluir transação" },
      { status: 500 }
    );
  }
}