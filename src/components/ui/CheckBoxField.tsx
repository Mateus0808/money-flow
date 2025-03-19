import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckBoxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register: UseFormRegisterReturn
}

export const CheckBoxField = ({ label, register, error }: CheckBoxFieldProps) => {
  return (
    <label className="flex items-center">
      <input
        {...register}
        type="checkbox"
        id={register.name}
        className="mr-2 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500"
        aria-invalid={!!error}
      />
      <span className="text-sm text-gray-700 dark:text-textLight">{label}</span>
    </label>
  )
}