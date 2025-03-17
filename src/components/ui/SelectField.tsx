import { UseFormRegisterReturn } from "react-hook-form";

type SelectFieldProps = {
  label: string;
  register: UseFormRegisterReturn
  options: string[]
  error?: string
}

export const SelectField = ({ 
  label, register, options, error 
}: SelectFieldProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-textLight">{label}</label>
      <select {...register} className="dark:bg-transparent dark:text-textLight mt-1 h-[2.63rem] block w-full border-2 dark:border-gray-700 border-gray-200 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option value="">Selecione</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}