export default function LoadingDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-6 py-8 rounded bg-white dark:bg-cardDark"></div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full xl:w-2/3 px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="bg-white dark:bg-cardDark p-4 rounded-lg shadow-md">
            <div className="w-full h-4 rounded-lg bg-gray-900"></div>
            <div className="w-full h-[342px] mt-4 rounded-lg bg-gray-900"></div>
          </div>
        </div>
          
        <div className="w-full xl:w-1/3 px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="bg-white dark:bg-cardDark p-4 rounded-lg shadow-md">
            <div className="w-full h-4 rounded-lg bg-gray-900"></div>
            <div className="w-full h-[342px] mt-4 rounded-lg bg-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  )
}