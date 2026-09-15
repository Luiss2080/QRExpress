import { formatearDatosQR, obtenerDatosDeVisualizacion } from '../utilidades/formateadores.js';
import { Validador } from '../utilidades/validador.js';

export class ControladorUI {
    constructor(generadorQR, gestorHistorial) {
        this.generador = generadorQR;
        this.historial = gestorHistorial;
        this.tipoActual = 'url';
        this.urlLogo = null;
        
        // Elementos del DOM Principales
        this.tarjetasTipo = document.querySelectorAll('.tarjeta-tipo');
        this.formularios = document.querySelectorAll('.formulario-tipo');
        this.botonGenerar = document.getElementById('boton-generar');
        this.mensajeError = document.getElementById('mensaje-error');
        this.contenedorHistorial = document.getElementById('contenedor-historial');
        this.inputLogo = document.getElementById('subida-logo');
        this.envoltorioQR = document.getElementById('envoltorio-qr');
        this.contenedorQRMini = document.getElementById('contenedor-qr');
        
        // Botones de descarga y vista previa
        this.btnDescargarPNG = document.getElementById('boton-descargar-png');
        this.btnDescargarSVG = document.getElementById('boton-descargar-svg');
        this.btnVerGrande = document.getElementById('boton-ver-grande');
        
        // Modal
        this.modal = document.getElementById('modal-qr');
        this.btnCerrarModal = document.getElementById('btn-cerrar-modal');
        this.contenedorQRModal = document.getElementById('contenedor-qr-modal');
        this.modalBtnPng = document.getElementById('modal-descargar-png');
        this.modalBtnSvg = document.getElementById('modal-descargar-svg');
        
        // Acordeón
        this.acordeonCabecera = document.querySelector('.acordeon-cabecera');
        this.acordeonContenido = document.getElementById('contenido-personalizacion');
        this.acordeon = document.getElementById('acordeon-personalizacion');
    }

    inicializar() {
        this.configurarSeleccionDeTipos();
        this.configurarSubidaLogo();
        this.configurarBotonGenerar();
        this.configurarDescargas();
        this.configurarModal();
        this.configurarAcordeon();
        this.cargarHistorialVisual();
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
                    lector.onload = (evento) => {
                        this.urlLogo = evento.target.result;
                        document.querySelector('.upload-text').textContent = archivo.name;
                    };
                    lector.readAsDataURL(archivo);
                } else {
                    this.urlLogo = null;
                    document.querySelector('.upload-text').textContent = 'Haz clic o arrastra una imagen';
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
            case 'url':
                datosCrudos.texto = document.getElementById('input-url').value.trim();
                break;
            case 'texto':
                datosCrudos.texto = document.getElementById('input-texto').value.trim();
                break;
            case 'wifi':
                datosCrudos.ssid = document.getElementById('input-wifi-ssid').value.trim();
                datosCrudos.password = document.getElementById('input-wifi-password').value.trim();
                datosCrudos.encriptacion = document.getElementById('input-wifi-tipo').value;
                break;
            case 'contacto':
                datosCrudos.nombre = document.getElementById('input-vc-nombre').value.trim();
                datosCrudos.telefono = document.getElementById('input-vc-telefono').value.trim();
                datosCrudos.email = document.getElementById('input-vc-email').value.trim();
                break;
            case 'whatsapp':
                datosCrudos.telefono = document.getElementById('input-wa-telefono').value.trim();
                datosCrudos.mensaje = document.getElementById('input-wa-mensaje').value.trim();
                break;
            case 'email':
                datosCrudos.destinatario = document.getElementById('input-email-dest').value.trim();
                datosCrudos.asunto = document.getElementById('input-email-asunto').value.trim();
                datosCrudos.cuerpo = document.getElementById('input-email-cuerpo').value.trim();
                break;
            case 'geo':
                datosCrudos.latitud = document.getElementById('input-geo-lat').value.trim();
                datosCrudos.longitud = document.getElementById('input-geo-lng').value.trim();
                break;
            case 'cripto':
                datosCrudos.moneda = document.getElementById('input-cripto-moneda').value;
                datosCrudos.direccion = document.getElementById('input-cripto-dir').value.trim();
                datosCrudos.monto = document.getElementById('input-cripto-monto').value.trim();
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
                this.mostrarError('Revisa que los campos obligatorios estén llenos y los formatos sean válidos.');
                return;
            }

            const configuracionUsuario = {
                colorFrente: document.getElementById('color-frente').value,
                colorFondo: document.getElementById('color-fondo').value,
                estiloPuntos: document.getElementById('estilo-puntos').value,
                urlLogo: this.urlLogo
            };

            try {
                // Generar en miniatura (panel derecho)
                this.generador.contenedor = this.contenedorQRMini;
                this.generador.generar(datosFormateados, configuracionUsuario);
                
                // Mostrar botones
                [this.btnDescargarPNG, this.btnDescargarSVG, this.btnVerGrande].forEach(b => {
                    if (b) b.classList.remove('oculto');
                });
                
                // Guardar en historial
                const datosVisibles = obtenerDatosDeVisualizacion(this.tipoActual, datosFormateados);
                this.historial.guardar(this.tipoActual, datosVisibles, configuracionUsuario);
                this.cargarHistorialVisual();
                
            } catch (error) {
                this.mostrarError('Ocurrió un error al generar el código QR.');
                console.error(error);
            }
        });
    }

    configurarModal() {
        if (this.btnVerGrande) {
            this.btnVerGrande.addEventListener('click', () => {
                if(this.generador.instanciaQR) {
                    this.generador.contenedor = this.contenedorQRModal;
                    this.contenedorQRModal.innerHTML = '';
                    this.generador.instanciaQR.append(this.contenedorQRModal);
                    this.modal.classList.remove('oculto');
                }
            });
        }
        
        if (this.btnCerrarModal) {
            this.btnCerrarModal.addEventListener('click', () => {
                this.modal.classList.add('oculto');
                // Restaurar QR al contenedor original
                this.generador.contenedor = this.contenedorQRMini;
                this.contenedorQRMini.innerHTML = '';
                this.generador.instanciaQR.append(this.contenedorQRMini);
            });
        }
        
        // Cerrar modal al hacer click fuera
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.btnCerrarModal.click();
        });
    }

    configurarDescargas() {
        const descargarPng = () => this.generador.descargar(`QR_${this.tipoActual}_${new Date().getTime()}`, 'png');
        const descargarSvg = () => this.generador.descargar(`QR_${this.tipoActual}_${new Date().getTime()}`, 'svg');

        if(this.btnDescargarPNG) this.btnDescargarPNG.addEventListener('click', descargarPng);
        if(this.btnDescargarSVG) this.btnDescargarSVG.addEventListener('click', descargarSvg);
        if(this.modalBtnPng) this.modalBtnPng.addEventListener('click', descargarPng);
        if(this.modalBtnSvg) this.modalBtnSvg.addEventListener('click', descargarSvg);
    }

    cargarHistorialVisual() {
        const elementosHistorial = this.historial.obtenerTodos();
        this.contenedorHistorial.innerHTML = '';

        if (elementosHistorial.length === 0) {
            this.contenedorHistorial.innerHTML = '<p class="texto-vacio">No hay historial todavía.</p>';
            return;
        }

        elementosHistorial.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item-historial';
            
            const nombreTipo = item.tipo.toUpperCase();
            
            div.innerHTML = `
                <span class="tipo-historial">${nombreTipo}</span>
                <span class="datos-historial" title="${item.datos}">${item.datos}</span>
            `;
            
            div.addEventListener('click', () => {
                const tarjeta = document.querySelector(`.tarjeta-tipo[data-tipo="${item.tipo}"]`);
                if (tarjeta) {
                    tarjeta.click();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });

            this.contenedorHistorial.appendChild(div);
        });
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
