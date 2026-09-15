import { formatearDatosQR, obtenerDatosDeVisualizacion } from '../utilidades/formateadores.js';

/**
 * Controlador UI
 * Se encarga de manejar todos los eventos del DOM, la recolección de datos
 * y la actualización visual de la interfaz.
 */
export class ControladorUI {
    constructor(generadorQR, gestorHistorial) {
        this.generador = generadorQR;
        this.historial = gestorHistorial;
        this.tipoActual = 'url';
        this.urlLogo = null;
        
        // Elementos del DOM
        this.tarjetasTipo = document.querySelectorAll('.tarjeta-tipo');
        this.formularios = document.querySelectorAll('.formulario-tipo');
        this.botonGenerar = document.getElementById('boton-generar');
        this.botonDescargarPNG = document.getElementById('boton-descargar-png');
        this.botonDescargarSVG = document.getElementById('boton-descargar-svg');
        this.mensajeError = document.getElementById('mensaje-error');
        this.contenedorHistorial = document.getElementById('contenedor-historial');
        this.inputLogo = document.getElementById('subida-logo');
        this.envoltorioQR = document.getElementById('envoltorio-qr');
    }

    /**
     * Inicializa todos los eventos y la interfaz gráfica
     */
    inicializar() {
        this.configurarSeleccionDeTipos();
        this.configurarSubidaLogo();
        this.configurarBotonGenerar();
        this.configurarDescargas();
        this.cargarHistorialVisual();
    }

    configurarSeleccionDeTipos() {
        this.tarjetasTipo.forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                // Actualizar estilos activos
                this.tarjetasTipo.forEach(t => t.classList.remove('activa'));
                tarjeta.classList.add('activa');
                
                // Mostrar formulario correcto
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
                    };
                    lector.readAsDataURL(archivo);
                } else {
                    this.urlLogo = null;
                }
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
                this.mostrarError('Faltan campos obligatorios o el formato (ej. Email/Geo) es incorrecto.');
                return;
            }

            const configuracionUsuario = {
                colorFrente: document.getElementById('color-frente').value,
                colorFondo: document.getElementById('color-fondo').value,
                estiloPuntos: document.getElementById('estilo-puntos').value,
                urlLogo: this.urlLogo
            };

            try {
                this.generador.generar(datosFormateados, configuracionUsuario);
                
                // Efectos visuales de éxito
                if(this.botonDescargarPNG) this.botonDescargarPNG.classList.remove('oculto');
                if(this.botonDescargarSVG) this.botonDescargarSVG.classList.remove('oculto');
                if(this.envoltorioQR) this.envoltorioQR.classList.add('con-qr');

                // Guardar en historial local
                const datosVisibles = obtenerDatosDeVisualizacion(this.tipoActual, datosFormateados);
                this.historial.guardar(this.tipoActual, datosVisibles, configuracionUsuario);
                this.cargarHistorialVisual();
                
            } catch (error) {
                this.mostrarError('Error al generar el QR. El contenido podría ser demasiado extenso.');
                console.error(error);
            }
        });
    }

    configurarDescargas() {
        if(this.botonDescargarPNG) {
            this.botonDescargarPNG.addEventListener('click', () => {
                this.generador.descargar(`QR_${this.tipoActual}_${new Date().getTime()}`, 'png');
            });
        }
        if(this.botonDescargarSVG) {
            this.botonDescargarSVG.addEventListener('click', () => {
                this.generador.descargar(`QR_${this.tipoActual}_${new Date().getTime()}`, 'svg');
            });
        }
    }

    cargarHistorialVisual() {
        const elementosHistorial = this.historial.obtenerTodos();
        this.contenedorHistorial.innerHTML = '';

        if (elementosHistorial.length === 0) {
            this.contenedorHistorial.innerHTML = '<p class="texto-vacio">Aún no has generado ningún código QR.</p>';
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
            this.mensajeError.classList.add('animar-shake');
            setTimeout(() => this.mensajeError.classList.remove('animar-shake'), 500);
        } else {
            this.mensajeError.style.display = 'none';
        }
    }
}
