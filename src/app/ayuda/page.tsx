"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Ayuda() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav className="fixed w-full z-50 glass-panel border-b border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium text-sm">Volver a la App</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <BookOpen className="text-primary w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Manual de Uso
          </h1>
          <p className="text-xl text-muted-foreground">Aprende a aprovechar al máximo QR Pro Ultimate.</p>
        </motion.div>

        <div className="space-y-12">
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
              Generador Individual
            </h2>
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Nuestra herramienta principal está diseñada para ser instantánea. Simplemente selecciona el tipo de contenido que quieres vincular (Enlace URL, Redes Sociales, etc.), escribe el texto en el recuadro, y observa cómo tu código se genera automáticamente a la derecha.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                  <span>Usa el selector de colores para adaptar el QR a la imagen corporativa de tu marca.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                  <span>Pulsa &ldquo;Descargar PNG&rdquo; para obtener un archivo transparente de alta calidad.</span>
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span>
              Generación Masiva (Procesamiento CSV)
            </h2>
            <div className="glass-panel p-6 rounded-2xl space-y-4 border-l-4 border-l-accent">
              <p className="text-muted-foreground leading-relaxed">
                Si necesitas cientos de códigos para tarjetas de invitación o identificaciones de empleados, no pierdas el tiempo generándolos uno por uno.
              </p>
              <p className="text-sm font-medium">Sube un archivo <code className="bg-secondary/50 px-2 py-1 rounded">.csv</code> y el sistema empaquetará todas tus imágenes generadas en un archivo comprimido <code className="bg-secondary/50 px-2 py-1 rounded">.zip</code>. Todo de forma privada y sin colgar el navegador.</p>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">3</span>
              Escáner Web
            </h2>
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Convierte tu laptop o smartphone en una caja registradora decodificadora. Solo necesitas otorgar los permisos de cámara de tu navegador, apuntar al QR físico, y nuestro sistema te mostrará instantáneamente el contenido decodificado en pantalla.
              </p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
