import { Suspense } from "react";
import LoadingHome from "./loading";

export default async function DashboardLayout({ 
  children 
}: { children: React.ReactNode }
) {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingHome />}>
        <main className="max-w-screen-xl mx-auto w-full">
          { children }
        </main>
      </Suspense>
    </div>
  )
}
