import { cookies } from "next/headers";

export const getUserIdFromCookies = async (): Promise<string> => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("moneyId")?.value;

  return userId || "";
};
