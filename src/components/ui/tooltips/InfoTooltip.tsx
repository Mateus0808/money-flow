'use client'
import { ReactNode, useState } from "react"

type TooltipProps = {
  content: string
  children: ReactNode
}

export const InfoTooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="flex items-center gap-2 max-w-[300px] w-full"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      
      {children}
      {visible && (
        <div className="w-auto max-w-md absolute -top-12 left-2 text-gray-700 bg-gray-200 text-sm px-3 py-1 rounded shadow-lg whitespace-normal">
          {content}
        </div>
      )}
    </div>
  )
}