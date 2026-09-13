document.getElementById('btn-generar').addEventListener('click', () => {
  const texto = document.getElementById('texto').value.trim();
  const resultado = document.getElementById('resultado');
  if (!texto) {
    resultado.innerHTML = '<p style="color:#c0392b">Escribí algo primero.</p>';
    return;
  }
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(texto)}`;
  resultado.innerHTML = `<img src="${url}" alt="Código QR" width="220" height="220">`;
});
