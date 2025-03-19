import { Suspense } from "react";
import LoadingGoals from "./loading";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function LayoutGoal({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingGoals />}>
      <header className="w-full mb-4">
        <Breadcrumb />
      </header>
      { children }
    </Suspense>
  )
}