import { GeneradorQR } from './modulos/generador-qr.js';
import { GestorHistorial } from './modulos/gestor-historial.js';
import { ControladorUI } from './modulos/controlador-ui.js';
import { GestorTemas } from './modulos/gestor-temas.js';
import { GeneradorMasivo } from './modulos/generador-masivo.js';
import { LectorQR } from './modulos/lector-qr.js';

/**
 * Archivo Principal (Entry Point)
 * Inicializa todos los módulos (Ultimate Edition)
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Tema primero para evitar parpadeos
    const gestorTemas = new GestorTemas();
    
    const gestorHistorial = new GestorHistorial();
    const generadorQR = new GeneradorQR('contenedor-qr');
    const controladorUI = new ControladorUI(generadorQR, gestorHistorial);
    controladorUI.inicializar();
    
    const generadorMasivo = new GeneradorMasivo();
    generadorMasivo.inicializar();
    
    const lectorQR = new LectorQR('contenedor-video-qr');
    lectorQR.inicializar();
    
    console.log("🚀 Aplicación QR Pro Ultimate inicializada correctamente.");
});
