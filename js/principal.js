import { GeneradorQR } from './modulos/generador-qr.js';
import { GestorHistorial } from './modulos/gestor-historial.js';
import { ControladorUI } from './modulos/controlador-ui.js';

/**
 * Archivo Principal (Entry Point)
 * Orquesta la inicialización de todos los módulos y controla el flujo de la aplicación.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Instanciar módulos base
    const gestorHistorial = new GestorHistorial();
    const generadorQR = new GeneradorQR('contenedor-qr');
    
    // 2. Instanciar controlador de interfaz inyectando dependencias
    const controladorUI = new ControladorUI(generadorQR, gestorHistorial);
    
    // 3. Inicializar la aplicación
    controladorUI.inicializar();
    
    console.log("🚀 Aplicación Generador QR Pro inicializada correctamente.");
});
