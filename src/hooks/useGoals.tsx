import { fetchGoals } from "@/services/goal.service";
import { useGoalStore } from "@/stores/useGoalStore";
import { PaginationType } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// export function useGoals({ 
//   priority = "", month = "", year = ""
// }) {
//   const { 
//     goals, loading, deleteGoal, setPagination, fetchGoals, pagination 
//   } = useGoalStore()

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchGoals({ month, priority, year });
//     }
//     fetchData()
//   }, [pagination.page, priority, month, year]);

//   return { goals, loading, deleteGoal, setPagination, pagination }
// }

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
    staleTime: 1000 * 60 * 5,
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