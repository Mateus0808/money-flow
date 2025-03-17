import clsx from "clsx";
import { Filter } from "lucide-react";

interface FilterButtonProps {
  openFilter: boolean
  toggleFiltersPanel: () => void
}

export const FilterButton = ({ openFilter, toggleFiltersPanel }: FilterButtonProps) => {
  return (
    <button
      onClick={toggleFiltersPanel}
      className={clsx(
        "flex gap-2 items-center p-2 rounded-lg transition duration-150",
        "hover:bg-gray-400 hover:bg-opacity-20",
        openFilter && "bg-gray-300 bg-opacity-10"
      )}
    >
      <Filter className={clsx("text-gray-600", openFilter ? "text-blue-600" : "dark:text-textLight")} size={24} />
      <span className={clsx("font-bold text-gray-600", openFilter ? "text-blue-600" : "dark:text-textLight")}>
        Filtros
      </span>
    </button>
  );
}