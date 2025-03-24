"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const isUUID = (segment: string) =>
    /^[0-9a-f]{24}$/i.test(segment);

  return (
    <nav className="text-gray-600 text-sm w-full">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/home" className="text-gray-400 font-bold hover:underline">
            Home
          </Link>
        </li>

        {pathSegments
          .filter((segment) => !isUUID(segment))
          .map((segment, index, filteredSegments) => {
            const path = `/${filteredSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === filteredSegments.length - 1;
            const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <li key={path} className="flex items-center">
                <ChevronRight size={16} className="mr-1 text-gray-400"/>
                {isLast ? (
                  <span className="text-gray-400 font-bold">{formattedSegment}</span>
                ) : (
                  <Link href={path} className="text-gray-400 font-bold hover:underline">
                    {formattedSegment}
                  </Link>
                )}
              </li>
            );
          }
        )}
      </ol>
    </nav>
  );
}
