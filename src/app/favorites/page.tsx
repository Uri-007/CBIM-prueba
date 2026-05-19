import { FavoritesList } from "@/components/favorites/FavoritesList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favoritos — Rick & Morty",
  description: "Tus personajes favoritos de Rick and Morty",
};

export default function FavoritesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Mis <span className="text-amber-400">Favoritos</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Guarda hasta 5 personajes y reorganízalos a tu gusto.
        </p>
      </div>

      <FavoritesList />
    </div>
  );
}
