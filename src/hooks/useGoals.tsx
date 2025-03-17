import { useGoalStore } from "@/stores/useGoalStore";
import { useEffect } from "react";

export function useGoals({ 
  priority = "", month = "", year = ""
}) {
  const { 
    goals, loading, deleteGoal, setPagination, fetchGoals, pagination 
  } = useGoalStore()

  useEffect(() => {
    const fetchData = async () => {
      await fetchGoals({ month, priority, year });
    }
    fetchData()
  }, [pagination.page, priority, month, year]);

  return { goals, loading, deleteGoal, setPagination, pagination }
}
