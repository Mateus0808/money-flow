'use client'
import { useEffect, useState } from "react"

export default function LoadingHome() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <>
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 gap-6${isClient ? "animate-pulse" : ""}`}>
        <div className="px-6 py-8 flex flex-col gap-4 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg h-4 w-1/3"></div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg h-10 w-10"></div>
          </div>
          <div className="bg-gray-100 h-6 rounded-lg dark:bg-gray-900"></div>
        </div>

        <div className="px-6 py-8 flex flex-col gap-4 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg h-4 w-1/3"></div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg h-10 w-10"></div>
          </div>
          <div className="bg-gray-100 h-6 rounded-lg dark:bg-gray-900"></div>
        </div>

        <div className="px-6 py-8 flex flex-col gap-4 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg h-4 w-1/3"></div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg h-10 w-10"></div>
          </div>
          <div className="bg-gray-100 h-6 rounded-lg dark:bg-gray-900"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        <div className="w-full xl:w-2/3 px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="bg-white dark:bg-cardDark p-4 rounded-lg shadow-md">
            <div className="w-full h-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
            <div className="w-full h-[342px] mt-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
          
        <div className="w-full xl:w-1/3 px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="bg-white dark:bg-cardDark p-4 rounded-lg shadow-md">
            <div className="w-full h-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
            <div className="w-full h-[342px] mt-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
      </div>
    </>
  )
}