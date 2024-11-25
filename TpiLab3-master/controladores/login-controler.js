var inputEmail = null;
var inputPassword = null;
var frmLogin = null;

import { usuariosServices } from "/servicios/usuarios-servicios.js";

export function setLogin() {
    frmLogin = document.getElementById('frmLogin');
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', logout);

    if (getUsuarioAutenticado()) {
        if (frmLogin) frmLogin.outerHTML = '';
    } else {
        document.getElementById("sitio").classList.add('d-none');

        inputEmail = document.getElementById('loginEmail');
        inputPassword = document.getElementById('loginPassword');
        const btnLogin = document.getElementById('iniciar-sesion');
        const rememberCheckbox = document.getElementById('remember');

        
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            inputEmail.value = rememberedEmail; 
            rememberCheckbox.checked = true; 
        }

        inputEmail.addEventListener('blur', validarForm);
        inputPassword.addEventListener('blur', validarForm);

        btnLogin.addEventListener('click', usuarioExiste);

        rememberCheckbox.addEventListener('change', rememberMe);
    }
}

async function usuarioExiste() {
    const spinner = document.querySelector('#spinner'); // No usado en este código
    let existeUsuario = false;
    let usuarioActivo = '';
    let usuarioFoto = '';
    let usuarioId = '';

    try {
        // Llamar al servicio para listar usuarios
        const usuarios = await usuariosServices.listar();

        // Buscar si existe el usuario con correo, contraseña y rol de administrador
        const usuarioValido = usuarios.find(usuario => 
            usuario.role === 'Administrador' && 
            usuario.correo === inputEmail.value && 
            usuario.password === inputPassword.value
        );

        if (usuarioValido) {
            // Si el usuario válido es encontrado
            existeUsuario = true;
            usuarioId = usuarioValido.id;
            usuarioActivo = `${usuarioValido.nombre} ${usuarioValido.apellido}`;
            usuarioFoto = usuarioValido.avatar;
        } else {
            // Verificar si el problema es el rol o las credenciales
            const usuarioExiste = usuarios.find(usuario =>
                usuario.correo === inputEmail.value && usuario.password === inputPassword.value
            );

            if (usuarioExiste) {
                mostrarMensaje('Necesitas ser Administrador para Ingresar');
            } else {
                mostrarMensaje('Email o contraseña incorrecto, intenta nuevamente');
            }
        }
    } catch (error) {
        console.log('Error al listar usuarios:', error);
        mostrarMensaje('Hubo un error al validar los datos, intenta más tarde.');
    }

    // Si el usuario es válido y administrador
    if (existeUsuario) {
        // Ocultar login
        frmLogin.outerHTML = '';
        document.getElementById("sitio").classList.remove('d-none');

        // Guardar en sessionStorage
        sessionStorage.setItem('usuarioId', usuarioId);
        sessionStorage.setItem('usuarioActivo', usuarioActivo);
        sessionStorage.setItem('usuarioFoto', usuarioFoto);

        setUsuarioAutenticado(true);
        window.location.href = "#/home";
    }
}

function rememberMe(event) {
    const rememberCheckbox = event.target; 
    const emailValue = inputEmail.value; 

    if (rememberCheckbox.checked) {
        
        localStorage.setItem('rememberedEmail', emailValue);
    } else {
        
        localStorage.removeItem('rememberedEmail');
    }
}

function validarForm(e) {
    return true;
}

function mostrarMensaje(msj) {
    alert(msj);
}

function setUsuarioAutenticado(booleano) {
    sessionStorage.setItem('autenticado', booleano);
}

function getUsuarioAutenticado() {
    return (sessionStorage.getItem('autenticado') === "true");
}

function logout() {
    setUsuarioAutenticado(false);
    window.location.replace("index(admin).html");
}
