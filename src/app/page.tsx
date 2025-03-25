"use client";

import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CardContainer } from "@/components/shared/CardContainer";
import clsx from "clsx";
import { ReactNode } from "react";
import Image from "next/image";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={clsx("bg-white rounded-2xl shadow-md p-4 border", className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("p-4", className)}>{children}</div>;
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      
      <header className="w-full max-w-5xl flex justify-between items-center py-4">
        <Link href="/">
          <Image 
            alt="Logo"
            src='/logo-p.png'
            height={64}
            width={64}
          />
        </Link>
        <Link href="/login">
          <Button label="Entrar" isLoading={false} />
        </Link>
      </header>

      <section className="w-full max-w-4xl text-center mt-10">
        <motion.h2 
          className="text-4xl font-extrabold text-gray-900"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bem-vindo ao Smart Money!
        </motion.h2>
        <p className="text-gray-600 mt-4 text-lg">
          O lugar ideal para gerenciar suas transações e metas financeiras de forma fácil e segura.
        </p>
        <div className="mt-8 text-gray-700">
          <p className="text-lg">
            Com o <strong>Smart Money</strong>, você pode visualizar todos os seus dados financeiros em um <strong>dashboard interativo</strong>, 
            acompanhar suas metas, analisar seu fluxo de caixa e muito mais.
          </p>
          <p className="mt-4 text-lg">
            Nosso objetivo é tornar o controle das suas finanças mais intuitivo, simplificando o processo de acompanhamento e planejamento.
          </p>
        </div>
      </section>

      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {[
          { title: "Segurança", desc: "Seus dados estão sempre protegidos." },
          { title: "Facilidade", desc: "Interface intuitiva para qualquer usuário." },
          { title: "Controle", desc: "Gerencie suas transações de forma eficaz." }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="shadow-md hover:shadow-lg transition">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="mt-10">
        <Link href="/signup">
          <Button label="Criar Conta Grátis" isLoading={false} />
        </Link>
      </section>

      <footer className="mt-12 text-gray-500 text-sm flex flex-col justify-center items-center">
        <p>© {new Date().getFullYear()} Smart Money. Todos os direitos reservados.</p>
        <p className="mt-2">
          Desenvolvido por{" "}
          <a 
            href="https://www.linkedin.com/in/mateus-dos-santos/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            Mateus dos Santos
          </a>
        </p>
      </footer>
    </main>
  );
}
