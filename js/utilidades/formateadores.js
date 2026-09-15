import { TIPOS_QR } from '../configuracion/constantes.js';
import { Validador } from './validador.js';

/**
 * Formateadores de Datos
 * Transforma los objetos en crudo obtenidos del formulario en cadenas formateadas
 * listas para ser codificadas en el QR.
 */

export function formatearDatosQR(tipo, datosCrudos) {
    switch (tipo) {
        case TIPOS_QR.URL:
        case TIPOS_QR.TEXTO:
            return datosCrudos.texto || '';
            
        case TIPOS_QR.WIFI:
            if (datosCrudos.ssid) {
                return `WIFI:S:${datosCrudos.ssid};T:${datosCrudos.encriptacion};P:${datosCrudos.password};;`;
            }
            return '';
            
        case TIPOS_QR.CONTACTO:
            if (datosCrudos.nombre) {
                return `BEGIN:VCARD\nVERSION:3.0\nN:${datosCrudos.nombre}\nTEL:${datosCrudos.telefono}\nEMAIL:${datosCrudos.email}\nEND:VCARD`;
            }
            return '';
            
        case TIPOS_QR.WHATSAPP:
            if (datosCrudos.telefono) {
                const telefonoLimpio = Validador.limpiarTelefono(datosCrudos.telefono);
                const parametroTexto = datosCrudos.mensaje ? `?text=${encodeURIComponent(datosCrudos.mensaje)}` : '';
                return `https://wa.me/${telefonoLimpio}${parametroTexto}`;
            }
            return '';
            
        case TIPOS_QR.EMAIL:
            if (datosCrudos.destinatario && Validador.esEmailValido(datosCrudos.destinatario)) {
                let url = `mailto:${datosCrudos.destinatario}`;
                const params = [];
                if (datosCrudos.asunto) params.push(`subject=${encodeURIComponent(datosCrudos.asunto)}`);
                if (datosCrudos.cuerpo) params.push(`body=${encodeURIComponent(datosCrudos.cuerpo)}`);
                
                if (params.length > 0) {
                    url += `?${params.join('&')}`;
                }
                return url;
            }
            return '';
            
        case TIPOS_QR.GEO:
            if (Validador.sonCoordenadasValidas(datosCrudos.latitud, datosCrudos.longitud)) {
                return `geo:${datosCrudos.latitud},${datosCrudos.longitud}`;
            }
            return '';
            
        case TIPOS_QR.CRIPTO:
            if (datosCrudos.direccion) {
                const monedaStr = datosCrudos.moneda === 'BTC' ? 'bitcoin' : 'ethereum';
                const parametroMonto = datosCrudos.monto ? `?amount=${datosCrudos.monto}` : '';
                return `${monedaStr}:${datosCrudos.direccion}${parametroMonto}`;
            }
            return '';
            
        default:
            return '';
    }
}

/**
 * Obtiene una versión corta y legible de los datos para mostrar en el historial
 */
export function obtenerDatosDeVisualizacion(tipo, datosFormateados) {
    if (!datosFormateados) return '';
    
    switch (tipo) {
        case TIPOS_QR.URL:
        case TIPOS_QR.TEXTO:
            return datosFormateados;
            
        case TIPOS_QR.WHATSAPP:
            const matchWa = datosFormateados.match(/wa\.me\/([0-9+]+)/);
            return matchWa ? `WA: ${matchWa[1]}` : datosFormateados;
            
        case TIPOS_QR.WIFI:
            const matchWifi = datosFormateados.match(/S:(.*?);/);
            return matchWifi ? `WiFi: ${matchWifi[1]}` : datosFormateados;
            
        case TIPOS_QR.CONTACTO:
            const matchVc = datosFormateados.match(/N:(.*?)\n/);
            return matchVc ? `Contacto: ${matchVc[1]}` : datosFormateados;
            
        case TIPOS_QR.EMAIL:
            const matchEmail = datosFormateados.match(/mailto:([^?]+)/);
            return matchEmail ? `Email: ${matchEmail[1]}` : datosFormateados;
            
        case TIPOS_QR.GEO:
            const matchGeo = datosFormateados.match(/geo:(.*)/);
            return matchGeo ? `Mapa: ${matchGeo[1]}` : datosFormateados;
            
        case TIPOS_QR.CRIPTO:
            const parts = datosFormateados.split(':');
            return parts.length >= 2 ? `${parts[0]}: ${parts[1].substring(0,8)}...` : datosFormateados;
            
        default:
            return datosFormateados;
    }
}
