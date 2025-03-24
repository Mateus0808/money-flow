import { reverseCategoryMapping } from "@/utils/reverse-category-mapping";
import { SelectHTMLAttributes } from "react";

export const categoryMapping: { [key: string]: string } = {
  Salário: "salary",
  Freelance: "freelance",
  Investimentos: "investments",
  "Juros e Rendimentos": "interest_and_earnings",
  Poupança: "savings",
  "Venda de Itens": "item_sales",
  "Outras Receitas": "other_income",
  Aluguel: "rent",
  Condomínio: "condominium",
  "Energia Elétrica": "electricity",
  Água: "water",
  Internet: "internet",
  "Transporte Público": "public_transport",
  Supermercado: "groceries",
  Restaurantes: "restaurants",
  Delivery: "delivery",
  Consultas: "medical_appointments",
  Medicamentos: "medications",
  "Plano de Saúde": "health_insurance",
  Viagens: "travel",
  Cinema: "cinema",
  Assinaturas: "subscriptions",
  Cursos: "courses",
  Faculdade: "college",
  Livros: "books",
  Presentes: "gifts",
  Doações: "donations",
  Celulares: "phones",
  Softwares: "software",
  Computadores: "computers",
  "Cartão de Crédito": "credit_card",
  Empréstimos: "loans",
  "Taxas Bancárias": "bank_fees",
  Diversos: "miscellaneous",
  Manutenção: "maintenance",
  Seguro: "insurance",
  IPVA: "vehicle_tax",
  Habilitação: "driving_license",
  Combustível: "fuel",
  Táxi: "taxi",
  "Aplicativos de Transporte": "ride_sharing"
};


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
    Veículos: ["Combustível", "Manutenção", "Seguro", "IPVA", "Habilitação"],
    Transporte: ["Transporte Público", "Táxi", "Aplicativos de Transporte"],
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

interface TransactionCategoriesProps extends SelectHTMLAttributes<HTMLSelectElement> {
  isCreateTransaction?: boolean
}


export const TransactionCategories = ({ 
  value, isCreateTransaction = false, ...props 
}: TransactionCategoriesProps) => {
  return (
    <select
      className="w-full text-gray-700 dark:text-textLight dark:bg-cardDark placeholder:text-white h-12 border-2 dark:border-gray-700 border-gray-300 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
      value={value}
    >
      <option value="">Selecione</option>
      <optgroup label="Receitas">
        {transactionCategories.receitas.map((category, index) => (
          <option 
            key={index} 
            value={isCreateTransaction 
              ? JSON.stringify({ group: "income", category: categoryMapping[category] })
              : categoryMapping[category]
            }
          >
            {category}
          </option>
        ))}
      </optgroup>

      {Object.entries(transactionCategories.despesas).map(([group, items]) => (
        <optgroup key={group} label={group}>
          {items.map((category, index) => (
            <option 
              key={index} 
              value={isCreateTransaction 
                ? JSON.stringify({ group: group.toLowerCase(), category: categoryMapping[category] })
                : categoryMapping[category]
              }>
              {category}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}