import { Suspense } from "react";
import LoadingEditGoal from "./loading";

export default function LayoutEditGoal({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingEditGoal />}>
      { children }
    </Suspense>
  )
}