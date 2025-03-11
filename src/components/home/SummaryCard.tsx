import Image from "next/image"

interface SummaryCardProps {
  label: string
  imagePath: string
  value: number
}

export const SummaryCard = ({ label, imagePath, value }: SummaryCardProps) => {
  return (
    <div className="px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg">
      <header className="flex items-center justify-between">
        <p className={`${label === 'Entradas' ? 'text-secondary' : 'text-red-600'} font-semibold`}>
          {label}
        </p>
        <Image 
          src={imagePath}
          alt={label}
          width={40}
          height={40}
        />
      </header>
      <strong className={`${label === 'Entradas' ? 'text-secondary' : 'text-red-600'} block text-[1.75rem] font-semibold leading-10`}>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value)}
      </strong>
    </div>
  )
}