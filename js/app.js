import { UIController } from './modules/ui-controller.js';
import { QRGenerator } from './modules/qr-generator.js';
import { HistoryManager } from './modules/history-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar dependencias principales
    const historyManager = new HistoryManager();
    const qrGenerator = new QRGenerator('qrcode');
    
    // Inyectar dependencias al controlador de Interfaz
    const uiController = new UIController(qrGenerator, historyManager);
    
    // Iniciar la aplicación
    uiController.init();
});
