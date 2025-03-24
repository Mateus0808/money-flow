'use client'

import { SignInPageUI } from "./page-ui";
import { useRouter } from "next/navigation";
import { errorNotify } from "@/libs/notify/notify";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido." }),
  password: z.string().min(8, { message: "A senha contém pelo menos 8 caracteres." })
})

export type LoginFormData = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const router = useRouter()
  const queryClient = useQueryClient();

  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;

    const { message, success } = await login(email, password)
    if (success) {
      queryClient.refetchQueries({ queryKey: ['transactions', 'goals']});
      router.push('/home')
    } else {
      errorNotify(message || "Erro ao fazer login. Tente novamente.")
    }
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Bem-vindo de volta!
      </h1>
      <p className="text-sm font-medium text-gray-600 text-center mb-8">
        Gerencie suas finanças de forma simples e eficiente.
      </p>
      <SignInPageUI
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isLoading={isLoading}
      />
    </div>
  );
};