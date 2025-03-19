import clsx from "clsx";
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
        className={clsx(
          'rounded-md shadow-sm mt-1 block w-full px-3 py-2 border-2 border-gray-300', 
          'text-gray-700 dark:border-gray-700 dark:text-textLight dark:bg-transparent',
          'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500'
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}