'use client'

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { errorNotify, successNotify } from "@/libs/notify/notify";
import { SignupUIForm } from "./SignupForm";


const signupSchema = z.object({
  name:z.string().trim()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .max(18, { message: "O nome deve ter no máximo 18 caracteres." })
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: "O nome deve conter apenas letras." })
    .refine((name) => name.trim().length >= 2, {
      message: "O nome deve ter pelo menos 2 caracteres.",
    }).refine((name) => name.trim().length <= 18, {
      message: "O nome deve ter no máximo 18 caracteres. Entende?"
    }),
  email: z.string().email({ message: "Digite um e-mail válido." }),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
    .regex(/[^a-zA-Z0-9]/, { message: "A senha deve conter pelo menos um caractere especial." }),
})

export type SignupFormData = z.infer<typeof signupSchema>;


export default function SignUpPage() {
  const router = useRouter();
  const { signup, loading } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData: SignupFormData) => {
    const { name, email, password } = formData
    
    const { message, success } = await signup({ name, email, password })

    if (success) {
      successNotify(message || 'Cadastro realizado com sucesso!')
      router.push("/login")
    } else {
      errorNotify(message || 'Erro ao realizar cadastro')
      return
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Bem-vindo!
      </h1>
      <p className="text-sm font-medium text-gray-600 text-center mb-8">
        Gerencie suas finanças de forma simples e eficiente.
      </p>

      <SignupUIForm
        errors={errors}
        isLoading={loading || isLoading}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
      />
    </div>
  );
};