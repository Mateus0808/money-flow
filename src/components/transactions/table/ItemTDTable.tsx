import { ReactNode } from "react"

interface ItemTDTableProps {
  children: ReactNode
}

export const ItemTDTable = ({ children }: ItemTDTableProps) => {
  return (
    <td className="px-2 py-3 md:px-6 md:py-3 text-gray-900 dark:text-textLight">
      {children}
    </td>
  )
}
