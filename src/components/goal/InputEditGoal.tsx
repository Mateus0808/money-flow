import { ReactNode } from "react"

interface InputEditGoal {
  value: string
  onChange: (e: any) => void
  type?: string
  name: string
  children: ReactNode
  label: string
}

export const InputEditGoal = ({ children, name, value, label, type="text", onChange }: InputEditGoal) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      {children}
      <input 
        type={type} 
        name={name}
        className="block py-2.5 px-6 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required 
      />
    </div>
  )
}