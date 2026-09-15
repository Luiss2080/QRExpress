export function formatData(type, rawData) {
    switch (type) {
        case 'url':
        case 'text':
            return rawData.text || '';
        case 'wifi':
            if (rawData.ssid) {
                return `WIFI:S:${rawData.ssid};T:${rawData.enc};P:${rawData.pass};;`;
            }
            return '';
        case 'vcard':
            if (rawData.name) {
                return `BEGIN:VCARD\nVERSION:3.0\nN:${rawData.name}\nTEL:${rawData.phone}\nEMAIL:${rawData.email}\nEND:VCARD`;
            }
            return '';
        case 'whatsapp':
            if (rawData.phone) {
                // Limpiar teléfono de caracteres especiales
                const phone = rawData.phone.replace(/[^0-9]/g, '');
                const textParam = rawData.message ? `?text=${encodeURIComponent(rawData.message)}` : '';
                return `https://wa.me/${phone}${textParam}`;
            }
            return '';
        default:
            return '';
    }
}

export function getDisplayData(type, formattedData) {
    if (type === 'url' || type === 'text') return formattedData;
    if (type === 'whatsapp') {
        const match = formattedData.match(/wa\.me\/([0-9]+)/);
        return match ? `WA: +${match[1]}` : formattedData;
    }
    if (type === 'wifi') {
        const match = formattedData.match(/S:(.*?);/);
        return match ? `WiFi: ${match[1]}` : formattedData;
    }
    if (type === 'vcard') {
        const match = formattedData.match(/N:(.*?)\n/);
        return match ? `Contacto: ${match[1]}` : formattedData;
    }
    return formattedData;
}
