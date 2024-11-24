import { Categorias } from "./categorias/categorias.js";
import { Home } from "./home/home.js";
import { Productos } from "./productos/productos.js";
import { Usuarios } from "./usuarios/usuarios.js";
import { Ventas } from "./ventas/ventas.js";

export function Router() {
    let hash = location.hash.toLowerCase();

    if (!hash || hash === '#') {
        hash = '#/home';
    }

    // Actualizar la clase activa en el menú
    let origen = document.querySelector(`a[href^='${hash}']`);
    let activoActual = document.querySelector('.nav-item .active');

    if (activoActual) {
        activoActual.classList.remove('active');
    }

    if (origen) {
        origen.classList.add('active');
    } else {
        console.error(`No se encontró el enlace para el hash: ${hash}`);
    }

    // Navegar a la ruta correspondiente
    switch (hash) {
        case '#/usuarios':
            Usuarios();
            break;
        case '#/categorias':
            Categorias();
            break;
        case '#/home':
            Home();
            break;
        case '#/productos':
            Productos();
            break;
        case '#/ventas':
            Ventas();
            break;
    }
}
