'use client'

import { Button } from "@/components/ui/Button";
import { UserInput } from "@/components/ui/UserInput";
import { errorNotify } from "@/libs/notify/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z.object({
  name:z.string().trim()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres." })
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: "O nome deve conter apenas letras." })
    .refine((name) => name.trim().length >= 2, {
      message: "O nome deve ter pelo menos 2 caracteres.",
    }),
  email: z.string().email({ message: "Digite um e-mail válido." }),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
    .regex(/[^a-zA-Z0-9]/, { message: "A senha deve conter pelo menos um caractere especial." }),
})

export type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData: SignupFormData) => {
    const { name, email, password } = formData
    
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/login")
    } else {
      errorNotify(data.message || 'Erro ao realizar cadastro')
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <UserInput 
        type="text" 
        register={register('name')}
        error={errors.name?.message}
        label="Nome"
      />
      <UserInput 
        type="email"
        register={register('email')}
        error={errors.email?.message}
        label="E-mail"
      />
      <UserInput 
        type="password" 
        error={errors.password?.message}
        register={register('password')}
        label="Senha"
      />

      <div className="w-full h-12">
        <Button label="Cadastrar" type="submit" isLoading={isLoading} />
      </div>

      <div className="text-md text-center">
        <span className="text-gray-600">Já possui uma conta? </span>
        <Link href="/login" className="font-semibold text-blue-800 hover:text-primary">
          Entrar
        </Link>
      </div>
    </form>
  );
};
