'use client'
import { ReactNode, useEffect, useRef, useState } from "react"

type TooltipProps = {
  content: string
  children: ReactNode
}

export const TruncateTooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const checkTruncation = () => {
    if (textRef.current) {
      const { scrollWidth, clientWidth } = textRef.current;
      setIsTruncated(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [content]);

  return (
    <div
      className="flex items-center gap-2 max-w-[200px] w-full"
      onMouseEnter={() => isTruncated && setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div ref={textRef} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
        {children}
      </div>
      {visible && (
        <div className="absolute -top-5 left-2 bg-gray-300 text-gray-900 text-sm px-3 py-1 rounded shadow-lg whitespace-normal w-auto max-w-xs">
          {content}
        </div>
      )}
    </div>
  )
}