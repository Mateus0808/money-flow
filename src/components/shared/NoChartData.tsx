interface NoChartDataProps {
  label: string
}

export const NoChartData = ({ label }: NoChartDataProps) => {
  return (
    <div className="flex items-center justify-center h-full text-gray-600">
      {label}
    </div>
  )
}