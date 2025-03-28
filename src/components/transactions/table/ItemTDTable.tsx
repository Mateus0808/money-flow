import { ReactNode } from "react"

interface ItemTDTableProps {
  children: ReactNode
}

export const ItemTDTable = ({ children }: ItemTDTableProps) => {
  return (
    <td scope="row" className="max-w-[140px] px-2 py-3 text-nowrap md:px-6 text-gray-900 dark:text-textLight">
      {children}
    </td>
  )
}
