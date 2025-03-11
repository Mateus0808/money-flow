type ItemHeaderTableProps = {
  label: string
}

export const ItemHeaderTable = ({ label }: ItemHeaderTableProps) => {
  return (
    <th className="border-r-2 border-spacing-y-8 border-gray-200 dark:border-gray-500 px-2 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-500 uppercase tracking-wider last-of-type:border-r-0">
      {label}
    </th>
  )
}