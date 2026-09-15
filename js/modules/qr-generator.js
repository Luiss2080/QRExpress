export class QRGenerator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.qrCode = null;
    }

    generate(data, config) {
        if (!data) throw new Error("Datos vacíos");

        // Aseguramos que si no hay logo, sea null para la librería
        const imageStr = config.logoUrl ? config.logoUrl : "";

        // Usar la librería QRCodeStyling (inyectada en global via CDN)
        this.qrCode = new QRCodeStyling({
            width: 280,
            height: 280,
            type: "svg", // Renderizamos SVG por defecto para mejor calidad en pantalla
            data: data,
            image: imageStr,
            dotsOptions: {
                color: config.colorDark || "#000000",
                type: config.dotStyle || "square" 
            },
            backgroundOptions: {
                color: config.colorLight || "#ffffff",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 5,
                imageSize: 0.4
            }
        });

        this.container.innerHTML = "";
        this.qrCode.append(this.container);
        
        return true;
    }

    download(filename, format) {
        if (this.qrCode) {
            // format puede ser 'png' o 'svg'
            this.qrCode.download({ name: filename, extension: format });
        }
    }
}
