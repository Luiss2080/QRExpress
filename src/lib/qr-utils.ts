import QRCode from "qrcode";

/**
 * Tipos de contenido soportados por el selector visual del generador.
 * NOTA: hoy en día los cinco tipos comparten el mismo campo de texto libre y
 * la misma lógica de generación; solo `url` recibe normalización de
 * protocolo. Ver docs/sdd/spec.md (RF-1) para el comportamiento planeado a
 * futuro por tipo (mailto:, geo:, vCard, plantillas de redes sociales).
 */
export type QrContentType = "url" | "social" | "vcard" | "email" | "location";

export interface QrColorOptions {
  dark: string;
  light: string;
}

export interface QrGenerationOptions {
  color: QrColorOptions;
  width: number;
  margin: number;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

export type QrGenerationResult =
  | { ok: true; dataUrl: string }
  | { ok: false; error: string };

/**
 * Coincide con dominios "desnudos" (sin protocolo) tipo `ejemplo.com`,
 * `www.ejemplo.com/ruta` o `sub.ejemplo.com:8080/x?y=1`. Se usa solo para
 * decidir si conviene anteponer `https://`, no como validador estricto de
 * URLs.
 */
const BARE_DOMAIN_PATTERN =
  /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(?::\d+)?(?:[/?#].*)?$/i;

const HAS_SCHEME_PATTERN = /^[a-z][a-z0-9+.-]*:/i;

/** Elimina espacios en los extremos y colapsa el valor a una cadena segura. */
export function isBlankInput(value: string): boolean {
  return value.trim().length === 0;
}

/**
 * Normaliza el contenido a codificar en el QR antes de generarlo.
 *
 * Bug corregido: cuando el tipo seleccionado es `url` y el usuario escribe
 * un dominio sin protocolo (ej. `ejemplo.com`), el QR se generaba con ese
 * texto literal. Muchos lectores de cámara (iOS/Android) solo ofrecen
 * "abrir enlace" cuando el contenido tiene un esquema reconocible
 * (`https://`, `mailto:`, `tel:`...); sin él, el QR se interpreta como
 * texto plano y el usuario pierde el toque-para-abrir. Esta función
 * antepone `https://` únicamente cuando el valor "parece" un dominio y no
 * trae ya un esquema.
 */
export function normalizeQrInput(rawValue: string, qrType: QrContentType): string {
  const value = rawValue.trim();
  if (!value) return value;
  if (qrType !== "url") return value;
  if (HAS_SCHEME_PATTERN.test(value)) return value;
  if (BARE_DOMAIN_PATTERN.test(value)) return `https://${value}`;
  return value;
}

/**
 * Genera el QR como data URL, capturando cualquier error de la librería
 * `qrcode` (por ejemplo, "The amount of data is too big to be stored in a
 * QR Code" cuando el texto supera la capacidad del nivel de corrección
 * elegido) en vez de dejarlo sin manejar.
 */
export async function generateQrDataUrl(
  text: string,
  options: QrGenerationOptions,
): Promise<QrGenerationResult> {
  try {
    const dataUrl = await QRCode.toDataURL(text, options);
    return { ok: true, dataUrl };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "No se pudo generar el código QR con los datos ingresados.";
    return { ok: false, error: message };
  }
}
