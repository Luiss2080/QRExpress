# Contexto del Agente para Generador QR Comercial

## Proyecto
Un generador de códigos QR moderno, funcional y estético desarrollado con Vanilla JS, HTML y CSS. No requiere backend, genera los códigos del lado del cliente utilizando `qrcode.js`.

## Reglas SDD
- **La especificación es la única fuente de verdad**. Si un comportamiento no está en `spec.md`, no se debe implementar.
- Cualquier cambio en la lógica o adición de features debe primero especificarse en `spec.md` usando notación EARS.
- El código fuente (`index.html`, `script.js`, `styles.css`) debe reflejar fielmente la especificación.
- Todos los commits/cambios deben ser verificados contra los Criterios de Aceptación/Finalización en la especificación.

## Estilo y Arquitectura
- **UI/UX**: Premium, Glassmorphism, animaciones sutiles, paletas de colores armónicas.
- **Tecnologías**: HTML5 semántico, CSS3 moderno (Variables, Flexbox/Grid), JavaScript ES6+.
- **Dependencias**: Se permite el uso de librerías ligeras vía CDN (ej. `qrcode.js` para generación de imágenes).
