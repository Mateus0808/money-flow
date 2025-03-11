'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignupForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      setLoading(false)

      if (response.ok) {
        router.push("/login")
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input 
          type="name" 
          name="floating_name" 
          id="floating_name" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required />
        <label 
          htmlFor="floating_name" 
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Nome
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input 
          type="email" 
          name="floating_email" 
          id="floating_email" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <label 
          htmlFor="floating_email" 
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Email
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input 
          type="password" 
          name="floating_password" 
          id="floating_password" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <label 
          htmlFor="floating_password" 
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Senha
        </label>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
        text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-green-500 transition-all duration-300 ease-in-out transform hover:brightness-110"
      >
        { loading ? "Cadastrando..." : "Cadastrar" }
      </button>

      <div className="text-sm text-center">
        <span className="text-gray-600">Já possui uma conta? </span>
        <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
          Entrar
        </Link>
      </div>
    </form>
  );
};
