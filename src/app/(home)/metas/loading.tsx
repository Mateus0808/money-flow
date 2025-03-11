export default function LoadingGoals() {
  return (
    <div className="overflow-x-auto animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-4 shadow-lg p-6 bg-white rounded-lg">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Barra de progresso */}
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div className="bg-gray-300 h-4 rounded-full" style={{ width: "50%" }}></div>
            </div>

            {/* Informações de objetivo e frequência */}
            <div className="flex justify-between items-center text-sm">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Informações de montante e prazo */}
            <div className="flex justify-between items-center text-sm">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Botões de ação */}
            <div className="flex justify-end items-center gap-3">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}