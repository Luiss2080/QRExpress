"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowLeft, Activity, Users, MapPin, Download, QrCode } from 'lucide-react';
import Link from 'next/link';

const data = [
  { name: 'Lun', escaneos: 400 },
  { name: 'Mar', escaneos: 300 },
  { name: 'Mie', escaneos: 550 },
  { name: 'Jue', escaneos: 200 },
  { name: 'Vie', escaneos: 700 },
  { name: 'Sab', escaneos: 850 },
  { name: 'Dom', escaneos: 900 },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <nav className="border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium text-sm">Volver al Generador</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">PRO</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Panel de Analíticas</h1>
            <p className="text-muted-foreground">Mide el rendimiento de tus códigos QR Dinámicos.</p>
          </div>
          <div role="group" aria-label="Rango de fechas" className="flex gap-2 bg-secondary/50 p-1 rounded-xl">
            {['24h', '7d', '30d'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                aria-pressed={timeRange === range}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${timeRange === range ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Escaneos Totales', value: '3,900', icon: Activity, color: 'text-primary' },
            { label: 'Visitantes Únicos', value: '2,140', icon: Users, color: 'text-accent' },
            { label: 'QRs Activos', value: '14', icon: QrCode, color: 'text-green-500' },
            { label: 'País Principal', value: 'España', icon: MapPin, color: 'text-orange-500' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
                +12% esta semana
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass-panel p-6 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Rendimiento (Escaneos)</h3>
              <button aria-label="Descargar reporte de rendimiento" className="text-muted-foreground hover:text-primary transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{borderRadius: '12px', border: 'none', background: '#0f172a', color: '#fff'}} 
                  />
                  <Bar dataKey="escaneos" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-6">Top Dispositivos</h3>
            <div className="space-y-4">
              {[
                { dev: 'iPhone', p: 60, col: 'bg-primary' },
                { dev: 'Android', p: 35, col: 'bg-accent' },
                { dev: 'Desktop', p: 5, col: 'bg-green-500' },
              ].map(d => (
                <div key={d.dev}>
                  <div className="flex justify-between text-sm mb-1 font-medium">
                    <span>{d.dev}</span>
                    <span>{d.p}%</span>
                  </div>
                  <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${d.col}`} style={{ width: `${d.p}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
