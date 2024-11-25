/**ESTE MODULO SE ENCARGA DE RENDERIZAR LA PANTALLA DE LOGIN Y DE REGISTRO SEGUN CORRESPONDA */
import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

/**1- Se debe asignar a la siguiente constante todo el código correspondiente al componente de login (/asset/modulos/login.html)  */
const htmlLogin = `
<div class="contenedorLogin">
    <div class="cajaLogin">
        <div id="caja-foto"></div>
        <div id="caja-contenido">
            <div id="logo-iniciosesion"></div>
            <p id="inicio-registro">Iniciar sesión</p>
            <form class="formLogin">

                <div class="input-group">
                    <input type="email" class="form-control" id="loginEmail" placeholder="Email" name="loginEmail" autocomplete="on" required>
                </div>

                <div class="input-group password-container">
                    <input type="password" class="form-control" id="loginPassword" placeholder="Contraseña" name="loginPassword" autocomplete="off" required>
                    <button type="button" class="toggle-password" data-input="loginPassword">
                        <img id="eyeIcon1" src="https://img.icons8.com/ios-filled/50/000000/visible.png" alt="Mostrar contraseña">
                    </button>
                </div>

                <div class="input-group password-container pass2">
                    <input type="password" class="form-control" id="reLoginPassword" placeholder="Repetir Contraseña" name="reLoginPassword" required>
                    <button type="button" class="toggle-password" data-input="reLoginPassword">
                        <img id="eyeIcon2" src="https://img.icons8.com/ios-filled/50/000000/visible.png" alt="Mostrar contraseña">
                    </button>
                </div>

                <div class="row">
                    <div class="col-4">
                        <button type="submit" id="iniciar-sesion" class="btnAmarillo">Login</button>
                    </div>
                </div>
            </form>

            <!-- Contenedor con botones -->
            <div class="contenedor_login-register">
                <a href="" class="btnVolver1">Volver</a>
                <a href="#login" class="btnLogin1" data-emailUsuario="" data-idUsuario="">Iniciar Sesión</a>
                <a href="#register" class="btnRegister1">Registrarse</a>
            </div>
        </div>
    </div>
</div>

`;
/*2-Se deben definir 4 variables globales al módulo, una para el formulario html, y otras tres para los inputs de email, contraseña y 
*   repetir contraseña
*/
var formulario;
var inputEmail;
var inputPassword;
var inputRepetirPass;



export async function login(){
    /** 3- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de login
     * 
    */
    crearFormulario(false);
    formulario.addEventListener('submit',ingresar);
}  

export async function register(){
     /** 4- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de registro.
      *     Esta función es similar a la de login, pero en el llamado a la función crearFormulario lo hace pasando el valor true al 
      *     al parámetro registro que espera función mencionada.
      *     Por último enlaza el evento submit del formulario a la función registrarUsuario.
     * 
    */
   crearFormulario(true);
   formulario.addEventListener('submit',registrarUsuario);
}  



function crearFormulario(registrar){
    /**
     * 1- Esta función deberá capturar el elemento cuya clase es .carrusel y le asignará en su interior un blanco para eliminar su contenido previo.
     * 2- Deberá realizar lo mismo para la clase .seccionProductos y .vistaProducto.
     * 3- Luego deberá capturar la .seccionLogin para asignarle el contenido html del componente login, el cual se encuentra previamente 
     *    cargado en la constante htmlLogin.
     * 4- Deberá capturar los id correspondientes a loginEmail, loginPassword y reLoginPassword para asignarlos a las variable definidas
     *    inputEmail, inputPassword e inputRepetirPass.
     * 5- En el caso que el parámetro registrar sea falso deberá eliminar el contenido del elemento id reLoginPassword.
     * 6- Para el caso que el parámetro registrar sea verdadero deberá cambiar el valor de la propiedad css display a block. De esta forma
     *    el input reLoginPassword se mostrará en pantalla.
     * 7- Por último se deberá capturar el formulario indentificado con la clase .formLogin y asignarlo a la variable global formulario.
     */
    document.querySelector(".carrusel").innerHTML = '';
    document.querySelector(".seccionProductos").innerHTML = '';
    document.querySelector(".vistaProducto").innerHTML = '';

    document.querySelector('.seccionLogin').innerHTML = htmlLogin;

    inputEmail = document.getElementById('loginEmail');
    inputPassword = document.getElementById('loginPassword');
    inputRepetirPass = document.getElementById('reLoginPassword');
    let tituloLogin = document.querySelector('#inicio-registro');
    let botonRegistro = document.querySelector('.btnRegister1');
    let botonInicioSesion = document.querySelector('.btnLogin1');
    let botonSubmit = document.getElementById("iniciar-sesion");
    let pass2 = document.querySelector('.pass2')

    if (!registrar){
        tituloLogin.textContent = "Iniciar sesión";
        inputRepetirPass.value = '';
        pass2.style.display = 'none';
        inputRepetirPass.style.display = 'none';
        inputRepetirPass.removeAttribute('required');
        botonRegistro.style.display = "block";
        botonInicioSesion.style.display = "none";
    }
    else{
        tituloLogin.textContent = "Registrarse";
        pass2.style.display = 'block';
        inputRepetirPass.style.display = 'block';
        inputRepetirPass.setAttribute('required', 'true');
        botonRegistro.style.display = "none";
        botonInicioSesion.style.display = "block";
        botonSubmit.textContent = "Registrarse"
    }

    formulario = document.querySelector('.formLogin');
} 

async function  ingresar(e){
    /**
     * 1- Esta función tiene como objetivo controlar que el texto en inputEmail e inputPassword se corresponda con alguna cuenta almacenada
     *    en el REST-API.
     * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
     *    tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
     * 3- Luego se deberá llamar la función llamada usuarioExiste. La misma devuelve un valor falso si el usuario no existe y el id del 
     *    usuario en el caso que la cuenta sea válida.
     * 4- Através de una estructura de desición se deberá, en el caso de que el usuario sea válido :
     *     a- Llamar a la función setUsuarioAutenticado (usuariosServices) pasandole como parámetro el valor true y el id del usuario. De esta forma dicha 
     *        función guardará estos datos en el sessionStorage del navegado, para poder ser consultados en el momento de la compra.
     *     b- Llamar a la función mostrarUsuario, pasandole como parámetro el texto del email de la cuenta.  
     * 5- En el caso de que el usuario no sea válido se deberá mostrar una alerta con el texto 'Email o contraseña incorrecto, intenta nuevamente'.
     */
    e.preventDefault();

    limpiarErrores([inputEmail, inputPassword]);

    let idUsuario = await usuarioExiste();
    if(idUsuario){
        setUsuarioAutenticado(true,idUsuario);
        mostrarUsuario(inputEmail.value);
        mostrarMensaje('Usuario Ingresado Correctamente!');
        window.location.href = "";
    }
    else{
        mostrarErrores([
            { campo: "loginEmail", mensaje: "Email o contraseña incorrectos." }])
    }

}


async function registrarUsuario(e) {
    e.preventDefault();
    const fotoAvatar = "../../../img/usuarios/default/anonymous.png"
    // Limpiamos los mensajes y estilos previos
    limpiarErrores([inputEmail, inputPassword, inputRepetirPass]);

    // Validamos los datos ingresados
    const errores = validacionDatosRegistrar(
        inputPassword.value.trim(),
        inputRepetirPass.value.trim()
    );

    if (await emailExiste(inputEmail.value.trim())) {
        errores.push({ campo: "loginEmail", mensaje: "El email ya está registrado." });
    }

    // Si hay errores, los mostramos y detenemos el flujo
    if (errores.length > 0) {
        mostrarErrores(errores);
        return;
    }

    // Si no hay errores, procedemos con el registro
    try {
        await usuariosServices.crear(
            null,
            null,
            inputEmail.value.trim(),
            inputPassword.value.trim(),
            fotoAvatar,
            null,
            null,
            null,
            null,
            'Cliente'
        );
        mostrarMensaje('Email registrado exitosamente');
        window.location.href = "#login"; // Redirigimos al usuario
    } catch (error) {
        mostrarMensaje('Error al registrar el usuario. Por favor, intenta nuevamente.');
        console.error(error);
    }
}
async function usuarioExiste() {
    /**
     * 1- El objetivo de esta función es consultar la lista de usuarios con la función usuariosServices.listar() y mediante
     *    un bucle comparar el email y la contraseña ingresado por el usuario en inputEmail e inputPassword con los previamente
     *    almacenados dentro del API-REST sobre el recuros usuarios.
     * 2- Si el email y la contraseña son válidos devuelve el id de usuario.
     * 3- Si el email y la contraseña no son válido devuelve falso.    
     */
    let usuarios =  await usuariosServices.listar();
    for ( let usuario of usuarios){
        if(
            usuario.correo === inputEmail.value &&
            usuario.password === inputPassword.value
        ){
            return usuario.id;
        }   
    }
    return false;
}

export function mostrarUsuario(email){
    /**
     * 1- Esta función deberá capturar del dom la clase .btnLogin y asignarle el texto existente en el parámetro email.
     * 2- Deberá capturar del dom la clase .btnRegister y asignarle el texto "Logout" y a este elemento asignarle el valor
     *    "#logout" sobre el atributo href.
     **/
    
    let btnLogin = document.querySelector('.btnLogin');
    let btnRegister = document.querySelector('.btnRegister');
    
    btnLogin.textContent = email;
    btnLogin.removeAttribute('href');
    btnRegister.textContent = 'Logout';
    btnRegister.href = '#logout';

}

function mostrarMensaje(msj) {
    /**
     * Esta función muestra una alerta con el texto recibido en el parámetro msj.
     */
    alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
    /**
     * 1- Esta función deberá registar en el sessionStorage tres valores: autenticado, idUsuario y email.
     * 2- Los valores de los mismos serán tomados de los dos parámetros recibidos y el email será tomado desde la variable
     *    inputEmail.
     */
    sessionStorage.setItem('autenticado', booleano);
    sessionStorage.setItem('idUsuario', idUsuario);
    if (booleano && inputEmail?.value) {
        // Si se está autenticando y el inputEmail está disponible, usarlo
        sessionStorage.setItem('email', inputEmail.value);
    } else if (!booleano) {
        // Si se está cerrando sesión, limpiar el email
        sessionStorage.setItem('email', "");
    }

}
export function getUsuarioAutenticado() {
    /**
     * 1- Esta función debera leer los valores almacenados en el sessionStorage y construir un objeto con los valores
     * autenticado, idUsuario y email.
     * 2- Luego los devolverá como resultado.
     */
    return {
        autenticado: sessionStorage.getItem('autenticado') === 'true',
        idUsuario: sessionStorage.getItem('idUsuario'),
        email: sessionStorage.getItem('email'),
    };
       
}

function validacionDatosRegistrar(password, repeatpassword) {
    const errores = [];

    // Validación de la seguridad de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password && !passwordRegex.test(password)) {
        errores.push({ campo: "loginPassword",mensaje: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número." });
    }


    // Validación de coincidencia de contraseñas
    if (password && repeatpassword && password !== repeatpassword) {
        errores.push({ campo: "reLoginPassword", mensaje: "Las contraseñas no coinciden." });
    }

    return errores;
}

function mostrarErrores(errores) {
    errores.forEach((error) => {
        const input = document.getElementById(error.campo);
        const errorText = document.createElement("small");
        errorText.className = "error-text";
        errorText.textContent = error.mensaje;

        input.classList.add("input-error");

        input.parentElement.appendChild(errorText);
    });
}

function limpiarErrores(inputs) {
    inputs.forEach((input) => {
        
        input.classList.remove("input-error");

        const errorText = input.parentElement.querySelector(".error-text");
        if (errorText) {
            errorText.remove();
        }
    });
}

async function emailExiste(email) {
    let usuarios = await usuariosServices.listar(); // Obtenemos todos los usuarios
    for (let usuario of usuarios) {
        if (usuario.correo === email) {
            return true; // El email ya está registrado
        }
    }
    return false; // El email no está registrado
}

// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
    // Escuchar el evento click en el documento entero
    document.addEventListener("click", function (event) {
        // Verificar si el clic ocurrió dentro de un botón con la clase "toggle-password"
        if (event.target.closest('.toggle-password')) {
            // Si el clic es en un botón toggle-password, obtener el botón
            const button = event.target.closest('.toggle-password');
            const inputId = button.getAttribute("data-input"); // ID del input asociado
            const passwordInput = document.getElementById(inputId); // Input de contraseña
            const eyeIcon = button.querySelector("img"); // Icono del ojo

            // Alternar entre mostrar y ocultar la contraseña
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                eyeIcon.src = "https://img.icons8.com/ios-filled/50/000000/invisible.png";
                eyeIcon.alt = "Ocultar contraseña";
            } else {
                passwordInput.type = "password";
                eyeIcon.src = "https://img.icons8.com/ios-filled/50/000000/visible.png";
                eyeIcon.alt = "Mostrar contraseña";
            }
        }
    });
});

