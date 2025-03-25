import { create } from "zustand";
import { GoalTypeResponse, IGoalType } from "@/types/goal-type";
import { PaginationType } from "@/types/pagination";


interface GoalStore {
  goals: GoalTypeResponse[]
  setGoals: (goals: GoalTypeResponse[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  pagination: PaginationType;
  setPagination: (pagination: PaginationType) => void;
  deleteGoal: (id: string) => Promise<void>;
  createGoal: (goal: IGoalType) => Promise<void>
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  setGoals: (goals) => set({ goals }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  pagination: { page: 1, totalPages: 1, limit: 10, total: 0 },
  setPagination: (pagination) => set({ pagination }),

  deleteGoal: async (id: string) => {
    set({ loading: true })
    const goal = await fetch(`/api/goals?id=${id}`, {
      method: "DELETE"
    })
    if (!goal.ok) throw new Error("Erro ao deletar a meta financeira");

    set((state) => ({
      goals: state.goals.filter((goal) => goal._id !== id),
      loading: false,
    }));
  },

  createGoal: async (goalRequest: IGoalType) => {
    set({ loading: true });

    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goalRequest),
    });
  
    if (!res.ok) throw new Error("Erro ao criar objetivo");
    
    const goal = await res.json();

    set((state) => {
      const newGoals = [goal, ...state.goals];
      return {
        goals: newGoals.slice(0, state.pagination.limit),
        pagination: updatePagination(state.pagination),
        loading: false
      };
    });
  }
}))

const updatePagination = (pagination: PaginationType) => ({
  ...pagination,
  page: 1,
  totalPages: Math.ceil((pagination.totalPages * pagination.limit + 1) / pagination.limit),
});