import { Suspense } from "react";
import LoadingTable from "./loading";

export default function TransactionLayout({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingTable />}>
      { children }
    </Suspense>
  )
}