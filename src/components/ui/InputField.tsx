import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn
}

export const InputField = ({ label, register, error, ...props }: InputFieldProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-textLight">{label}</label>
      <input 
        {...register} 
        {...props} 
        className={clsx('mt-1 text-gray-700 dark:text-textLight dark:bg-transparent block w-full border-2',
          'dark:border-gray-700 border-gray-200 rounded-md p-2 focus:outline-none', 
          'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500'
        )} 
      />
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
}