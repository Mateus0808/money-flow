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
  // fetchGoals: (params?: { month?: string; year?: string; priority?: string }) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  createGoal: (goal: IGoalType) => Promise<void>
}

export const useGoalStore = create<GoalStore>((set, get) => ({
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

  // fetchGoals: async ({ month, year, priority } = {}) => {
  //   set({ loading: true });
  //   try {
  //     if (month && !year) {
  //       set({ loading: false });
  //       return;
  //     }

  //     const { pagination } = get();
  //     const url = new URL('/api/goals', window.location.origin);

  //     url.searchParams.set('page', pagination.page.toString());
  //     url.searchParams.set('limit', pagination.limit.toString());

  //     if (priority) url.searchParams.set('priority', priority);
  //     if (year) {
  //       const deadlineFilter = month ? `${year}-${month}` : `${year}`;
  //       url.searchParams.set('deadline', deadlineFilter);
  //     }

  //     const response = await fetch(url.toString());
  //     if (!response.ok) throw new Error('Erro ao buscar metas');

  //     const result = await response.json() as GoalsResponse;
  //     set({ goals: result.goals, pagination: result.pagination });
  //   } catch (err) {
  //     console.error("Erro ao buscar metas:", err);
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
}))

const updatePagination = (pagination: PaginationType) => ({
  ...pagination,
  page: 1,
  totalPages: Math.ceil((pagination.totalPages * pagination.limit + 1) / pagination.limit),
});