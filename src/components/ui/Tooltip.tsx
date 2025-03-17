'use client'
import { Goal } from "lucide-react"
import { ReactNode, useState } from "react"

type TooltipProps = {
  content: string
  children: ReactNode
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center gap-2 max-w-[70%]"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Goal size={20} className="text-orange-600"/>
      {children}
      {visible && (
        <div className="w-full absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-sm font-medium text-gray-900 bg-white dark:text-textLight dark:bg-cardDark rounded-lg shadow-lg transition-opacity duration-300">
          {content}
        </div>
      )}
    </div>
  )
}