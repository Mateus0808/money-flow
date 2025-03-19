import { Button } from "@/components/ui/Button";
import { UserInput } from "@/components/ui/UserInput";
import Link from "next/link"
import { FormEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginFormData } from "./page";

interface SignInPageUIProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<LoginFormData>
  errors: FieldErrors<LoginFormData>
  isLoading: boolean
}

export const SignInPageUI = ({ 
  onSubmit, register, errors, isLoading
}: SignInPageUIProps) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <UserInput 
        type="email" 
        register={register("email")}
        label="E-mail"
        error={errors.email?.message}
      />
      <UserInput 
        type="password" 
        register={register("password")}
        error={errors.password?.message}
        label="Senha"
      />

      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-6">
            <input 
              id="remember" 
              type="checkbox" 
              value="" 
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" 
            />
          </div>
          <label 
            htmlFor="remember" 
            className="ms-2 text-md font-medium text-gray-900">
            Lembrar de mim
          </label>
        </div>

        <div className="text-md">
          <a href="#" className="font-medium text-blue-800 hover:text-primary">
            Esqueceu sua senha?
          </a>
        </div>

      </div>

      <div className="w-full h-12">
        <Button label="Entrar" type="submit" isLoading={isLoading} />
      </div>

      <div className="text-md text-center">
        <span className="text-gray-600">Não tem uma conta? </span>
        <Link href="/signup" className="font-semibold text-blue-800 hover:text-primary">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
};
