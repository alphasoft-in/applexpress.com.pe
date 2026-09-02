"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  topProducts: { name: string; count: number }[];
  asesorClicks: { name: string; clicks: number }[];
}

export function AnalyticsCharts({ topProducts, asesorClicks }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Top Productos Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-6">Visitas por Producto</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6b7280" }} width={120} />
              <Tooltip cursor={{ fill: "#f3f4f6" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#3b82f6" : "#93c5fd"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clics Asesores Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-6">Clics a WhatsApp por Asesor</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={asesorClicks} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Tooltip cursor={{ fill: "#f3f4f6" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
              <Bar dataKey="clicks" radius={[4, 4, 0, 0]} maxBarSize={60}>
                {asesorClicks.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name.includes("1") ? "#10b981" : "#6366f1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
