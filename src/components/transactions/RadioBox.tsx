import clsx from "clsx"
import Image from "next/image"
import { darken, transparentize } from 'polished'
import { ButtonHTMLAttributes } from "react"

interface RadioBoxPros extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean
  activeColor: 'green' | 'red'
  title: string
  imagePath: string
}

export const RadioBox = ({ activeColor, imagePath, title, isActive, ...rest }: RadioBoxPros) => {
  return (
    <button
      type="button"
      className={clsx(
        'h-12 border-[1px] border-solid flex items-center justify-center gap-4',
        'transition-colors duration-200 rounded-lg',
        isActive ? "opacity-100" : "opacity-50"
      )}
      style={{
        backgroundColor: isActive ? transparentize(0.6, activeColor) : "transparent",
        borderColor: darken(0.1, "#d7d7d7"),
      }}
      aria-pressed={isActive}
      {...rest}
    >
      <Image alt="Deposit" src={imagePath} height={20} width={20} />
      <span className="text-gray-700 dark:text-textLight">{title}</span>
    </button>
  )
}