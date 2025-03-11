import { Suspense } from "react";
import LoadingGoals from "./loading";

export default function LayoutGoal({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingGoals />}>
      { children }
    </Suspense>
  )
}