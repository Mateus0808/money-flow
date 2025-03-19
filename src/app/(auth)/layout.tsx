import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-cover bg-center flex items-center justify-center bg-blue-900">
        <Image 
          alt="Login Image"
          src="/financial.svg"
          width={400}
          height={400}
          priority
          style={{ width: "400px", height: "400px" }}
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        {children}
      </div>
    </div>
  )
}