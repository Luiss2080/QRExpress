# Especificación: Generador QR Comercial Pro

## Contexto
El "Generador QR Comercial Pro" es una SPA (Single Page Application) sin backend que permite generar, personalizar exhaustivamente, guardar y descargar códigos QR de alta calidad. 

## Usuarios
- **Usuario Pro**: Busca generar QRs para marketing, campañas o tarjetas de presentación con su propio logo y colores corporativos, y requiere descargas vectoriales (SVG) para impresión.

## Historias de Usuario
1. Como Usuario Pro, quiero generar QRs para WhatsApp (mensaje predefinido) para usar en flyers impresos.
2. Como Usuario Pro, quiero subir el logo de mi empresa para que aparezca en el centro del QR sin romperlo.
3. Como Usuario Pro, quiero cambiar la forma de los puntos del QR (redondos/cuadrados) para que coincida con la estética de mi marca.
4. Como Usuario Pro, quiero descargar el QR en SVG para dárselo a mi diseñador sin perder calidad.

## Requisitos Funcionales (Notación EARS)

### RF-1: Formatos de Datos Ampliados
- **RF-1.1**: CUANDO el usuario seleccione el tipo "WhatsApp", e introduzca un Teléfono y Mensaje, el sistema DEBERÁ formatearlo como una URL válida de la API de WhatsApp (`https://wa.me/<telefono>?text=<mensaje>`).
- **RF-1.2**: CUANDO el usuario seleccione los otros tipos (URL, Texto, WiFi, vCard), el sistema DEBERÁ aplicar los formateos correspondientes.

### RF-2: Personalización Avanzada (Formas y Logos)
- **RF-2.1**: SIEMPRE el sistema DEBERÁ permitir elegir entre puntos "cuadrados" (square) o "redondos" (dots) para el cuerpo del QR.
- **RF-2.2**: CUANDO el usuario seleccione un archivo de imagen en el input de Logo, el sistema DEBERÁ procesar ese archivo localmente mediante `FileReader` e incrustarlo en la configuración de la librería de generación.
- **RF-2.3**: SIEMPRE el sistema DEBERÁ proveer selectores de color de fondo y de los puntos.

### RF-3: Generación y Motor
- **RF-3.1**: CUANDO se soliciten cambios visuales o de datos, el sistema DEBERÁ utilizar la librería `qr-code-styling` para instanciar y adjuntar un QR canvas/SVG en el DOM.
- **RF-3.2**: SI los datos requeridos están vacíos, el sistema DEBERÁ mostrar error y NO generar el QR.

### RF-4: Exportación Vectorial
- **RF-4.1**: CUANDO haya un QR válido, el sistema DEBERÁ habilitar botones para descargar en formato PNG y SVG.
- **RF-4.2**: CUANDO se presione cualquiera de las descargas, el sistema DEBERÁ usar los métodos nativos de `qr-code-styling` para descargar el archivo con un nombre único basado en fecha y tipo.

### RF-5: Historial y Arquitectura
- **RF-5.1**: CUANDO se genera un QR, el sistema DEBERÁ guardarlo en `localStorage`. (Incluyendo tipo y datos).
- **RF-5.2**: EL SISTEMA DEBERÁ separar las responsabilidades en módulos ES6 independientes.
