import Link from "next/link"
import { FormEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { UserInput } from "@/components/ui/UserInput";

import { SignupFormData } from "./page";


interface SignupUIFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<SignupFormData>
  errors: FieldErrors<SignupFormData>
  isLoading: boolean
}

export const SignupUIForm = ({ errors, isLoading, onSubmit, register }: SignupUIFormProps) => {

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
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
        <Button label="Cadastrar" disabled={isLoading} type="submit" isLoading={isLoading} />
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
