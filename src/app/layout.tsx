import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Rick & Morty — Explorer",
  description: "Explora el universo de Rick and Morty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        {/* Ambient glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-500/4 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-violet-500/4 rounded-full blur-3xl" />
        </div>

        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="border-t border-white/5 mt-16 py-8 text-center">
          <p className="text-zinc-600 text-sm">
            Datos de{" "}
            <a
              href="https://rickandmortyapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500/70 hover:text-cyan-400 transition-colors"
            >
              rickandmortyapi.com
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
