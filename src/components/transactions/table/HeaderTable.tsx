import { useMediaQuery } from "@/hooks/useMediaQuery";

interface HeaderTableProps {
  showActions: boolean
}

export const HeaderTable = ({ showActions }: HeaderTableProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <tr className="border-b border-gray-300 dark:border-gray-500">
      <ItemHeaderTable label="Título" />
      <ItemHeaderTable label="Valor" />
      {!isMobile && <ItemHeaderTable label="Categoria" />}
      <ItemHeaderTable label="Data" />
      {showActions && <ItemHeaderTable label="Menu" />}
    </tr>
  )
}

export const ItemHeaderTable = ({ label }: { label: string }) => {
  return (
    <th scope="col" className="border-r-2 border-spacing-y-8 border-gray-200 dark:border-gray-500 px-2 py-3 md:px-6 text-left text-xs font-medium text-gray-900 dark:text-gray-500 uppercase tracking-wider last-of-type:border-r-0">
      {label}
    </th>
  )
}
