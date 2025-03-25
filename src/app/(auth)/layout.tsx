import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 bg-cover bg-center flex items-center justify-center bg-blue-900">
        <Image 
          alt="Login Image"
          src="/financial.svg"
          width={400}
          height={400}
          priority
          style={{ width: "400px", height: "400px" }}
        />
        <Link href='/' className="absolute top-8 left-14">
          <Image
            height={64}
            width={64}
            src='/logo-p.png'
            alt="Logo do Site"
          />
        </Link>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        {children}
      </div>
    </div>
  )
}