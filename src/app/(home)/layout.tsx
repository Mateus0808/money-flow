import Sidebar from "@/components/sidebar";

export default async function HomeLayout({ 
  children 
}: { children: React.ReactNode }
) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <main className="max-w-screen-xl mx-auto w-full flex-1 py-8 px-8">
        { children }
      </main>
    </div>
  )
}
