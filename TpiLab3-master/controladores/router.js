import { Categorias } from "./categorias/categorias.js";
import { Home } from "./home/home.js";
import { Productos } from "./productos/productos.js";
import { Usuarios } from "./usuarios/usuarios.js";
import { Ventas } from "./ventas/ventas.js";

export function Router(){
    let hash = location.hash;

    if (!hash || hash === '#') {
        hash = '#/home';
    }

    let origen = document.querySelector(`a[href^='${hash}']`);
    
    let activoActual = document.querySelector('.nav-item .active');
        
    activoActual.classList.remove('active');
       
    origen.classList.add('active');

    if (hash === '#/usuarios'){
        Usuarios();
        
    }else if(hash==='#/categorias'){
        Categorias();
        
    }else if(( hash==='#/home')){
        Home();
    }else if(hash==='#/productos'){
        Productos();
    }else if(hash==='#/ventas'){
        Ventas();
    }     
    
}