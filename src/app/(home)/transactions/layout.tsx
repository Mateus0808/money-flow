import { Suspense } from "react";
import LoadingTable from "./loading";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function TransactionLayout({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingTable />}>
      <header className="w-full mb-4">
        <Breadcrumb />
      </header>
      { children }
    </Suspense>
  )
}