import { ChangeEvent } from "react"

interface DateRangeFilterProps {
  label: string
  name: string
  date: string
  handleDateRange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const DateRangeFilter = ({ name, date, label, handleDateRange }: DateRangeFilterProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm w-full dark:text-textLight flex items-start">{label}</label>
      <input
        type="date"
        name={name}
        value={date}
        onChange={handleDateRange}
        className="w-full border-2 border-gray-300 h-12 dark:border-gray-500 rounded-lg p-2 dark:text-textLight dark:bg-transparent"
      />
    </div>
  )
}