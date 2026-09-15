/**
 * Validador de Datos
 * Lógica pura para verificar que los datos ingresados son correctos antes de generar el QR.
 */

export class Validador {
    
    /**
     * Valida si un email tiene un formato correcto.
     * @param {string} email 
     * @returns {boolean}
     */
    static esEmailValido(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida si una URL tiene un formato básico correcto.
     * @param {string} url 
     * @returns {boolean}
     */
    static esUrlValida(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * Valida coordenadas de latitud y longitud.
     * @param {string} lat 
     * @param {string} lng 
     * @returns {boolean}
     */
    static sonCoordenadasValidas(lat, lng) {
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);
        if (isNaN(latNum) || isNaN(lngNum)) return false;
        if (latNum < -90 || latNum > 90) return false;
        if (lngNum < -180 || lngNum > 180) return false;
        return true;
    }

    /**
     * Limpia un número de teléfono de caracteres especiales (mantiene el + inicial).
     * @param {string} telefono 
     * @returns {string}
     */
    static limpiarTelefono(telefono) {
        // Remover todo excepto números y el signo +
        return telefono.replace(/[^\d+]/g, '');
    }
}
