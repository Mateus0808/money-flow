import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Defina a variável de ambiente MONGODB_URI no .env.local");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
};
