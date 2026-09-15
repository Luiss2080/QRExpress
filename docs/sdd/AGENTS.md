# Contexto del Agente para Generador QR Comercial (Pro)

## Proyecto
Generador QR de grado comercial "Pro" con arquitectura modular en el Frontend. No requiere backend. Utiliza `qr-code-styling` para soportar logos, formas personalizadas y múltiples formatos de exportación (SVG, PNG).

## Arquitectura y Módulos (ES6)
- El código JavaScript debe seguir un patrón modular puro.
- **Punto de Entrada**: `js/app.js` orquesta los controladores.
- **Módulos**: `js/modules/` contiene las responsabilidades aisladas (UI, Generador, Historial).
- **Utilidades**: `js/utils/` contiene funciones puras (formateo).
- Los módulos se comunican preferiblemente mediante inyección de dependencias o sistema de eventos/callbacks, evitando el acoplamiento duro.

## Reglas SDD
- **La especificación es la única fuente de verdad**. Si un comportamiento no está en `docs/sdd/spec.md`, no se debe implementar.
- Cualquier adición de feature debe primero especificarse usando notación EARS.
- Todos los commits/cambios deben ser verificados contra los Criterios de Finalización en la especificación.

## UI/UX y Tecnologías
- **Estética**: Premium, Glassmorphism avanzado, animaciones suaves, gradientes y micro-interacciones.
- **Tecnologías**: HTML5 semántico, CSS3 moderno (Variables, Flexbox/Grid, Animaciones clave), JavaScript ES6+ (Módulos).
- **Dependencias Permitidas**: Librerías CDN ligeras (`qr-code-styling`). No se permite jQuery.
