"use client"

import { useEffect } from "react"

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {}, [error])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h1 className="text-2xl font-semibold text-red-600">Ops! Algo deu errado.</h1>
      <p className="text-gray-700 mt-2">
        Ocorreu um erro ao carregar o dashboard. Por favor, tente novamente.
      </p>
      <button
        onClick={reset}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Tentar Novamente
      </button>
    </div>
  )
}
