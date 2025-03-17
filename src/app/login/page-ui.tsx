'use client'
import Link from "next/link"
import { FormEvent } from "react";

interface SignInPageUIProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

export const SignInPageUI = ({ 
  onSubmit, password, setPassword, setEmail, email
}: SignInPageUIProps) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input 
          type="email" 
          name="floating_email" 
          id="floating_email" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <label 
          htmlFor="floating_email" 
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input 
          type="password" 
          name="floating_password" 
          id="floating_password" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <label 
          htmlFor="floating_password" 
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Password
        </label>
      </div>


      <div className="flex justify-between">
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input 
              id="remember" 
              type="checkbox" 
              value="" 
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" 
            />
          </div>
          <label 
            htmlFor="remember" 
            className="ms-2 text-sm font-medium text-gray-900">
            Lembrar de mim
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-green-600 hover:text-green-500">
            Esqueceu sua senha?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
        text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-green-500 transition-all duration-300 ease-in-out transform hover:brightness-110"
      >
        Entrar
      </button>

      <div className="text-sm text-center">
        <span className="text-gray-600">Não tem uma conta? </span>
        <Link href="/signup" className="font-medium text-green-600 hover:text-green-500">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
};
