export const goalMapping: { [key: string]: string } = {
  Mensal: "monthly",
  Semanal: "weekly",
  Única: 'one-time'
}

export const reverseGoalMapping: { [key: string]: string } = Object.fromEntries(
  Object.entries(goalMapping).map(([key, value]) => [value, key])
);