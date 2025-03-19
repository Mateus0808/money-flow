export const setEndOfDay = (date: Date): Date => {
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);
  
  return endOfDay;
}