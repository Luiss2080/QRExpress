> [!WARNING]
> **Archivo histórico / legacy — no forma parte de la aplicación actual.**
> Este directorio contiene la versión Vanilla JS original del proyecto,
> anterior a la migración a Next.js (ver el `README.md` en la raíz del
> repositorio para la aplicación real). `next build` solo compila
> `src/app/`; nada de `legacy_vanilla_js/` se ejecuta, se importa ni se
> despliega. Se conserva únicamente como referencia histórica de diseño y
> no recibe mantenimiento activo. Las afirmaciones de este README (estado
> "Producción", lector por webcam, generación masiva, etc.) describen esa
> versión antigua y **no** han sido re-verificadas contra el código
> Next.js actual.

<div align="center">
  <img src="https://img.icons8.com/color/96/000000/qr-code.png" alt="QR Pro Ultimate Logo" width="100"/>
  
  # 🚀 QR Pro Ultimate Edition
  **El Generador, Lector y Procesador de Códigos QR Definitivo.**
  
  [![Estado](https://img.shields.io/badge/Estado-Producci%C3%B3n-success?style=for-the-badge)](#)
  [![Versión](https://img.shields.io/badge/Versi%C3%B3n-3.0.0--Ultimate-blue?style=for-the-badge)](#)
  [![Arquitectura](https://img.shields.io/badge/Vanilla_JS-ES6_Modules-f7df1e?style=for-the-badge&logo=javascript)](#)
  [![Metodología](https://img.shields.io/badge/Dise%C3%B1ado_con-SDD-8b5cf6?style=for-the-badge)](#)
</div>

<br/>

**QR Pro Ultimate** es una herramienta de grado empresarial ejecutada 100% del lado del cliente. Nacida de un enfoque [SDD (Spec-Driven Development)](docs/sdd/spec.md), ofrece una privacidad inigualable ya que tus datos jamás abandonan el navegador.

---

## ✨ Características Principales

### 🛠️ 1. Generación Avanzada (10+ Formatos)
Crea códigos QR precisos adaptados a cada necesidad.
- **🌐 URLs & Texto**: Clásicos enlaces y mensajes.
- **📱 Redes Sociales Inteligentes**: Formularios dedicados para **Instagram, LinkedIn y YouTube** que *auto-inyectan* el logotipo oficial de la red social en el centro del código.
- **📅 Eventos vCalendar**: Códigos que al escanearse agendan automáticamente reuniones en el calendario móvil (con soporte nativo DateTime).
- **✉️ Email, 💬 WhatsApp y 👤 VCard**: Listos para comunicarse.
- **📍 Geolocalización y ₿ Criptomonedas**: Coordenadas exactas y pagos (BTC/ETH).

### 🎨 2. Estética y Personalización (Branding)
- Sube el **Logotipo de tu Empresa** para incrustarlo en el centro del código.
- Escoge entre **Puntos Cuadrados o Redondos**.
- Selecciona colores HEX exactos para el Frente y el Fondo de tu código.

### 🗃️ 3. Motor Masivo (Bulk Processing)
¿Necesitas QRs para 500 empleados? 
Ve a la pestaña "Generación Masiva", sube un simple archivo `.csv` y nuestra aplicación utilizará `JSZip` para descargar a tu computadora un archivo comprimido `.zip` con cientos de imágenes QR en cuestión de milisegundos.

### 📷 4. Escáner Lector (Webcam)
Convierte tu computadora o dispositivo móvil en un escáner.
Gracias a `html5-qrcode`, puedes darle permisos a tu cámara y decodificar cualquier QR físico al instante.

### 💾 5. Exportación Multi-Formato
- **PNG**: Ideal para redes sociales y pantallas.
- **SVG (Vectorial)**: La mejor opción para diseñadores gráficos (no pierde calidad al agrandar).
- **PDF**: Listo para mandar a imprimir en formato A4/Tarjeta usando `jsPDF`.

---

## 💻 Arquitectura y Tecnologías

Todo el software está modularizado usando buenas prácticas y Patrones Orientados a Objetos (ES6):
- **100% Español**: Variables, Clases, Funciones y Comentarios estandarizados.
- **Sin Backend**: Privacidad absoluta (los QRs se generan y procesan en la memoria RAM del navegador).
- **Tema Oscuro/Claro**: `GestorTemas.js` utilizando Variables CSS y persistiéndolo en `localStorage`.
- **Librerías Core (Vía CDN)**:
  - `qr-code-styling` (Motor Gráfico)
  - `JSZip` (Empaquetado Masivo)
  - `jsPDF` (Creación de Documentos)
  - `html5-qrcode` (Módulo de Lectura por Cámara)

---

## 🚀 Instalación y Uso

Dado que el proyecto utiliza **Módulos ES6** (`<script type="module">`), la política de seguridad moderna de los navegadores (CORS) **impide ejecutarlo simplemente abriendo el archivo `index.html` con doble clic**.

**Sigue estos pasos:**

1. Clona el repositorio o ubícalo dentro de tu servidor local (Ej: `C:\laragon\www\generador-qr-web`).
2. Arranca tu entorno de servidor web (Laragon, XAMPP, Live Server en VSCode, Node `http-server`, etc.).
3. Accede a través de `http://localhost/generador-qr-web/`.

---

## 📘 Estándar SDD (Spec-Driven Development)

Este proyecto está respaldado por especificaciones vivas.
Puedes revisar nuestra documentación técnica en la carpeta `docs/sdd/`:
- [📑 spec.md](docs/sdd/spec.md): Historias de usuario y requisitos funcionales detallados con sintaxis EARS.
- [🤖 AGENTS.md](docs/sdd/AGENTS.md): Reglas estrictas de codificación para inteligencias artificiales contribuyentes.

---
<div align="center">
  <sub>Construido con ❤️ y Vanilla JS.</sub>
</div>
