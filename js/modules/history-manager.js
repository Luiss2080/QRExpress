const HISTORY_KEY = 'qr_pro_history_v2';

export class HistoryManager {
    constructor() {
        this.history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    }

    save(type, displayData, config) {
        if (!displayData) return;
        
        // Evitar duplicados exactos consecutivos
        if (this.history.length > 0 && this.history[0].data === displayData && this.history[0].type === type) {
            return;
        }

        const entry = {
            type,
            data: displayData,
            config,
            timestamp: new Date().getTime()
        };

        this.history.unshift(entry);
        this.history = this.history.slice(0, 15); // Mantener últimos 15
        localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history));
    }

    getAll() {
        return this.history;
    }
}
