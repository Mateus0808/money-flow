"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-gray-600 text-sm w-full">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/home" className="text-blue-700 font-bold hover:underline">
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={path} className="flex items-center">
              <span className="mx-1"> &gt;&gt; </span>
              {isLast ? (
                <span className="text-gray-400 font-bold">{formattedSegment}</span>
              ) : (
                <Link href={path} className="text-blue-700 font-bold hover:underline">
                  {formattedSegment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
