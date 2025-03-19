import { cookies } from "next/headers";

export const getUserIdFromCookies = async (): Promise<string> => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("moneyId")?.value;

  if (!userId) throw new Error('Usuário não encontrado')
    
  return userId;
};
