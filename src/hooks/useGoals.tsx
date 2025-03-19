import { fetchGoals } from "@/services/goal.service";
import { PaginationType } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface UseGoalsProps {
  priority?: string;
  month?: string;
  year?: string;
  pagination: PaginationType;
}

export const useGoals = ({ 
  priority = "", month = "", year = "", pagination }: UseGoalsProps
) => {
  return useQuery({
    queryKey: ['goals', month, priority, year, pagination.page, pagination.limit],
    queryFn: () => fetchGoals({ month, priority, year, pagination }),
    staleTime: 1000 * 60 * 1,
    retry: 3,
    placeholderData: (previousData) => previousData ?? {
      goals: [],
      pagination: {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1
      }
    }
  })
}