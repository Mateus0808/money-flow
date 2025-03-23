import clsx from "clsx";
import { SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  register?: UseFormRegisterReturn
  options: Array<{ value: string, label: string,  }>
  error?: string
  showDefaultOption?: boolean
  classLabel?: string
}

export const SelectField = ({ 
  label, 
  register, 
  options, 
  error, 
  classLabel = 'block text-sm font-medium text-gray-700 dark:text-textLight', 
  showDefaultOption = true, 
  ...props
}: SelectFieldProps) => {
  return (
    <div className="w-full">
      <label className={clsx(classLabel)}>
        {label}
      </label>
      <select {...register} {...props} className={clsx(
        'mt-1 h-12 block w-full border-2 border-gray-200 rounded-md p-2',
        'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500',
        'text-gray-700 dark:bg-cardDark dark:text-textLight dark:border-gray-700'
      )}>
        {showDefaultOption && <option value="">Selecione</option>}
        {options.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}