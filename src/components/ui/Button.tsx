import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export const Button = ({ label, ...rest }: ButtonProps) => {
  return (
    <button 
      {...rest}
      className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
      text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 
      focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:brightness-110"
    >
      {label}
    </button>
  )
}