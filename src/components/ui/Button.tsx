import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"
import { LoadingButton } from "../shared/LoadingButton"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isLoading: boolean
}

export const Button = ({ label, isLoading, ...rest }: ButtonProps) => {
  return (
    <button 
      {...rest}
      className={clsx('flex w-full h-full justify-center items-center py-2 px-4 border border-transparent',
        'text-md font-medium text-white bg-blue-800 hover:bg-primary focus:outline-none',
        'focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300',
        'rounded-md shadow-sm transition-all duration-300 ease-in-out transform'
      )}
    >
      {isLoading ? <LoadingButton /> : label}
    </button>
  )
}