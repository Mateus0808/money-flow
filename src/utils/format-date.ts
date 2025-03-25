import { parseISO, format, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export const formatDate = (
  date: Date | string | number,
  formatString: string = "dd 'de' MMMM' às ' HH:mm'h'",
) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);

  if (!isValid(parsedDate)) {
    throw new Error('Data inválida');
  }

  return format(parsedDate, formatString, { locale: ptBR });
}