import { PaginationType } from "@/types/pagination";

interface PaginationProps {
  pagination: PaginationType
  setPagination: (pagination: PaginationType) => void
}

export const PaginationControls = ({ pagination, setPagination }: PaginationProps) => {
  const handlePrevPage = async () => {
    const newPage = Math.max(pagination.page - 1, 1);
    setPagination({ ...pagination, page: newPage });
  };

  const handleNextPage = async () => {
    const newPage = Math.min(pagination.page + 1, pagination.totalPages);
    setPagination({ ...pagination, page: newPage })
  };

  return (
    <div className="flex justify-between items-center mt-2">
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        onClick={handlePrevPage}
        disabled={pagination.page === 1}
      >
        Anterior
      </button>

      <span className="text-gray-700">
        Página {pagination.page} de {pagination.totalPages}
      </span>

      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        onClick={handleNextPage}
        disabled={pagination.page >= pagination.totalPages}
      >
        Próxima
      </button>
    </div>
  )
}
