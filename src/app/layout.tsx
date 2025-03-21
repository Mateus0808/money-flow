import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased bg-backgroundLight dark:bg-backgroundDark"
      >
        <ToastContainer />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
