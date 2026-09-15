import { formatData, getDisplayData } from '../utils/formatters.js';

export class UIController {
    constructor(qrGenerator, historyManager) {
        this.qr = qrGenerator;
        this.history = historyManager;
        this.currentType = 'url';
        this.logoUrl = null;
        
        // Elementos del DOM
        this.tabs = document.querySelectorAll('.tab-btn');
        this.forms = document.querySelectorAll('.type-form');
        this.btnGenerar = document.getElementById('btn-generar');
        this.btnDescargarPNG = document.getElementById('btn-descargar-png');
        this.btnDescargarSVG = document.getElementById('btn-descargar-svg');
        this.errorMsg = document.getElementById('error-msg');
        this.historyContainer = document.getElementById('history-container');
        this.logoInput = document.getElementById('logo-upload');
    }

    init() {
        this.setupTabs();
        this.setupGenerate();
        this.setupDownloads();
        this.setupLogoUpload();
        this.loadHistory();
    }

    setupTabs() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                this.currentType = tab.dataset.type;
                this.forms.forEach(f => f.classList.add('hidden'));
                
                const activeForm = document.getElementById(`form-${this.currentType}`);
                if(activeForm) activeForm.classList.remove('hidden');
                
                this.showError('');
            });
        });
    }

    setupLogoUpload() {
        if(this.logoInput) {
            this.logoInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.logoUrl = event.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    this.logoUrl = null;
                }
            });
        }
    }

    setupGenerate() {
        this.btnGenerar.addEventListener('click', () => {
            this.showError('');
            
            // Recolectar datos según la tab activa
            let rawData = {};
            switch(this.currentType) {
                case 'url':
                    rawData.text = document.getElementById('url-input').value.trim();
                    break;
                case 'text':
                    rawData.text = document.getElementById('text-input').value.trim();
                    break;
                case 'wifi':
                    rawData.ssid = document.getElementById('wifi-ssid').value.trim();
                    rawData.pass = document.getElementById('wifi-password').value.trim();
                    rawData.enc = document.getElementById('wifi-type').value;
                    break;
                case 'vcard':
                    rawData.name = document.getElementById('vc-name').value.trim();
                    rawData.phone = document.getElementById('vc-phone').value.trim();
                    rawData.email = document.getElementById('vc-email').value.trim();
                    break;
                case 'whatsapp':
                    rawData.phone = document.getElementById('wa-phone').value.trim();
                    rawData.message = document.getElementById('wa-msg').value.trim();
                    break;
            }

            const formattedData = formatData(this.currentType, rawData);
            
            if (!formattedData) {
                this.showError('Por favor, completa los campos requeridos para generar el QR.');
                return;
            }

            // Recolectar configuración visual
            const config = {
                colorDark: document.getElementById('color-dark').value,
                colorLight: document.getElementById('color-light').value,
                dotStyle: document.getElementById('dot-style').value,
                logoUrl: this.logoUrl
            };

            try {
                this.qr.generate(formattedData, config);
                
                // Mostrar botones de descarga
                if(this.btnDescargarPNG) this.btnDescargarPNG.classList.remove('hidden');
                if(this.btnDescargarSVG) this.btnDescargarSVG.classList.remove('hidden');
                
                // Activar efecto visual
                const wrapper = document.getElementById('qrcode-wrapper');
                if(wrapper) wrapper.classList.add('has-qr');

                // Guardar en historial
                const displayData = getDisplayData(this.currentType, formattedData);
                this.history.save(this.currentType, displayData, config);
                this.loadHistory();
                
            } catch (error) {
                this.showError('Error al generar el QR. Revisa la consola para más detalles.');
                console.error(error);
            }
        });
    }

    setupDownloads() {
        if(this.btnDescargarPNG) {
            this.btnDescargarPNG.addEventListener('click', () => {
                this.qr.download(`QR_${this.currentType}_${new Date().getTime()}`, 'png');
            });
        }
        if(this.btnDescargarSVG) {
            this.btnDescargarSVG.addEventListener('click', () => {
                this.qr.download(`QR_${this.currentType}_${new Date().getTime()}`, 'svg');
            });
        }
    }

    loadHistory() {
        const historyItems = this.history.getAll();
        this.historyContainer.innerHTML = '';

        if (historyItems.length === 0) {
            this.historyContainer.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1;">No hay historial todavía.</p>';
            return;
        }

        historyItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            
            let typeName = item.type.toUpperCase();
            
            div.innerHTML = `
                <span class="history-type">${typeName}</span>
                <span class="history-data" title="${item.data}">${item.data}</span>
            `;
            
            div.addEventListener('click', () => {
                const tab = document.querySelector(`.tab-btn[data-type="${item.type}"]`);
                if (tab) tab.click();
            });

            this.historyContainer.appendChild(div);
        });
    }

    showError(msg) {
        if (msg) {
            this.errorMsg.textContent = msg;
            this.errorMsg.style.display = 'block';
        } else {
            this.errorMsg.style.display = 'none';
        }
    }
}
