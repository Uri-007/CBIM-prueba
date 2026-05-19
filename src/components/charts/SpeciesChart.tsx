"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { SpeciesData } from "@/types";
import { SPECIES_COLORS } from "@/constants";

interface SpeciesChartProps {
  data: SpeciesData[];
}

interface TooltipPayload {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-white font-medium text-sm">{label}</p>
      <p className="text-cyan-400 text-sm mt-0.5">
        {payload[0]?.value ?? 0} personajes
      </p>
    </div>
  );
}

export function SpeciesChart({ data }: SpeciesChartProps) {
  const [mounted, setMounted] = useState(false);
  const top = data.slice(0, 10);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-2xl bg-white/3 border border-white/8 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Personajes por Especie
        </h2>
        <p className="text-sm text-zinc-500 mt-0.5">
          Top 10 especies más frecuentes
        </p>
      </div>

      <div className="h-72 w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={top}
              margin={{ top: 4, right: 8, left: -20, bottom: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="species"
                tick={{ fill: "#71717a", fontSize: 11 }}
                angle={-40}
                textAnchor="end"
                interval={0}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#52525b", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {top.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      SPECIES_COLORS[index % SPECIES_COLORS.length] ?? "#00b4d8"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-end gap-3 px-4 pb-8">
            {top.map((item, i) => (
              <div key={item.species} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-white/5 animate-pulse"
                  style={{ height: `${Math.max(20, (item.count / (top[0]?.count ?? 1)) * 180)}px` }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
