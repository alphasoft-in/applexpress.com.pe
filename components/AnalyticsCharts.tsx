"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";

interface Props {
  topProducts: { name: string; count: number }[];
  asesorClicks: { name: string; clicks: number }[];
  monthlyData: { month: string; views: number; clicks: number }[];
}

export function AnalyticsCharts({ topProducts, asesorClicks, monthlyData }: Props) {
  return (
    <div className="space-y-6 mt-6">
      {/* Gráfico Mensual (Líneas) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-6">Tráfico y Clics Mensuales (Últimos 6 meses)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} allowDecimals={false} />
              <Tooltip 
                cursor={{ stroke: "#e5e7eb", strokeWidth: 2 }} 
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} 
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
              <Line type="monotone" dataKey="views" name="Vistas Totales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="clicks" name="Clics a WhatsApp" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Productos Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-6">Visitas por Producto</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6b7280" }} width={140} />
                <Tooltip cursor={{ fill: "#f3f4f6" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
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
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} allowDecimals={false} />
                <Tooltip cursor={{ fill: "#f3f4f6" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Bar dataKey="clicks" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {asesorClicks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name.includes("1") ? "#10b981" : "#6366f1"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
