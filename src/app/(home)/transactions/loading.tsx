export default function LoadingTable () {
  return (
    <div className="overflow-x-auto animate-pulse">
      <div className="min-w-full">
        <div className='grid grid-cols-4 gap-4'>
          <div className='h-8 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-8 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-8 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-8 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
          <div className='h-6 rounded-lg bg-gray-100 dark:bg-gray-900 w-full'></div>
        </div>
      </div>
    </div>
  );
};