document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerForm');
  const msg = document.getElementById('message');

  function showMessage(text, isError) {
    msg.style.display = 'block';
    msg.style.color = isError ? 'crimson' : 'green';
    msg.textContent = text;
    setTimeout(() => { msg.style.display = 'none'; }, 5000);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const pais = document.getElementById('pais').value;
    const telefono = document.getElementById('telefono').value.trim();

    if (!nombre || !apellido || !email) {
      showMessage('Por favor completa los campos requeridos (nombre, apellido, email).', true);
      return;
    }

    const registro = {
      nombre,
      apellido,
      email,
      pais,
      telefono,
      createdAt: new Date().toISOString()
    };

    // Guardar en localStorage como respaldo
    try {
      const existing = JSON.parse(localStorage.getItem('registros') || '[]');
      existing.push(registro);
      localStorage.setItem('registros', JSON.stringify(existing));
    } catch (err) {
      // no crítico
      console.warn('No se pudo guardar en localStorage', err);
    }

    // Generar y descargar el JSON
    try {
      const json = JSON.stringify(registro, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `registro-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generando el archivo JSON', err);
      showMessage('Hubo un error al generar el archivo JSON.', true);
      return;
    }

    showMessage('Registro guardado y archivo JSON descargado.', false);
    form.reset();
  });
});
