/**
 * Lógica de formato pura para el dashboard de analíticas.
 *
 * NOTA: el dashboard (`src/app/dashboard/page.tsx`) hoy en día no está
 * conectado a ningún backend de tracking real; todos los conteos que
 * alimentan estas funciones son datos de ejemplo hardcodeados en la
 * página. Esta capa solo separa el *formato* (cálculo de porcentajes,
 * formato de miles) para que sea testeable de forma aislada.
 */

export interface DeviceScanCount {
  device: string;
  scans: number;
}

export interface DeviceSharePercentage {
  device: string;
  percentage: number;
}

/**
 * Calcula el porcentaje que representa cada dispositivo sobre el total de
 * escaneos. Redondea al entero más cercano; si el total es 0 (sin datos),
 * devuelve 0% para todos en vez de dividir por cero.
 */
export function computeDeviceShare(counts: DeviceScanCount[]): DeviceSharePercentage[] {
  const total = counts.reduce((sum, c) => sum + c.scans, 0);

  if (total <= 0) {
    return counts.map((c) => ({ device: c.device, percentage: 0 }));
  }

  return counts.map((c) => ({
    device: c.device,
    percentage: Math.round((c.scans / total) * 100),
  }));
}

/** Formatea un conteo de escaneos con separador de miles (3900 -> "3,900"). */
export function formatScanCount(value: number): string {
  return value.toLocaleString("en-US");
}
