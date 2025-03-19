import { GoalsResponse } from "@/types/goal-type";
import { PaginationType } from "@/types/pagination";

interface FetchGoalsProps {
  month: string
  year: string
  priority: string
  pagination: PaginationType
}

export const fetchGoals = async ({ 
  month = "", year = "", priority = "", pagination
}: FetchGoalsProps): Promise<GoalsResponse> => {
  try {
    if (month && !year) throw new Error('Filtros inválidos')

    const url = new URL('/api/goals', window.location.origin);

    url.searchParams.set('page', pagination.page.toString());
    url.searchParams.set('limit', pagination.limit.toString());

    if (priority) url.searchParams.set('priority', priority);
    if (year) {
      const deadlineFilter = month ? `${year}-${month}` : `${year}`;
      url.searchParams.set('deadline', deadlineFilter);
    }

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Erro ao buscar metas');

    const result = await response.json();
    return result
  } catch (err) {
    return {
      goals: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
      },
    };
  }
}