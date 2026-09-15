export class GeneradorMasivo {
    constructor() {
        this.inputCsv = document.getElementById('input-csv-masivo');
        this.botonProcesar = document.getElementById('boton-procesar-masivo');
        this.mensajeEstado = document.getElementById('estado-masivo');
        this.config = {
            width: 300,
            height: 300,
            type: 'png'
        };
    }

    inicializar() {
        if (!this.botonProcesar) return;

        this.botonProcesar.addEventListener('click', async () => {
            const archivo = this.inputCsv.files[0];
            if (!archivo) {
                this.mostrarEstado('Por favor, selecciona un archivo CSV primero.', true);
                return;
            }

            this.mostrarEstado('Procesando archivo CSV...', false);

            try {
                const texto = await this.leerArchivo(archivo);
                const lineas = texto.split('\n').filter(linea => linea.trim() !== '');
                
                if (lineas.length === 0) {
                    this.mostrarEstado('El archivo CSV está vacío.', true);
                    return;
                }

                this.mostrarEstado(`Generando ${lineas.length} códigos QR... Por favor espera.`, false);
                await this.procesarYDescargar(lineas);
                
            } catch (error) {
                this.mostrarEstado('Error procesando el archivo: ' + error.message, true);
            }
        });
    }

    leerArchivo(archivo) {
        return new Promise((resolve, reject) => {
            const lector = new FileReader();
            lector.onload = e => resolve(e.target.result);
            lector.onerror = e => reject(e);
            lector.readAsText(archivo);
        });
    }

    async procesarYDescargar(lineas) {
        if (typeof JSZip === 'undefined') {
            this.mostrarEstado('Error: La librería JSZip no está cargada.', true);
            return;
        }

        const zip = new JSZip();
        const carpeta = zip.folder("Codigos_QR_Pro");

        for (let i = 0; i < lineas.length; i++) {
            const datosFila = lineas[i].split(',').map(item => item.trim());
            // Asumimos que la primera columna es el nombre de archivo y la segunda los datos a codificar
            let nombreArchivo = datosFila[0] ? `QR_${datosFila[0]}` : `QR_${i+1}`;
            let datosQR = datosFila[1] || datosFila[0]; // Fallback if only 1 column
            
            if(!datosQR) continue;

            const qrInstancia = new QRCodeStyling({
                ...this.config,
                data: datosQR
            });

            // Generar blob sin renderizar en el DOM
            const blob = await qrInstancia.getRawData("png");
            if (blob) {
                carpeta.file(`${nombreArchivo}.png`, blob);
            }
        }

        this.mostrarEstado('Comprimiendo archivo ZIP...', false);
        
        const contenidoZip = await zip.generateAsync({type: "blob"});
        
        // Trigger download
        const url = URL.createObjectURL(contenidoZip);
        const a = document.createElement("a");
        a.href = url;
        a.download = `QRs_Masivos_${new Date().getTime()}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        this.mostrarEstado(`¡Éxito! Se empaquetaron ${lineas.length} códigos en el archivo ZIP.`, false);
    }

    mostrarEstado(mensaje, esError) {
        if (!this.mensajeEstado) return;
        this.mensajeEstado.textContent = mensaje;
        this.mensajeEstado.style.color = esError ? 'var(--error)' : 'var(--color-primario)';
    }
}
