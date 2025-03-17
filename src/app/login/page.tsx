'use client'
import Image from "next/image"
import { SignInPageUI } from "./page-ui";
import { useState } from "react";
import { useAuthStore } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(email, password)
    router.push('/home')
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-cover bg-center flex items-center justify-center bg-green-400">
        <Image 
          alt="Login Image"
          src="/financial.svg"
          width={400}
          height={400}
          priority
          style={{ width: "400px", height: "400px" }}
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Bem-vindo de volta!
          </h1>
          <p className="text-sm text-gray-600 text-center mb-8">
            Gerencie suas finanças de forma simples e eficiente.
          </p>
          <SignInPageUI
            onSubmit={handleSubmit}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        </div>
      </div>
    </div>
  );
};