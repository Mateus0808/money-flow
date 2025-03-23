export const getAllGoalCategories = () => {
  const categories = [
    { value: "economy", label: "Economia" },
    { value: "health", label: "Saúde" },
    { value: "investments", label: "Investimentos" },
    { value: "education", label: "Educação" },
    { value: "trip", label: "Viagem" },
    { value: "car", label: "Carro" },
    { value: "house", label: "Casa" },
    { value: "business", label: "Empreendimento" },
    { value: "retirement", label: "Aposentadoria" },
    { value: "technology", label: "Tecnologia" },
    { value: "marriage", label: "Casamento" },
    { value: "donation_gifts", label: "Doação/Presentes" },
    { value: "emergency_fund", label: "Fundo de Emergência" },
    { value: "education_children", label: "Educação dos Filhos" },
    { value: "home_renovation", label: "Reforma da Casa" },
    { value: "sports", label: "Esportes e Lazer" },
    { value: "hobbies", label: "Hobbies" },
    { value: "insurance", label: "Seguros" },
    { value: "self_development", label: "Desenvolvimento Pessoal" },
    { value: "other", label: "Outros" }
  ];

  return categories;
}