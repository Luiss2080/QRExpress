"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Upload, Camera, Settings2, Download, Zap, Link as LinkIcon, Share2, Mail, MapPin, HelpCircle, X, Check } from 'lucide-react';
import QRCode from 'qrcode';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'individual' | 'masivo' | 'escaner'>('individual');
  const [qrType, setQrType] = useState<'url' | 'social' | 'vcard' | 'email' | 'location'>('url');
  
  const [qrData, setQrData] = useState('https://ejemplo.com');
  const [qrColor, setQrColor] = useState('#0f172a');
  const [qrImage, setQrImage] = useState('');
  
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(qrData || 'https://ejemplo.com', {
      color: {
        dark: qrColor,
        light: '#ffffff'
      },
      width: 400,
      margin: 2
    }).then(url => setQrImage(url)).catch(console.error);
  }, [qrData, qrColor]);

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    toast.success('¡Código QR generado y descargado con éxito!', {
      icon: <Check className="text-green-500 w-5 h-5" />
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Navbar Premium */}
      <nav className="fixed w-full z-50 glass-panel border-b border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <QrCode className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                QR Pro Ultimate
              </span>
            </div>
            
              <Link href="/ayuda" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Manual
              </Link>
              <button className="px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-colors">
                Ingresar
              </button>
              <button className="px-5 py-2 rounded-full text-sm font-medium bg-foreground text-background hover:scale-105 transition-transform shadow-xl">
                Prueba Pro
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Genera códigos QR <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              que impresionan
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            La plataforma definitiva para crear, escanear y gestionar códigos QR dinámicos y estáticos con estilo premium.
          </motion.p>
        </div>

        {/* Workspace App */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]"
        >
          {/* Sidebar Tools */}
          <div className="w-full md:w-64 bg-secondary/30 p-6 flex flex-col gap-4 border-r border-border/50">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Herramientas</h3>
            
            <button 
              onClick={() => setActiveTab('individual')}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all overflow-hidden ${activeTab === 'individual' ? 'text-white' : 'hover:bg-secondary/50'}`}
            >
              {activeTab === 'individual' && (
                <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-primary shadow-lg shadow-primary/25 rounded-xl z-0" />
              )}
              <div className="relative z-10 flex items-center gap-3">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Individual</span>
              </div>
            </button>
            
            <button 
              onClick={() => setActiveTab('masivo')}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all overflow-hidden ${activeTab === 'masivo' ? 'text-white' : 'hover:bg-secondary/50'}`}
            >
              {activeTab === 'masivo' && (
                <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-primary shadow-lg shadow-primary/25 rounded-xl z-0" />
              )}
              <div className="relative z-10 flex items-center gap-3">
                <Upload className="w-5 h-5" />
                <span className="font-medium">Generación Masiva</span>
              </div>
            </button>
            
            <button 
              onClick={() => setActiveTab('escaner')}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all overflow-hidden ${activeTab === 'escaner' ? 'text-white' : 'hover:bg-secondary/50'}`}
            >
              {activeTab === 'escaner' && (
                <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-primary shadow-lg shadow-primary/25 rounded-xl z-0" />
              )}
              <div className="relative z-10 flex items-center gap-3">
                <Camera className="w-5 h-5" />
                <span className="font-medium">Escáner Web</span>
              </div>
            </button>
          </div>

          {/* Main Workspace Area */}
          <div className="flex-1 p-6 md:p-10 flex flex-col md:flex-row gap-10 bg-background/50">
            
            {/* Left Panel: Configuration */}
            <div className="flex-1 flex flex-col gap-8">
              {activeTab === 'individual' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                  <h2 className="text-2xl font-bold mb-6">Configura tu QR</h2>
                  
                  {/* Type Selector */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                    {[
                      { id: 'url', icon: LinkIcon, label: 'Enlace URL' },
                      { id: 'social', icon: Share2, label: 'Redes Sociales' },
                      { id: 'email', icon: Mail, label: 'Correo' },
                      { id: 'location', icon: MapPin, label: 'Ubicación' },
                    ].map((t) => (
                      <button 
                        key={t.id}
                        onClick={() => setQrType(t.id as any)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${qrType === t.id ? 'border-primary bg-primary/5 text-primary' : 'border-border/50 hover:border-primary/30 text-muted-foreground'}`}
                      >
                        <t.icon className="w-6 h-6 mb-2" />
                        <span className="text-xs font-semibold">{t.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Input Data */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Destino (URL)</label>
                      <input 
                        type="text" 
                        value={qrData}
                        onChange={(e) => setQrData(e.target.value)}
                        placeholder="https://ejemplo.com"
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Settings2 className="w-4 h-4" /> Personalización Visual
                        </label>
                        <button onClick={() => setShowSettingsModal(true)} className="text-xs bg-primary text-white px-3 py-1.5 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                          Ajustes Avanzados
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Color Principal</label>
                          <div className="flex gap-2">
                            {['#0f172a', '#4f46e5', '#ec4899', '#10b981'].map(c => (
                              <button 
                                key={c} 
                                onClick={() => setQrColor(c)}
                                className={`w-8 h-8 rounded-full border-2 ${qrColor === c ? 'border-primary scale-110' : 'border-white dark:border-slate-800'} shadow-sm transition-all`} 
                                style={{backgroundColor: c}} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'masivo' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Generación Masiva (CSV)</h2>
                  <p className="text-muted-foreground max-w-sm mb-8">Sube tu archivo .csv y generaremos un archivo .zip con miles de códigos QR en segundos gracias a los Web Workers.</p>
                  <button className="px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:scale-105 transition-transform">
                    Seleccionar Archivo CSV
                  </button>
                </motion.div>
              )}

              {activeTab === 'escaner' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-full max-w-md aspect-square bg-black/5 rounded-3xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center relative overflow-hidden">
                    <Camera className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground font-medium">Cámara no inicializada</p>
                    <button className="mt-4 px-5 py-2 bg-primary text-white rounded-lg font-medium text-sm">
                      Permitir Cámara
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Panel: Preview (only for individual) */}
            {activeTab === 'individual' && (
              <div className="w-full md:w-80 flex flex-col items-center border-l border-border/50 pl-0 md:pl-10 pt-10 md:pt-0">
                <h3 className="text-sm font-semibold text-muted-foreground mb-8">Vista Previa</h3>
                
                <div className="w-64 h-64 bg-white rounded-2xl p-4 shadow-xl mb-8 relative group cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  {qrImage ? (
                    <img src={qrImage} alt="Código QR Generado" className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full bg-secondary/20 animate-pulse rounded-xl" />
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-2xl pointer-events-none" />
                </div>

                <div className="w-full space-y-3">
                  <a 
                    href={qrImage} 
                    download="codigo-qr.png"
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                  >
                    <Download className="w-5 h-5" />
                    Descargar PNG
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-2 bg-secondary/50 rounded-xl font-medium text-sm hover:bg-secondary transition-colors">
                      SVG (Vector)
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2 bg-secondary/50 rounded-xl font-medium text-sm hover:bg-secondary transition-colors">
                      PDF (Print)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Advanced Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              className="bg-background rounded-3xl shadow-2xl p-6 md:p-8 max-w-lg w-full border border-border/50 relative"
            >
              <button onClick={() => setShowSettingsModal(false)} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground bg-secondary/50 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold mb-2">Ajustes Avanzados de QR</h3>
              <p className="text-muted-foreground mb-6">Configura opciones premium (próximamente conectadas con el backend SaaS).</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Incrustar Logotipo Central</label>
                  <div className="w-full h-24 border-2 border-dashed border-border/60 rounded-xl flex items-center justify-center cursor-pointer hover:bg-secondary/20 transition-colors">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Upload className="w-4 h-4" /> Subir Imagen (PRO)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nivel de Corrección de Errores</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:outline-none">
                    <option>Alta (Recomendado para Logos)</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                </div>
                <button onClick={() => setShowSettingsModal(false)} className="w-full py-3 mt-4 bg-foreground text-background rounded-xl font-medium">
                  Guardar y Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
