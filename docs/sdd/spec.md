# Especificación: Generador QR Pro (Versión Español)

## Contexto
Generador de códigos QR avanzado de código abierto (Vanilla JS, HTML, CSS) diseñado para profesionales. Esta herramienta genera códigos QR del lado del cliente utilizando la librería `qr-code-styling`, ofreciendo una personalización exhaustiva y garantizando privacidad total.

## Usuarios
- **Usuario Profesional**: Diseñadores, agencias y comerciantes que necesitan generar códigos en masa para marketing, con el logo corporativo incrustado y soporte vectorial.

## Historias de Usuario
1. Como Profesional, quiero generar QRs de ubicaciones y emails de manera sencilla.
2. Como Profesional, quiero generar direcciones de Bitcoin/Ethereum en QR para recibir pagos.
3. Como Profesional, quiero elegir entre puntos cuadrados o redondeados para adaptar el QR al *branding* de mi marca.
4. Como Profesional, quiero poder exportar los códigos en formato SVG vectorial.

## Requisitos Funcionales (Notación EARS)

### RF-1: Formatos de Entrada
- **RF-1.1**: CUANDO el usuario seleccione el tipo "Email", el sistema DEBERÁ formatearlo bajo el estándar RFC (`mailto:dest?subject=...`).
- **RF-1.2**: CUANDO el usuario seleccione el tipo "Geo", el sistema DEBERÁ asegurar que Latitud y Longitud sean coordenadas flotantes válidas y generar el formato `geo:lat,lng`.
- **RF-1.3**: CUANDO el usuario seleccione el tipo "Cripto", el sistema DEBERÁ estructurarlo como `<bitcoin|ethereum>:<direccion>?amount=<monto>`.
- **RF-1.4**: SI los datos ingresados no superan las validaciones formales, el sistema DEBERÁ mostrar una advertencia visual.

### RF-2: Personalización Gráfica
- **RF-2.1**: SIEMPRE el sistema DEBERÁ proveer selectores nativos de color para el frente y el fondo del código QR.
- **RF-2.2**: CUANDO el usuario inserte una imagen (Logo), el sistema DEBERÁ incrustarlo en el objeto de configuración del motor QR en formato Base64 a través de `FileReader`.
- **RF-2.3**: SIEMPRE el sistema DEBERÁ permitir cambiar el estilo de dibujo de los puntos de datos (ej. cuadrados, redondeados, puntos).

### RF-3: Exportación
- **RF-3.1**: CUANDO se genera el código exitosamente, el sistema DEBERÁ revelar las opciones de descarga en PNG y SVG.
- **RF-3.2**: CUANDO se solicita la descarga, el archivo resultante DEBERÁ tener un prefijo único `QR_<tipo>_<timestamp>`.

### RF-4: Arquitectura e Historial
- **RF-4.1**: EL SISTEMA DEBERÁ separar las responsabilidades mediante el uso de ES Modules nativos (Configuración, Validadores, Formateadores, Controladores de Interfaz).
- **RF-4.2**: CUANDO una generación sea exitosa, el sistema DEBERÁ guardar sus datos y su configuración estética en el `localStorage` (limitado a los 15 más recientes).
