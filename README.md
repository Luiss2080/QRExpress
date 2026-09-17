<div align="center">
  <img src="https://img.icons8.com/nolan/96/qr-code.png" alt="QRExpress" width="100"/>

  # ⚡ QRExpress

  **Generador de códigos QR en tiempo real, construido con Next.js.**

  [![Estado](https://img.shields.io/badge/Estado-En%20desarrollo%20(MVP)-yellow?style=for-the-badge)](#)
  [![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](#)
  [![Metodología](https://img.shields.io/badge/Dise%C3%B1ado_con-SDD-8b5cf6?style=for-the-badge)](#)
</div>

<br/>

**QRExpress** genera códigos QR a partir de texto o URLs directamente en el
navegador, con vista previa instantánea, personalización de color y logo,
y un panel de analíticas de ejemplo. Está pensado para quien necesita un
generador rápido y sin backend para casos simples (un enlace, un texto);
**no** es todavía la plataforma SaaS completa que versiones anteriores de
este README describían — ver la sección "Lo que todavía no existe" abajo
para una lista honesta de lo que falta.

Construido siguiendo [SDD (Spec-Driven Development)](docs/sdd/spec.md):
la especificación en `docs/sdd/spec.md` documenta el alcance completo
planeado (incluyendo lo que aún no está implementado); este README solo
describe lo que el código bajo `src/app/` realmente hace hoy.

---

## Características

Verificado contra el código en `src/app/` y `src/lib/`:

- **Generación de QR en tiempo real**: al escribir en el campo "Destino",
  el QR de la vista previa se regenera automáticamente (usa la librería
  [`qrcode`](https://www.npmjs.com/package/qrcode)).
- **Normalización de URL**: si escribes un dominio sin protocolo (p. ej.
  `ejemplo.com`) y el tipo seleccionado es "Enlace URL", se antepone
  `https://` automáticamente para que el QR sea un enlace que el teléfono
  pueda abrir con un toque, en vez de texto plano.
- **Manejo de errores visible**: un campo vacío ya no genera en silencio
  un QR de ejemplo, y un texto demasiado largo para el nivel de
  corrección de errores elegido (la librería `qrcode` lo rechaza) muestra
  un mensaje de error accesible (`role="alert"`) junto al campo y una
  notificación, en vez de fallar sin avisar.
- **Selector de tipo de contenido** (Enlace URL / Redes Sociales / Correo
  / Ubicación): existe visualmente, pero hoy los cuatro comparten la
  misma lógica de texto libre — solo el tipo "Enlace URL" normaliza el
  protocolo. Todavía no genera `mailto:`, `geo:`, vCard ni plantillas
  específicas de red social; eso está en `docs/sdd/spec.md` (RF-1) como
  trabajo pendiente.
- **Personalización de color**: 4 colores predefinidos aplicados en vivo
  a la vista previa y a la imagen descargada.
- **Subida de logotipo (solo vista previa)**: puedes subir una imagen que
  se superpone visualmente en el centro de la vista previa del QR. **No**
  se incrusta todavía en el archivo PNG que se descarga — es una
  limitación conocida, no un bug oculto.
- **Descarga en PNG**: funcional.
- **Panel de analíticas** (`/dashboard`): gráficos con
  [Recharts](https://recharts.org/) (barras de escaneos, reparto por
  dispositivo). Usa **datos de ejemplo hardcodeados**, no está conectado
  a ningún backend de tracking real.
- **Manual de uso** (`/ayuda`): página estática con la guía de uso.
- **Accesibilidad**: selector de herramientas con roles de pestaña ARIA,
  campos con `<label>` asociado, swatches de color con nombre accesible,
  y foco gestionado (incluye cierre con Escape) en el modal de ajustes
  avanzados.

### Lo que todavía no existe (y versiones anteriores de este README afirmaban)

Este proyecto tuvo un README previo que lo describía como "QR Pro
Ultimate (SaaS Edition)" en estado **"Producción"**. Verificado contra el
código actual, eso no es preciso:

- ❌ **Sin estado de "Producción"**: es un MVP en desarrollo activo, sin
  autenticación, sin backend propio y sin persistencia de datos del
  usuario.
- ❌ **Sin escáner por webcam**: la pestaña "Escáner Web" es una pantalla
  de marcador de posición ("Cámara no inicializada"); no hay integración
  de `getUserMedia` ni ningún decodificador de QR.
- ❌ **Sin generación masiva CSV → ZIP**: la pestaña "Generación Masiva"
  es un marcador de posición sin lógica de lectura de CSV. `jszip` está
  en `package.json` pero no se usa en ningún archivo de `src/`.
- ❌ **Sin exportación a SVG o PDF**: solo PNG está implementado; los
  botones de SVG/PDF están deshabilitados y marcados "próximamente".
- ❌ **Logo no incrustado en la descarga**: ver arriba.
- ❌ **Sin modo oscuro alcanzable**: `globals.css` define variables para
  una clase `.dark`, pero no hay ningún interruptor en la interfaz ni
  integración con `next-themes` para activarla; hoy es CSS sin usar.
- ❌ **Analíticas de ejemplo, no reales**: ver "Panel de analíticas"
  arriba.

---

## Cómo usar

1. Ejecuta la app (ver instalación abajo) y abre `http://localhost:3000`.
2. Escribe el contenido que quieres codificar en "Destino"; la vista
   previa se actualiza sola.
3. Ajusta el color desde los círculos de "Color Principal", o sube un
   logo desde "Ajustes Avanzados" (recuerda: solo se ve en la vista
   previa, no en el PNG descargado todavía).
4. Pulsa "Descargar PNG".
5. El manual interactivo está en `/ayuda`; la especificación técnica en
   [`docs/sdd/spec.md`](docs/sdd/spec.md) y
   [`docs/MANUAL_DE_USO.md`](docs/MANUAL_DE_USO.md).

## Instalación y uso local

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
# -> http://localhost:3000

# 3. Compilar para producción (valida tipos de TypeScript y build de Next.js)
npm run build

# 4. Lint
npm run lint

# 5. Tests unitarios
npm test
```

Requiere Node.js 24.x (LTS) o superior — es lo que exige `@types/node` en
`devDependencies` y lo que valida el workflow de CI.

## Tecnologías

- **Next.js 16.3.5** (App Router) + **React 19** + **TypeScript**
- **TailwindCSS 4** para estilos
- **Framer Motion** para animaciones
- **[`qrcode`](https://www.npmjs.com/package/qrcode)** para generar los QR
- **Recharts** para los gráficos del dashboard (con datos de ejemplo)
- **sonner** para notificaciones toast (anuncia sus mensajes vía
  `aria-live` de forma nativa)
- **lucide-react** para iconografía
- **Vitest** + **Testing Library** + **jsdom** para tests unitarios
- **jszip** está declarado como dependencia para la futura función de
  generación masiva, pero aún no se usa en el código

## Tests

```bash
npm test
```

Cubre la lógica pura extraída a `src/lib/` (no las páginas de React en
sí, que están fuertemente acopladas a Framer Motion/Tailwind y no
aportan mucho valor probadas como snapshots):

- `src/lib/qr-utils.ts`: normalización de URL, detección de entrada
  vacía, y generación de QR con manejo de errores de capacidad (probado
  contra la librería `qrcode` real, no un mock).
- `src/lib/dashboard-utils.ts`: cálculo de porcentajes por dispositivo y
  formato de números para el dashboard.

CI (`.github/workflows/ci.yml`) ejecuta `npm run lint`, `npm test` y
`npm run build` en cada push/PR a `main`.

## Licencia

No hay archivo `LICENSE` en la raíz de este repositorio. El directorio
histórico `legacy_vanilla_js/` sí trae su propia licencia MIT (Luis
Rocha, 2026), pero esa licencia cubre únicamente ese subdirectorio, no la
aplicación Next.js actual. Si vas a publicar este repositorio, decide y
agrega una licencia a nivel raíz.
