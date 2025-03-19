import { EnumGoalPriority } from "@/types/goal-type";

interface FiltersGoalProps {
  priority: string
  setPriority: (e: string) => void
  month: string
  setMonth: (e: string) => void
  year: string
  setYear: (e: string) => void
}


export const FiltersGoal = ({ 
  priority, setPriority, month, setMonth, setYear, year
}: FiltersGoalProps) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-200"
        >
          <option value="">Prioridades</option>
          <option value={EnumGoalPriority.LOW}>Baixa</option>
          <option value={EnumGoalPriority.MEDIUM}>Média</option>
          <option value={EnumGoalPriority.HIGH}>Alta</option>
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-200"
        >
          <option value="">Meses</option>
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-200"
        >
          <option value="">Anos</option>
          {Array.from({ length: 10 }, (_, i) => {
            const yearOption = 2025 + i;
            return (
              <option key={yearOption} value={yearOption.toString()}>
                {yearOption}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  )
}