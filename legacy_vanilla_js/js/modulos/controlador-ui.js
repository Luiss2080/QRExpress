import { formatearDatosQR, obtenerDatosDeVisualizacion } from '../utilidades/formateadores.js';
import { Validador } from '../utilidades/validador.js';

export class ControladorUI {
    constructor(generadorQR, gestorHistorial) {
        this.generador = generadorQR;
        this.historial = gestorHistorial;
        this.tipoActual = 'url';
        this.urlLogo = null;
        
        this.tarjetasTipo = document.querySelectorAll('.tarjeta-tipo');
        this.formularios = document.querySelectorAll('.formulario-tipo');
        this.botonGenerar = document.getElementById('boton-generar');
        this.mensajeError = document.getElementById('mensaje-error');
        this.inputLogo = document.getElementById('subida-logo');
        this.contenedorQRMini = document.getElementById('contenedor-qr');
        
        // Pestañas Maestras
        this.tabsMaestras = document.querySelectorAll('.tab-maestra');
        this.seccionesMaestras = document.querySelectorAll('.seccion-maestra');
        
        // Botones Descarga
        this.btnDescargarPNG = document.getElementById('boton-descargar-png');
        this.btnDescargarSVG = document.getElementById('boton-descargar-svg');
        this.btnDescargarPDF = document.getElementById('boton-descargar-pdf');
        
        // Acordeón
        this.acordeonCabecera = document.querySelector('.acordeon-cabecera');
        this.acordeonContenido = document.getElementById('contenido-personalizacion');
        this.acordeon = document.getElementById('acordeon-personalizacion');
        
        // Base64 pre-cargados para Redes Sociales
        this.logosSociales = {
            instagram: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTEzMDZjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iNSIgcnk9IjUiPjwvcmVjdD48cGF0aCBkPSJNMTYgMTEuMzdBNCA0IDAgMSAxIDEyLjYzIDggNCA0IDAgMCAxIDE2IDExLjM3eiI+PC9wYXRoPjxsaW5lIHgxPSIxNy41IiB5MT0iNi41IiB4Mj0iMTcuNTEiIHkyPSI2LjUiPjwvbGluZT48L3N2Zz4=",
            linkedin: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGE2NmMyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE2IDhhNiA2IDAgMCAxIDYgNnY3aC00di03YTIgMiAwIDAgMC00IDB2N2gtNHYtN2E2IDYgMCAwIDEgNi02eiI+PC9wYXRoPjxyZWN0IHg9IjIiIHk9IjkiIHdpZHRoPSI0IiBoZWlnaHQ9IjEyIj48L3JlY3Q+PGNpcmNsZSBjeD0iNCIgY3k9IjQiIHI9IjIiPjwvY2lyY2xlPjwvc3ZnPg==",
            youtube: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmYwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIyLjU0IDYuNDJhMi43OCAyLjc4IDAgMCAwLTEuOTQtMS45NEMxOC44OCA0IDEyIDQgMTIgNHMtNi44OCAwLTguNi40NmEyLjc4IDIuNzggMCAwIDAtMS45NCAxLjk0QzEgOC4xNCAxIDEyIDEgMTJzMCAzLjg2LjQ2IDUuNThhMi43OCAyLjc4IDAgMCAwIDEuOTQgMS45NEM4LjEyIDIwIDEyIDIwIDEyIDIwczYuODggMCA4LjYtLjQ2YTIuNzggMi43OCAwIDAgMCAxLjk0LTEuOTRDMjMgMTUuODYgMjMgMTIgMjMgMTJzMC0zLjg2LS40Ni01LjU4eiI+PC9wYXRoPjxwb2x5Z29uIHBvaW50cz0iOS43NSAxNS4wMiAxNS41IDEyIDkuNzUgOC45OCA5Ljc1IDE1LjAyIj48L3BvbHlnb24+PC9zdmc+"
        };
    }

    inicializar() {
        this.configurarNavegacionMaestra();
        this.configurarSeleccionDeTipos();
        this.configurarSubidaLogo();
        this.configurarBotonGenerar();
        this.configurarDescargas();
        this.configurarAcordeon();
    }

    configurarNavegacionMaestra() {
        this.tabsMaestras.forEach(tab => {
            tab.addEventListener('click', () => {
                this.tabsMaestras.forEach(t => t.classList.remove('activa'));
                this.seccionesMaestras.forEach(s => s.classList.remove('activa'));
                
                tab.classList.add('activa');
                const idSeccion = tab.dataset.seccion;
                const seccion = document.getElementById(idSeccion);
                if(seccion) seccion.classList.add('activa');
            });
        });
    }

    configurarSeleccionDeTipos() {
        this.tarjetasTipo.forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                this.tarjetasTipo.forEach(t => t.classList.remove('activa'));
                tarjeta.classList.add('activa');
                
                this.tipoActual = tarjeta.dataset.tipo;
                this.formularios.forEach(f => f.classList.add('oculto'));
                
                const formularioActivo = document.getElementById(`formulario-${this.tipoActual}`);
                if(formularioActivo) formularioActivo.classList.remove('oculto');
                
                this.mostrarError('');
            });
        });
    }

    configurarSubidaLogo() {
        if(this.inputLogo) {
            this.inputLogo.addEventListener('change', (e) => {
                const archivo = e.target.files[0];
                if (archivo) {
                    const lector = new FileReader();
                    lector.onload = (ev) => this.urlLogo = ev.target.result;
                    lector.readAsDataURL(archivo);
                } else {
                    this.urlLogo = null;
                }
            });
        }
    }

    configurarAcordeon() {
        if (this.acordeonCabecera) {
            this.acordeonCabecera.addEventListener('click', () => {
                this.acordeon.classList.toggle('abierto');
                this.acordeonContenido.classList.toggle('oculto');
            });
        }
    }

    recolectarDatosFormulario() {
        let datosCrudos = {};
        switch(this.tipoActual) {
            case 'url': datosCrudos.texto = document.getElementById('input-url').value.trim(); break;
            case 'social':
                datosCrudos.plataforma = document.getElementById('input-social-plataforma').value;
                datosCrudos.usuario = document.getElementById('input-social-user').value.trim();
                break;
            case 'vcalendar':
                datosCrudos.titulo = document.getElementById('input-vcal-titulo').value.trim();
                datosCrudos.inicio = document.getElementById('input-vcal-inicio').value;
                datosCrudos.fin = document.getElementById('input-vcal-fin').value;
                break;
            case 'wifi':
                datosCrudos.ssid = document.getElementById('input-wifi-ssid').value.trim();
                datosCrudos.password = document.getElementById('input-wifi-password').value.trim();
                break;
            case 'contacto':
                datosCrudos.nombre = document.getElementById('input-vc-nombre').value.trim();
                datosCrudos.telefono = document.getElementById('input-vc-telefono').value.trim();
                break;
            case 'whatsapp':
                datosCrudos.telefono = document.getElementById('input-wa-telefono').value.trim();
                datosCrudos.mensaje = document.getElementById('input-wa-mensaje').value.trim();
                break;
            case 'geo':
                datosCrudos.latitud = document.getElementById('input-geo-lat').value.trim();
                datosCrudos.longitud = document.getElementById('input-geo-lng').value.trim();
                break;
            case 'cripto':
                datosCrudos.moneda = document.getElementById('input-cripto-moneda').value;
                datosCrudos.direccion = document.getElementById('input-cripto-dir').value.trim();
                break;
        }
        return datosCrudos;
    }

    configurarBotonGenerar() {
        this.botonGenerar.addEventListener('click', () => {
            this.mostrarError('');
            
            const datosCrudos = this.recolectarDatosFormulario();
            const datosFormateados = formatearDatosQR(this.tipoActual, datosCrudos);
            
            if (!datosFormateados) {
                this.mostrarError('Faltan campos o el formato es incorrecto.');
                return;
            }

            // Si es Social, inyectar el logo de la red social automáticamente (salvo que el usuario haya subido uno)
            let logoFinal = this.urlLogo;
            if (this.tipoActual === 'social' && !this.urlLogo && datosCrudos.plataforma) {
                logoFinal = this.logosSociales[datosCrudos.plataforma];
            }

            const configuracionUsuario = {
                colorFrente: document.getElementById('color-frente').value,
                colorFondo: document.getElementById('color-fondo').value,
                estiloPuntos: document.getElementById('estilo-puntos').value,
                urlLogo: logoFinal
            };

            try {
                this.generador.contenedor = this.contenedorQRMini;
                this.generador.generar(datosFormateados, configuracionUsuario);
                
                [this.btnDescargarPNG, this.btnDescargarSVG, this.btnDescargarPDF].forEach(b => {
                    if (b) b.classList.remove('oculto');
                });
                
            } catch (error) {
                this.mostrarError('Error generando el código QR.');
            }
        });
    }

    configurarDescargas() {
        const nombreArchivo = () => `QR_${this.tipoActual}_${new Date().getTime()}`;

        if(this.btnDescargarPNG) this.btnDescargarPNG.addEventListener('click', () => this.generador.descargar(nombreArchivo(), 'png'));
        if(this.btnDescargarSVG) this.btnDescargarSVG.addEventListener('click', () => this.generador.descargar(nombreArchivo(), 'svg'));
        
        // Descarga en PDF (Usando jsPDF)
        if(this.btnDescargarPDF) {
            this.btnDescargarPDF.addEventListener('click', async () => {
                if(!this.generador.instanciaQR || typeof jspdf === 'undefined') return;
                
                const dataUrl = await this.generador.instanciaQR.getRawData("png");
                const reader = new FileReader();
                reader.readAsDataURL(dataUrl); 
                reader.onloadend = () => {
                    const base64data = reader.result;
                    const doc = new jspdf.jsPDF();
                    doc.text("Generado con QR Pro Ultimate", 15, 20);
                    doc.addImage(base64data, 'PNG', 20, 30, 170, 170);
                    doc.save(`${nombreArchivo()}.pdf`);
                }
            });
        }
    }

    mostrarError(mensaje) {
        if (mensaje) {
            this.mensajeError.textContent = mensaje;
            this.mensajeError.style.display = 'block';
        } else {
            this.mensajeError.style.display = 'none';
        }
    }
}
