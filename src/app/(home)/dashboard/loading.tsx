export default function LoadingDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="px-6 h-5 rounded-lg bg-white dark:bg-cardDark w-40"></div>
        <div className="px-4 h-[72px] w-full rounded-lg bg-white dark:bg-cardDark flex items-center justify-between">
          <div className="w-32 h-8 bg-gray-100 dark:bg-gray-900 rounded-lg"></div>
          <div className="w-32 h-8 bg-gray-100 dark:bg-gray-900 rounded-lg"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full xl:w-2/3 px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="bg-white dark:bg-cardDark p-4 rounded-lg shadow-md">
            <div className="w-full h-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
            <div className="w-full h-[342px] mt-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
          
        <div className="w-full xl:w-1/3 px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="bg-white dark:bg-cardDark p-4 rounded-lg shadow-md">
            <div className="w-full h-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
            <div className="w-full h-[342px] mt-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full xl:w-2/3 px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="bg-white dark:bg-cardDark p-4 rounded-lg shadow-md">
            <div className="w-full h-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
            <div className="w-full h-[342px] mt-4 rounded-lg dark:bg-gray-900"></div>
          </div>
        </div>
          
        <div className="w-full xl:w-1/3 px-6 py-8 rounded bg-white dark:bg-cardDark shadow-lg">
          <div className="bg-white dark:bg-cardDark p-4 rounded-lg shadow-md">
            <div className="w-full h-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
            <div className="w-full h-[342px] mt-4 rounded-lg bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  )
}