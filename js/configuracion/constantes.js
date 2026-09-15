/**
 * Configuración Global y Constantes
 * Contiene todas las claves fijas y selectores principales usados en la aplicación.
 */

export const CONFIGURACION = {
    // Clave para guardar en el localStorage
    CLAVE_HISTORIAL: 'historial_qr_pro_v3',
    
    // Límite de elementos a guardar en el historial
    LIMITE_HISTORIAL: 15,
    
    // Valores por defecto para el código QR
    QR_DEFECTO: {
        ancho: 300,
        alto: 300,
        formatoExportacion: 'svg',
        colorFrente: '#000000',
        colorFondo: '#ffffff',
        estiloPuntos: 'square'
    }
};

export const TIPOS_QR = {
    URL: 'url',
    TEXTO: 'texto',
    WIFI: 'wifi',
    CONTACTO: 'contacto',
    WHATSAPP: 'whatsapp',
    EMAIL: 'email',
    GEO: 'geo',
    CRIPTO: 'cripto'
};
