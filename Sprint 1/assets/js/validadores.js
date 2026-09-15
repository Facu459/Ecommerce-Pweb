document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registro');
    const erroresContenedor = document.getElementById('errores-registro');

    form.addEventListener('submit', (e) => {
        // se limpian errores previos
        erroresContenedor.innerHTML = '';
        let errores = [];

        
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Campos vacíos
        if (!nombre || !apellido || !email || !password) {
            errores.push('Todos los campos son obligatorios.');
        }

        // Formato de Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errores.push('Debes ingresar un email válido.');
        }

        // Validaciones de Contraseña
        if (password) {
            if (password.length < 8) errores.push('La contraseña debe tener al menos 8 caracteres.');
            if (!/[a-zA-Z]/.test(password)) errores.push('La contraseña debe incluir al menos una letra.');
            if (!/[0-9]/.test(password)) errores.push('La contraseña debe incluir al menos un número.');
            if (!/[!@#$%^&*(),.?":{}|<>-_]/.test(password)) errores.push('La contraseña debe incluir un carácter especial.');
            
            if (password === email) errores.push('La contraseña no puede ser igual al email.');

            // Cadenas prohibidas
            const prohibidas = ['password', '1234', 'qwerty', 'miecommerce', nombre.toLowerCase(), apellido.toLowerCase()];
            const passMinuscula = password.toLowerCase();
            
            const contieneProhibida = prohibidas.some(palabra => palabra && passMinuscula.includes(palabra));
            if (contieneProhibida) {
                errores.push('La contraseña contiene palabras muy débiles o información personal.');
            }
        }

        // Si hay errores, detenemos el envío e imprimimos en pantalla
        if (errores.length > 0) {
            e.preventDefault(); 
            erroresContenedor.innerHTML = errores.join('<br>');
        }
    });
});