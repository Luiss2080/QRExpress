export class LectorQR {
    constructor(idContenedorVista) {
        this.idContenedorVista = idContenedorVista;
        this.html5QrCode = null;
        this.botonIniciar = document.getElementById('boton-iniciar-escaner');
        this.botonDetener = document.getElementById('boton-detener-escaner');
        this.resultadoEscaneo = document.getElementById('resultado-escaneo');
        this.textoDecodificado = document.getElementById('texto-decodificado');
        this.enEscaneo = false;
    }

    inicializar() {
        if (!this.botonIniciar || typeof Html5Qrcode === 'undefined') return;

        this.html5QrCode = new Html5Qrcode(this.idContenedorVista);

        this.botonIniciar.addEventListener('click', () => {
            this.iniciarEscaneo();
        });

        if (this.botonDetener) {
            this.botonDetener.addEventListener('click', () => {
                this.detenerEscaneo();
            });
        }
    }

    async iniciarEscaneo() {
        if (this.enEscaneo) return;

        try {
            this.resultadoEscaneo.classList.add('oculto');
            this.botonIniciar.classList.add('oculto');
            if (this.botonDetener) this.botonDetener.classList.remove('oculto');
            
            // Configurar el lector
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
            
            await this.html5QrCode.start(
                { facingMode: "environment" }, 
                config,
                (textoLeido) => this.alLeerExito(textoLeido),
                (mensajeError) => { /* Ignorar errores de frame vacío */ }
            );
            
            this.enEscaneo = true;
        } catch (error) {
            console.error("Error al iniciar la cámara.", error);
            alert("No se pudo iniciar la cámara. Verifica los permisos del navegador.");
            this.restaurarBotones();
        }
    }

    async detenerEscaneo() {
        if (!this.enEscaneo) return;
        try {
            await this.html5QrCode.stop();
            this.html5QrCode.clear();
            this.enEscaneo = false;
            this.restaurarBotones();
        } catch (error) {
            console.error("Error al detener.", error);
        }
    }

    alLeerExito(textoDecodificadoStr) {
        // Pausar y mostrar
        this.detenerEscaneo();
        if (this.textoDecodificado) {
            this.textoDecodificado.textContent = textoDecodificadoStr;
            this.textoDecodificado.href = textoDecodificadoStr.startsWith('http') ? textoDecodificadoStr : '#';
            this.resultadoEscaneo.classList.remove('oculto');
        }
    }

    restaurarBotones() {
        this.botonIniciar.classList.remove('oculto');
        if (this.botonDetener) this.botonDetener.classList.add('oculto');
    }
}
