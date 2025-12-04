document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerForm');
  const msg = document.getElementById('message');

  function showMessage(text, isError) {
    msg.style.display = 'block';
    msg.style.color = isError ? 'crimson' : 'green';
    msg.textContent = text;
    setTimeout(() => { msg.style.display = 'none'; }, 5000);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm_password').value;
    const pais = document.getElementById('pais').value;
    const telefono = document.getElementById('telefono').value.trim();

    if (!nombre || !apellido || !email || !password) {
      showMessage('Por favor completa los campos requeridos (nombre, apellido, email, contraseña).', true);
      return;
    }
    if(password.length < 6){ showMessage('La contraseña debe tener al menos 6 caracteres.', true); return; }
    if(password !== confirm){ showMessage('Las contraseñas no coinciden.', true); return; }

    try{
      const resp = await fetch('http://localhost:4000/api/register', {
        method: 'POST', headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ nombre, apellido, email, password, pais, telefono })
      });
      const data = await resp.json();
      if(!resp.ok){ showMessage(data.error || 'Error en registro', true); return; }
      showMessage('Registro completado. Ya puedes iniciar sesión.', false);
      form.reset();
    }catch(err){
      console.error(err);
      showMessage('No se pudo conectar al servidor. Asegúrate de iniciar el backend.', true);
    }
  });
});
