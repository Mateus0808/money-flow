import { ReactNode } from "react";

interface ChartCardProps {
  title: string
  children: ReactNode
  width: string
}

export const CardContainer = ({ title, children, width }: ChartCardProps) => (
  <div className={`w-full ${width} px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg`}>
    <header className="flex items-center justify-between mb-4">
      <p className="text-primary dark:text-textLight text-lg font-semibold">
        {title}
      </p>
    </header>
    {children}
  </div>
);