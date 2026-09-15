// Variables Globales
let currentType = 'url';
let qrCodeInstance = null;
const HISTORY_KEY = 'qr_pro_history';

// Elementos del DOM
const tabs = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.type-form');
const btnGenerar = document.getElementById('btn-generar');
const btnDescargar = document.getElementById('btn-descargar');
const qrContainer = document.getElementById('qrcode');
const errorMsg = document.getElementById('error-msg');
const historyContainer = document.getElementById('history-container');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    setupTabs();
    setupGenerate();
    setupDownload();
});

// Configuración de Tabs (RF-1)
function setupTabs() {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Activar botón
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Mostrar formulario correspondiente
            currentType = tab.dataset.type;
            forms.forEach(f => f.classList.add('hidden'));
            document.getElementById(`form-${currentType}`).classList.remove('hidden');
            
            // Limpiar errores
            showError('');
        });
    });
}

// Generación de QR (RF-2)
function setupGenerate() {
    btnGenerar.addEventListener('click', () => {
        let qrData = '';
        showError('');

        // Obtener datos según el tipo (RF-1.1, RF-1.2, RF-1.3)
        switch(currentType) {
            case 'url':
                qrData = document.getElementById('url-input').value.trim();
                break;
            case 'text':
                qrData = document.getElementById('text-input').value.trim();
                break;
            case 'wifi':
                const ssid = document.getElementById('wifi-ssid').value.trim();
                const pass = document.getElementById('wifi-password').value.trim();
                const enc = document.getElementById('wifi-type').value;
                if(ssid) {
                    qrData = `WIFI:S:${ssid};T:${enc};P:${pass};;`;
                }
                break;
            case 'vcard':
                const name = document.getElementById('vc-name').value.trim();
                const phone = document.getElementById('vc-phone').value.trim();
                const email = document.getElementById('vc-email').value.trim();
                if(name) {
                    qrData = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
                }
                break;
        }

        // Validación de datos vacíos (RF-2.3)
        if (!qrData) {
            showError('Por favor, completa los campos requeridos para generar el QR.');
            return;
        }

        // Obtener colores (RF-2.1)
        const colorDark = document.getElementById('color-dark').value;
        const colorLight = document.getElementById('color-light').value;

        // Limpiar contenedor
        qrContainer.innerHTML = '';

        // Generar QR (RF-2.2)
        try {
            qrCodeInstance = new QRCode(qrContainer, {
                text: qrData,
                width: 256,
                height: 256,
                colorDark : colorDark,
                colorLight : colorLight,
                correctLevel : QRCode.CorrectLevel.H
            });

            // Mostrar botón de descarga (RF-3.1)
            btnDescargar.classList.remove('hidden');
            
            // Guardar en historial (RF-4.1)
            saveToHistory(currentType, getDisplayData(currentType, qrData));
            
        } catch (error) {
            showError('Error al generar el QR. El texto podría ser demasiado largo.');
        }
    });
}

// Configurar Descarga (RF-3.2)
function setupDownload() {
    btnDescargar.addEventListener('click', () => {
        const img = qrContainer.querySelector('img');
        if (img) {
            const url = img.src;
            const a = document.createElement('a');
            a.href = url;
            a.download = `QR_${currentType}_${new Date().getTime()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            // Fallback para canvas si qrcode.js lo usa
            const canvas = qrContainer.querySelector('canvas');
            if (canvas) {
                const url = canvas.toDataURL("image/png");
                const a = document.createElement('a');
                a.href = url;
                a.download = `QR_${currentType}_${new Date().getTime()}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
    });
}

// Historial (RF-4)
function saveToHistory(type, displayData) {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    
    // Evitar duplicados consecutivos
    if (history.length > 0 && history[0].data === displayData) return;

    history.unshift({
        type: type,
        data: displayData,
        timestamp: new Date().getTime()
    });

    // Mantener máximo 10 elementos
    history = history.slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    historyContainer.innerHTML = '';

    if (history.length === 0) {
        historyContainer.innerHTML = '<p style="color:var(--text-secondary); grid-column:1/-1;">No hay historial todavía.</p>';
        return;
    }

    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        let typeName = '';
        switch(item.type) {
            case 'url': typeName = 'Enlace'; break;
            case 'text': typeName = 'Texto'; break;
            case 'wifi': typeName = 'WiFi'; break;
            case 'vcard': typeName = 'Contacto'; break;
        }

        div.innerHTML = `
            <span class="history-type">${typeName}</span>
            <span class="history-data" title="${item.data}">${item.data}</span>
        `;
        
        // Cargar historial al hacer clic (RF-4.3)
        div.addEventListener('click', () => {
            // Activar la tab correspondiente
            const tab = document.querySelector(`.tab-btn[data-type="${item.type}"]`);
            if (tab) tab.click();
        });

        historyContainer.appendChild(div);
    });
}

// Utilidades
function showError(msg) {
    if (msg) {
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
    } else {
        errorMsg.style.display = 'none';
    }
}

function getDisplayData(type, rawData) {
    if (type === 'url' || type === 'text') return rawData;
    if (type === 'wifi') {
        const match = rawData.match(/S:(.*?);/);
        return match ? `Red: ${match[1]}` : rawData;
    }
    if (type === 'vcard') {
        const match = rawData.match(/N:(.*?)\n/);
        return match ? `Contacto: ${match[1]}` : rawData;
    }
    return rawData;
}
