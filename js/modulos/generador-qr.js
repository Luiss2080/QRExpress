import { CONFIGURACION } from '../configuracion/constantes.js';

/**
 * Generador QR
 * Capa de abstracción que se comunica con la librería `qr-code-styling`.
 */
export class GeneradorQR {
    
    /**
     * @param {string} idContenedor - El ID del div HTML donde se renderizará el QR
     */
    constructor(idContenedor) {
        this.contenedor = document.getElementById(idContenedor);
        this.instanciaQR = null;
    }

    /**
     * Genera e inyecta el código QR en el DOM.
     * @param {string} datos - La cadena formateada a encodear
     * @param {Object} configuracionUsuario - Objeto con colores, logo y formas
     * @returns {boolean} true si tuvo éxito
     */
    generar(datos, configuracionUsuario) {
        if (!datos) throw new Error("Los datos para generar el QR están vacíos");

        // Si no hay logo definido por el usuario, enviamos string vacío a la librería
        const imagenLogo = configuracionUsuario.urlLogo ? configuracionUsuario.urlLogo : "";

        // Inicializamos la librería
        this.instanciaQR = new QRCodeStyling({
            width: CONFIGURACION.QR_DEFECTO.ancho,
            height: CONFIGURACION.QR_DEFECTO.alto,
            type: CONFIGURACION.QR_DEFECTO.formatoExportacion,
            data: datos,
            image: imagenLogo,
            dotsOptions: {
                color: configuracionUsuario.colorFrente || CONFIGURACION.QR_DEFECTO.colorFrente,
                type: configuracionUsuario.estiloPuntos || CONFIGURACION.QR_DEFECTO.estiloPuntos
            },
            backgroundOptions: {
                color: configuracionUsuario.colorFondo || CONFIGURACION.QR_DEFECTO.colorFondo,
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 5,
                imageSize: 0.4
            }
        });

        // Limpiar contenedor previo e inyectar nuevo QR
        this.contenedor.innerHTML = "";
        this.instanciaQR.append(this.contenedor);
        
        return true;
    }

    /**
     * Inicia la descarga del QR actual generado.
     * @param {string} nombreArchivo - Nombre sin extensión
     * @param {string} formatoExtension - "png" o "svg"
     */
    descargar(nombreArchivo, formatoExtension) {
        if (this.instanciaQR) {
            this.instanciaQR.download({ name: nombreArchivo, extension: formatoExtension });
        }
    }
}
