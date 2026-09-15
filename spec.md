# Especificación: Generador QR Comercial

## Contexto
El "Generador QR Comercial" es una aplicación web de frontend (sin backend) diseñada para crear, personalizar, visualizar y descargar códigos QR de distintos tipos. Está pensada para usuarios que necesitan una herramienta rápida, estéticamente atractiva y que guarde su historial localmente.

## Usuarios
- **Usuario Estándar**: Persona que necesita generar un código QR rápidamente para compartir un enlace, un texto, una red WiFi o sus datos de contacto.

## Historias de Usuario
1. Como Usuario Estándar, quiero poder generar QRs de diferentes tipos (URL, Texto, WiFi, vCard) para no tener que buscar múltiples herramientas.
2. Como Usuario Estándar, quiero personalizar el color del QR para que coincida con mi marca personal o corporativa.
3. Como Usuario Estándar, quiero descargar el QR generado como una imagen (PNG) para usarlo en mis impresiones o redes sociales.
4. Como Usuario Estándar, quiero poder ver los últimos QRs que he generado al volver a visitar la página para no tener que recrearlos.

## Requisitos Funcionales (Notación EARS)

### RF-1: Tipos de QR
- **RF-1.1**: CUANDO el usuario seleccione el tipo "URL", el sistema DEBERÁ formatear la entrada como una URL válida.
- **RF-1.2**: CUANDO el usuario seleccione el tipo "WiFi", e introduzca SSID, Password y Tipo de Seguridad, el sistema DEBERÁ generar la cadena en formato `WIFI:S:<SSID>;T:<WEP|WPA|blank>;P:<PASSWORD>;;`.
- **RF-1.3**: CUANDO el usuario seleccione el tipo "vCard", el sistema DEBERÁ generar una cadena en formato vCard válido (`BEGIN:VCARD...`).

### RF-2: Personalización y Generación
- **RF-2.1**: SIEMPRE el sistema DEBERÁ proporcionar controles para elegir el "Color Frontal" y "Color de Fondo" del código QR.
- **RF-2.2**: CUANDO el usuario pulse "Generar QR", el sistema DEBERÁ renderizar un código QR en pantalla utilizando los datos introducidos y los colores seleccionados usando qrcode.js.
- **RF-2.3**: SI los datos de entrada están vacíos, el sistema DEBERÁ mostrar un mensaje de error visual y NO DEBERÁ generar el QR.

### RF-3: Descarga
- **RF-3.1**: MIENTRAS haya un QR generado visible en pantalla, el sistema DEBERÁ habilitar un botón de "Descargar QR".
- **RF-3.2**: CUANDO el usuario haga clic en "Descargar QR", el sistema DEBERÁ iniciar la descarga del QR en formato PNG extrayendo la imagen generada.

### RF-4: Historial
- **RF-4.1**: CUANDO se genera un nuevo QR exitosamente, el sistema DEBERÁ guardar una referencia de este QR (tipo, datos) en el `localStorage` del navegador.
- **RF-4.2**: CUANDO la aplicación se inicie, el sistema DEBERÁ cargar los QRs previos desde `localStorage` y mostrarlos en un panel de "Historial".
- **RF-4.3**: CUANDO el usuario haga clic en un elemento del "Historial", el sistema DEBERÁ cargar esos datos en el formulario y regenerar el QR.

## Fuera de Alcance
- Generación de QRs dinámicos (aquellos que requieren redirecciones desde un servidor backend propio).
- Subida de logotipos e imágenes en el centro del código QR (puede considerarse para futuras versiones).

## Casos Límite
- Texto extremadamente largo: El sistema debe ajustar automáticamente el nivel de corrección de errores (ECC) o el tamaño para asegurar legibilidad.
- Datos corruptos en `localStorage`: El sistema debe ignorarlos o limpiar el almacenamiento y continuar sin fallar.
