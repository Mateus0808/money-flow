import clsx from "clsx"
import { InputHTMLAttributes } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface UserInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  register?: UseFormRegisterReturn
}

export const UserInput = ({ label, error, register, name, ...props }: UserInputProps) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input 
        {...register}
        {...props}
        className={clsx(
          "block py-3 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2",
          "border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        )}
        placeholder=" " 
        required />
      <label 
        htmlFor={name}
        className={clsx(
          "peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75",
          "top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600",
          "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        )}
      >
        {label}
      </label>
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  )
}