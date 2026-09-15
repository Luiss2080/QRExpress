<div align="center">
  <img src="https://img.icons8.com/nolan/96/qr-code.png" alt="QR Pro Ultimate Logo" width="100"/>
  
  # 🚀 QR Pro Ultimate (SaaS Edition)
  **El Ecosistema Definitivo para Generación, Gestión y Analítica de Códigos QR.**
  
  [![Estado](https://img.shields.io/badge/Estado-Producci%C3%B3n-success?style=for-the-badge)](#)
  [![Versión](https://img.shields.io/badge/Versi%C3%B3n-4.0.0--Next.js-black?style=for-the-badge&logo=next.js)](#)
  [![Arquitectura](https://img.shields.io/badge/Stack-React_|_Tailwind_|_Framer-38bdf8?style=for-the-badge)](#)
  [![Metodología](https://img.shields.io/badge/Dise%C3%B1ado_con-SDD-8b5cf6?style=for-the-badge)](#)
</div>

<br/>

**QR Pro Ultimate** ha evolucionado de una simple utilidad Vanilla JS a un robusto **Software as a Service (SaaS)** construido sobre Next.js. Guiados por la filosofía [SDD (Spec-Driven Development)](docs/sdd/spec.md), ofrecemos una experiencia inigualable, fusionando privacidad absoluta con analíticas avanzadas.

---

## ✨ Nuevas Características Premium

### 🎨 1. Interfaz Glassmorphism & Microinteracciones
Una experiencia de usuario (UX) asombrosa propulsada por **Framer Motion** y **TailwindCSS**. Disfruta de transiciones fluidas, modales animados y notificaciones *toast* interactivas (cortesía de `sonner`).

### 📊 2. Dashboard de Analíticas (Nuevo)
Entiende a tu audiencia. Hemos incorporado un panel interactivo impulsado por **Recharts** que te permite visualizar:
- **Rendimiento de escaneos** a lo largo del tiempo.
- **Top de dispositivos** y orígenes geográficos.
- Control total de tus campañas QR Dinámicas.

### 🖼️ 3. Personalización Extrema (Branding Inteligente)
- Sube tu **Logotipo Corporativo** desde tu ordenador; el motor lo incrustará perfectamente en el centro de tu QR en tiempo real.
- Control avanzado de niveles de corrección de errores (High, Medium, Low) para garantizar la escaneabilidad.
- Generación de códigos multi-formato con descarga directa e instantánea.

### 🗃️ 4. Procesamiento Masivo (Bulk)
Genera cientos de QRs desde un archivo `.csv`. Próximamente potenciado por **Web Workers** para garantizar que tu navegador nunca se congele durante exportaciones masivas a `.zip`.

### 📷 5. Escáner Lector (Webcam)
Convierte tu dispositivo móvil o computadora en un escáner nativo ultra-rápido para decodificar QRs físicos.

---

## 💻 Arquitectura y Stack Tecnológico

Hemos abrazado los estándares más modernos de la industria web:
- **Core**: Next.js (App Router) + React 19
- **Estilización**: TailwindCSS (Variables nativas para Dark/Light Mode perfecto sin parpadeos).
- **Animaciones**: Framer Motion
- **Iconografía**: Lucide React
- **Gráficos Data**: Recharts
- **Testing (WIP)**: Vitest + React Testing Library

---

## 🚀 Instalación y Uso (Entorno de Desarrollo)

Clona el repositorio e inicia el servidor en modo desarrollo con recarga en vivo (Hot Module Replacement):

```bash
# 1. Instala las dependencias
npm install

# 2. Inicia el servidor
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la magia.

---

## 📘 Estándar SDD (Spec-Driven Development) & Ayuda

Este proyecto no adivina requisitos, los sigue. Puedes revisar nuestra documentación técnica y manuales:
- [📖 Manual de Uso Interactivo](http://localhost:3000/ayuda): Integrado en la propia app.
- [📑 spec.md](docs/sdd/spec.md): Especificación técnica en notación EARS.
- [📋 MANUAL_DE_USO.md](docs/MANUAL_DE_USO.md): Formato markdown crudo para desarrolladores.

---
<div align="center">
  <sub>Construido con ❤️ y React por el ecosistema Algentic.</sub>
</div>
