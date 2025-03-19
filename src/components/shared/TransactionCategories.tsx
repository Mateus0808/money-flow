const transactionCategories = {
  receitas: [
    "Salário",
    "Freelance",
    "Investimentos",
    "Juros e Rendimentos",
    "Poupança",
    "Venda de Itens",
    "Outras Receitas"
  ],
  despesas: {
    Moradia: ["Aluguel", "Condomínio", "Energia Elétrica", "Água", "Internet"],
    Transporte: ["Combustível", "Transporte Público", "Manutenção do Veículo"],
    Alimentação: ["Supermercado", "Restaurantes", "Delivery"],
    Saúde: ["Consultas", "Medicamentos", "Plano de Saúde"],
    Lazer: ["Viagens", "Cinema", "Assinaturas"],
    Educação: ["Cursos", "Faculdade", "Livros"],
    "Presentes e Doações": ["Presentes", "Doações"],
    Tecnologia: ["Celulares", "Softwares", "Computadores"],
    Finanças: ["Cartão de Crédito", "Empréstimos", "Taxas Bancárias"],
    Outros: ["Diversos"]
  }
};

interface TransactionCategoriesProps {
  category: string
  setCategory: (value: string) => void
  disabled?: boolean
}

export const TransactionCategories = ({ category, setCategory, disabled }: TransactionCategoriesProps) => {
  return (
    <select
      className="w-full dark:text-textLight dark:bg-cardDark placeholder:text-white h-12 border-2 dark:border-gray-700 border-gray-300 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      disabled={disabled}
    >
      <option value="">...</option>
      <optgroup label="Receitas">
        {transactionCategories.receitas.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </optgroup>

      {Object.entries(transactionCategories.despesas).map(([group, items]) => (
        <optgroup key={group} label={group}>
          {items.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}