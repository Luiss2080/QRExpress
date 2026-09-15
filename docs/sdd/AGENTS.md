# Contexto del Agente para Generador QR (ES)

## Proyecto
Un Generador de Códigos QR "Enterprise" desarrollado íntegramente en Vanilla JavaScript utilizando módulos ES6. 

## Estándares de Codificación
- **Idioma Obligatorio**: Todo el código fuente (nombres de variables, clases, módulos, constantes y comentarios) DEBE estar estrictamente en español. Excepciones permitidas solo para APIs nativas o métodos de librerías de terceros (ej. `.getElementById()`).
- **Arquitectura Limpia**: Separación estricta de responsabilidades:
  - `configuracion/`: Variables y constantes mágicas.
  - `utilidades/`: Funciones puras (validación, parseo).
  - `modulos/`: Clases orientadas a objetos que manejan lógica con estado o manipulación pesada del DOM.
  - `principal.js`: Punto de entrada unificado.

## Reglas de SDD (Spec-Driven Development)
- **Documento Maestro**: `spec.md` es la única fuente de la verdad para el comportamiento del software. 
- **Verificación**: Todo cambio en el código debe alinearse con una Historia de Usuario o Requisito Funcional documentado.
- No añadas "features ocultas". Todo debe ser especificado en notación EARS primero.

## Interfaz Gráfica (UI)
- Priorizar la UX, ofreciendo alertas de error si las validaciones (ej. Email inválido o Coordenada incorrecta) fallan.
- Uso de variables CSS para consistencia de tema.
- Mantener diseño "Glassmorphism" con cuadrículas responsivas.
