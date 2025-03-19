import { SignupForm } from "./SignupForm";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Bem-vindo!
      </h1>
      <p className="text-sm font-medium text-gray-600 text-center mb-8">
        Gerencie suas finanças de forma simples e eficiente.
      </p>
      <SignupForm />
    </div>
  );
};