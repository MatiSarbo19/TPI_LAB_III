import { Carrusel } from "./carrusel/carrusel.js";
import { listarProductos } from "./listarProductos/listarProductos.js";
import { vistaProducto } from "./listarProductos/vistaProducto.js";
import { Slider } from "./slider/slider.js"
import { Cover } from "./cover/cover.js";
import { Footer, Info } from "./info/info.js";
import { getUsuarioAutenticado, login, mostrarUsuario, register, setUsuarioAutenticado } from "./login/login.js";

export function RouterTienda(){
    let session = getUsuarioAutenticado();
    setSession(session); 
    let hash = location.hash;
   
    if (hash === '#vistaProducto'){
        hideBackground();
        clearLogin()
        vistaProducto();

    }else if (hash === '#login' ) {
        showBackground();
        clearLogin()
        login();
    }else if (hash === '#register' ) {      
        showBackground();
        clearLogin()
        register();    

    }else if (hash === '#logout' ) {      
        
        setUsuarioAutenticado(false, -1);
        location.replace("tienda.html");

    }else if (hash === '' ) {
        hideBackground();
        Slider();
        Cover();
        Carrusel();
        Info();
        listarProductos();
        Footer()
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


function clearLogin() {
    const slider = document.querySelector(".slider");
    const seccionCover = document.querySelector(".cover");
    const barra_coutas = document.querySelector("#barra-cuotas");
    const info_extra = document.querySelector(".info");
    const footer = document.querySelector('.footer')
    seccionCover.style.display = 'none';
    slider.style.display = 'none';
    barra_coutas.style.display = 'none';
    info_extra.style.display = 'none';
    footer.style.display = 'none';
}