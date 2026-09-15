# Especificación: Generador QR Ultimate (Versión SaaS/Next.js)

## Contexto
Plataforma generadora de códigos QR avanzada construida sobre Next.js (App Router). Esta plataforma está diseñada como un modelo Freemium/SaaS con capacidades tanto estáticas como dinámicas (redireccionamiento editable). Ofrece QRs masivos, historial de generación, lector/escáner y diseño premium (UI moderna con Tailwind y Framer Motion).

## Usuarios
- **Usuario Invitado (Free)**: Genera QRs estáticos individuales, no tiene historial en la nube (solo localStorage si aplica) ni QRs dinámicos.
- **Usuario Profesional (Pro / Enterprise)**: Necesita generar decenas de QRs de golpe (CSV), acceder al historial de creaciones anteriores, y generar QRs dinámicos cuyo destino pueda actualizar sin reimprimir.

## Historias de Usuario
1. Como Profesional, quiero subir un CSV para generar e imprimir 100 QRs en un solo click de forma no bloqueante (Web Workers/Procesos Asíncronos).
2. Como Usuario, quiero usar mi webcam para leer el contenido de un QR que me pasaron.
3. Como Profesional, quiero que la interfaz sea premium, con Modo Oscuro/Claro integrado y animaciones suaves.
4. Como Profesional, quiero generar QRs para Instagram/LinkedIn/YouTube y que el logotipo se incruste automáticamente.
5. Como Profesional, quiero acceder a un "Historial" donde pueda ver y descargar QRs que generé en el pasado.
6. Como Profesional, quiero generar QRs "Dinámicos" para poder cambiar la URL destino en el futuro sin modificar la imagen impresa.

## Requisitos Funcionales (Notación EARS)

### RF-1: Formatos de Entrada
- **RF-1.1**: CUANDO el usuario seleccione Social, el sistema DEBERÁ estructurar la URL según la red social y permitir configuración estética (color, logo).
- **RF-1.2**: CUANDO el usuario elija generar un QR Dinámico, el sistema DEBERÁ proveer una ruta de redirección interna (ej. `/qr/[id]`) en lugar de la URL directa.

### RF-2: Personalización Gráfica Premium
- **RF-2.1**: SIEMPRE el sistema DEBERÁ renderizar los menús de personalización usando componentes modernos (TailwindCSS/UI Library).
- **RF-2.2**: CUANDO el usuario aplique cambios gráficos, la vista previa DEBERÁ actualizarse mediante un motor de renderizado de React (`qrcode` package).

### RF-3: Exportación y Múltiples Formatos
- **RF-3.1**: CUANDO se genera el código exitosamente, el sistema DEBERÁ habilitar la descarga en PNG, SVG y WebP/PDF.

### RF-4: Temas de UI (Gestor de Temas Next.js)
- **RF-4.1**: SIEMPRE el sistema DEBERÁ soportar la inyección de `next-themes` (o similar) para conmutar variables CSS oscuro/claro sin parpadeos (FOUC).

### RF-5: Generador Masivo (Bulk no bloqueante)
- **RF-5.1**: CUANDO el usuario suba un archivo `.csv` grande, el sistema DEBERÁ procesar las imágenes sin congelar el hilo principal de React.

### RF-6: Lector de QR (Escáner)
- **RF-6.1**: CUANDO el usuario active el Escáner, el sistema DEBERÁ solicitar permisos de cámara e iniciar decodificación desde un componente montado de React.

### RF-7: Historial (Gestor de Historial)
- **RF-7.1**: CUANDO se genera un QR exitosamente, el sistema DEBERÁ guardar un registro (metadata, fecha y tipo) en el historial persistente (API/DB o localStorage para fallbacks).
- **RF-7.2**: CUANDO el usuario navegue a la pestaña Historial, el sistema DEBERÁ listar sus creaciones ordenadas cronológicamente con opción de re-descargarlas.
