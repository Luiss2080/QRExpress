import { CONFIGURACION } from '../configuracion/constantes.js';

/**
 * Gestor de Historial
 * Clase encargada de administrar el guardado y recuperación de QRs generados
 * utilizando el LocalStorage del navegador.
 */
export class GestorHistorial {
    constructor() {
        this.historial = JSON.parse(localStorage.getItem(CONFIGURACION.CLAVE_HISTORIAL) || '[]');
    }

    /**
     * Guarda una nueva entrada en el historial.
     * @param {string} tipo - El tipo de QR (url, email, etc.)
     * @param {string} datosVisualizacion - Texto legible para mostrar al usuario
     * @param {Object} configuracion - Colores y estilos utilizados
     */
    guardar(tipo, datosVisualizacion, configuracion) {
        if (!datosVisualizacion) return;
        
        // Evitar duplicados exactos consecutivos para no saturar el historial
        if (this.historial.length > 0 && 
            this.historial[0].datos === datosVisualizacion && 
            this.historial[0].tipo === tipo) {
            return;
        }

        const entrada = {
            tipo: tipo,
            datos: datosVisualizacion,
            configuracion: configuracion,
            fecha: new Date().getTime()
        };

        this.historial.unshift(entrada);
        
        // Mantener solo hasta el límite permitido
        this.historial = this.historial.slice(0, CONFIGURACION.LIMITE_HISTORIAL);
        localStorage.setItem(CONFIGURACION.CLAVE_HISTORIAL, JSON.stringify(this.historial));
    }

    /**
     * Obtiene todo el historial guardado.
     * @returns {Array} Arreglo de objetos del historial
     */
    obtenerTodos() {
        return this.historial;
    }
}
