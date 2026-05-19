import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
              R
            </div>
            <span className="font-bold text-white tracking-tight">
              Rick<span className="text-cyan-400">&</span>Morty
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Personajes
            </Link>
            <Link
              href="/favorites"
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1.5"
            >
              <span>Favoritos</span>
             
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
