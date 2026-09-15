import { TIPOS_QR } from '../configuracion/constantes.js';

export function formatearDatosQR(tipo, datosCrudos) {
    switch (tipo) {
        case 'url':
        case 'texto':
            return datosCrudos.texto || '';
            
        case 'social':
            if (datosCrudos.usuario) {
                // Quitar @ inicial si existe
                const usr = datosCrudos.usuario.replace('@', '');
                switch (datosCrudos.plataforma) {
                    case 'instagram': return `https://instagram.com/${usr}`;
                    case 'linkedin': return `https://linkedin.com/in/${usr}`;
                    case 'youtube': return `https://youtube.com/@${usr}`;
                }
            }
            return '';

        case 'vcalendar':
            if (datosCrudos.titulo && datosCrudos.inicio && datosCrudos.fin) {
                // Formato básico iCal
                const formatoFecha = (fechaHtml) => fechaHtml.replace(/[-:]/g, '').replace('T', 'T') + '00Z';
                const inicioFormato = formatoFecha(datosCrudos.inicio);
                const finFormato = formatoFecha(datosCrudos.fin);
                return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${datosCrudos.titulo}\nDTSTART:${inicioFormato}\nDTEND:${finFormato}\nEND:VEVENT\nEND:VCALENDAR`;
            }
            return '';
            
        case 'wifi':
            if (datosCrudos.ssid) {
                return `WIFI:S:${datosCrudos.ssid};T:WPA;P:${datosCrudos.password};;`;
            }
            return '';
            
        case 'contacto':
            if (datosCrudos.nombre) {
                return `BEGIN:VCARD\nVERSION:3.0\nN:${datosCrudos.nombre}\nTEL:${datosCrudos.telefono}\nEND:VCARD`;
            }
            return '';
            
        case 'whatsapp':
            if (datosCrudos.telefono) {
                const telefonoLimpio = datosCrudos.telefono.replace(/[^\d+]/g, '');
                const parametroTexto = datosCrudos.mensaje ? `?text=${encodeURIComponent(datosCrudos.mensaje)}` : '';
                return `https://wa.me/${telefonoLimpio}${parametroTexto}`;
            }
            return '';
            
        case 'geo':
            if (datosCrudos.latitud && datosCrudos.longitud) {
                return `geo:${datosCrudos.latitud},${datosCrudos.longitud}`;
            }
            return '';
            
        case 'cripto':
            if (datosCrudos.direccion) {
                const monedaStr = datosCrudos.moneda === 'BTC' ? 'bitcoin' : 'ethereum';
                return `${monedaStr}:${datosCrudos.direccion}`;
            }
            return '';
            
        default:
            return '';
    }
}

export function obtenerDatosDeVisualizacion(tipo, datosFormateados) {
    return datosFormateados; // Simplificado
}
