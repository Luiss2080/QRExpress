# Especificación: Generador QR Ultimate (Versión Español)

## Contexto
Generador de códigos QR definitivo de código abierto (Vanilla JS). Incluye capacidades de nivel empresarial como generación masiva (CSV), decodificación (Lector QR por webcam), temas oscuros/claros adaptables, y exportaciones en PDF.

## Usuarios
- **Usuario Profesional / Enterprise**: Necesita generar decenas de QRs de golpe (Ej: invitaciones), necesita escanear QRs para validarlos, y necesita integraciones sociales pre-empaquetadas.

## Historias de Usuario
1. Como Profesional, quiero subir un CSV para generar e imprimir 100 QRs en un solo click.
2. Como Profesional, quiero usar mi webcam para leer el contenido de un QR que me pasaron.
3. Como Profesional, quiero que la interfaz tenga un Modo Oscuro para trabajar de noche sin cansarme la vista.
4. Como Profesional, quiero generar QRs para Instagram/LinkedIn y que el logo se ponga solo.
5. Como Profesional, quiero exportar QRs directamente en PDF para imprimirlos.

## Requisitos Funcionales (Notación EARS)

### RF-1: Formatos de Entrada
- **RF-1.1**: CUANDO el usuario seleccione Social, el sistema DEBERÁ estructurar la URL según la red social seleccionada.

### RF-2: Personalización Gráfica
- **RF-2.1**: SIEMPRE el sistema DEBERÁ proveer selectores de color.
- **RF-2.2**: CUANDO el usuario seleccione una plantilla Social, el sistema DEBERÁ incrustar automáticamente el logotipo oficial (Base64 pre-cargado) de la red social en el centro del QR.

### RF-3: Exportación y Múltiples Formatos
- **RF-3.1**: CUANDO se genera el código exitosamente, el sistema DEBERÁ habilitar la descarga en PNG, SVG y PDF.

### RF-4: Temas de UI (Gestor de Temas)
- **RF-4.1**: CUANDO el usuario presione el interruptor de tema, el sistema DEBERÁ intercambiar los atributos HTML `data-tema` entre `claro` y `oscuro`.
- **RF-4.2**: SIEMPRE el sistema DEBERÁ recordar el último tema usado en el `localStorage`.

### RF-5: Generador Masivo (Bulk)
- **RF-5.1**: CUANDO el usuario suba un archivo `.csv`, el sistema DEBERÁ iterar cada fila, generar un QR en memoria y empaquetarlos todos en un `.zip` utilizando `JSZip`.

### RF-6: Lector de QR (Escáner)
- **RF-6.1**: CUANDO el usuario active el Escáner, el sistema DEBERÁ solicitar permisos de cámara e iniciar el módulo `html5-qrcode`.
- **RF-6.2**: CUANDO la cámara detecte un QR, el sistema DEBERÁ pausar el escáner y mostrar el contenido decodificado en pantalla.
