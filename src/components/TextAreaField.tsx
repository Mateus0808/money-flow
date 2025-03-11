import { TextareaHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  register: UseFormRegisterReturn
  error?: string;
}

export const TextAreaField = ({ label, register, error }: TextAreaFieldProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={register.name} className="block text-sm font-medium text-gray-700 dark:text-textLight">
        {label}
      </label>
      <textarea
        id={register.name}
        {...register}
        className="dark:bg-transparent dark:text-textLight mt-1 block w-full px-3 py-2 border-2 dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}