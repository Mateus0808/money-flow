import { useQuery } from '@tanstack/react-query'
import { fetchTransactions } from '@/services/transaction.service';

interface UseTransactionType {
  page?: number
  limit?: string
  filters?: any
}

export const useTransactions = ({ page, limit, filters }: UseTransactionType) => {
  return useQuery({
    queryKey: ['transactions', page, limit, filters],
    queryFn: () => fetchTransactions(page, limit, filters),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    placeholderData: (previousData) => previousData ?? {
      transactions: [],
      pagination: {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1
      }
    }
  })
}
