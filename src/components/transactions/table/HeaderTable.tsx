import { ItemHeaderTable } from "./ItemHeaderTable"

interface HeaderTable41Props {
  showActions: boolean
}

export const HeaderTable = ({ showActions }: HeaderTable41Props) => {
  return (
    <tr className="border-b border-gray-300 dark:border-gray-500">
      <ItemHeaderTable label="Título" />
      <ItemHeaderTable label="Valor" />
      <ItemHeaderTable label="Categoria" />
      <ItemHeaderTable label="Data" />
      {showActions && <ItemHeaderTable label="Menu" />}
    </tr>
  )
}