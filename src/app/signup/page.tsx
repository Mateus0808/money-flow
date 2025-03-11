import Image from "next/image"
import { SignupForm } from "./SignupForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-cover bg-center flex justify-center bg-green-400">
        <Image 
          alt="Login Image"
          src="/financial.svg"
          width={400}
          height={400}
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Bem-vindo!
          </h1>
          <p className="text-sm text-gray-600 text-center mb-8">
            Gerencie suas finanças de forma simples e eficiente.
          </p>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};