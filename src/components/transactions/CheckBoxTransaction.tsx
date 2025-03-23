import { InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckBoxTransactionProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register: UseFormRegisterReturn
}
export const CheckBoxTransaction = ({ label, register }: CheckBoxTransactionProps) => {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <div
        className={`relative w-12 h-4 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
          checked ? "bg-blue-500" : "bg-gray-300"
        }`}
        onClick={toggleCheck}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-6" : "-translate-x-1"
          }`}
        ></div>
      </div>
      <input type="hidden" value={checked ? "true" : "false"} {...register} />
    </div>
  )
}