import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ItemHeaderTable } from "./ItemHeaderTable"

interface HeaderTable41Props {
  showActions: boolean
}

export const HeaderTable = ({ showActions }: HeaderTable41Props) => {
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