import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckBoxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register: UseFormRegisterReturn
}

export const CheckBoxField = ({ label, register, error }: CheckBoxFieldProps) => {
  return (
    <label className="flex items-center gap-1">
      <input
        {...register}
        type="checkbox"
        id={register.name}
        className="w-4 h-4 border border-gray-300 rounded-sm bg-white 
          checked:bg-blue-600 checked:border-transparent 
          focus:ring-2 focus:ring-blue-300 appearance-none cursor-pointer 
          relative before:content-['✔'] before:absolute before:left-1/2 before:top-1/2 
          before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 
          checked:before:scale-100 checked:before:text-white"
        aria-invalid={!!error}
      />
      <span className="text-sm text-gray-700 dark:text-textLight">{label}</span>
    </label>
  )
}