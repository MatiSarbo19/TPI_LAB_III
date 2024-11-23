import { Carrusel } from "./carrusel/carrusel.js";
import { listarProductos } from "./listarProductos/listarProductos.js";
import { vistaProducto } from "./listarProductos/vistaProducto.js";
import { getUsuarioAutenticado, login, mostrarUsuario, register, setUsuarioAutenticado } from "./login/login.js";

export function RouterTienda(){
    let session = getUsuarioAutenticado();
    setSession(session); 
    let hash = location.hash;
   
    if (hash === '#vistaProducto'){
        hideBackground()
        vistaProducto();

    }else if (hash === '#login' ) {
        showBackground()
        login(); 
    }else if (hash === '#register' ) {      
        showBackground()
        register();    

    }else if (hash === '#logout' ) {      
        
        setUsuarioAutenticado(false, -1);
        location.replace("tienda.html");

    }else if (hash === '' ) {
        hideBackground()
        Carrusel();
        listarProductos();
    }    
    console.log (hash);
}

function setSession(session){
   /**
    * Esta función se utiliza para recuperar los datos de sessión cada vez que se recarga la página.
    */ 
   let d=document;
   if ( session.autenticado ) {
        mostrarUsuario(session.email);
   }
   

}

function hideBackground() {
    const body = document.querySelector("body");
    body.classList.add("no-background"); // Oculta el fondo
    body.style.overflow = "auto"; // Permite el desplazamiento
}


function showBackground() {
    const body = document.querySelector("body");
    body.classList.remove("no-background"); // Vuelve a mostrar el fondo
}