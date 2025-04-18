import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";

function htmlCategoria(id, categoria){
    return `
        <div class="categoria" data-idCategoria="${id}">
            <h1 class="categoria">${categoria}</h1>
            <div class="productos">
                <!-- Aquí se listan los productos -->
                <p class="item-producto">Sin productos.</p>
            </div>                
        </div>`;

}

function htmlItemProducto(id, imagen, nombre, precio){
    return `
    <div class="item-producto">
        <img src="${imagen}">
        <p class="producto_nombre">${nombre}</p>
        <p class="producto_precio">${precio}</p>
        <a href="?idProducto=${id}#vistaProducto" type="button" class="producto_enlace">Ver producto</a>
    </div>`;


}

async function asignarProducto(id){
    /*1- ESTA FUNCION DEBERA CONSULTAR EN EL API-REST TODOS LOS PRODUCTOS PERTENECIENTES A LA CATEGORIA CON CODIGO ID  */
    /*2- HACER UN BUCLE CON EL RESULTADO DE LA CONSULTA Y RECORRELO PRODUCTO POR PRODUCTO*/
    /*3- EN EL INTERIOR DEL BUCLE DEBERA LLAMAR A LA FUNCION htmlItemProducto y acumular su resultado en una cadena de caracteres */
    /*4- LUEGO DEL BUCLE Y CON LA CADENA RESULTANTE SE DEBE CAPTURAR EL ELEMENTO DEL DOM PARA ASIGNAR ESTOS PRODUCTOS DENTRO DE LA CATEGORIA CORRESPONDIENTE */
    /*5- PARA ELLO PODEMOS HACER USO DE UN SELECTOR CSS QUE SELECCIONE EL ATRIBUTO data-idCategoria=X, Ó LA CLASE .productos  .SIENDO X EL VALOR LA CATEGORIA EN CUESTION.*/ 
     
    try {
        // Llama al servicio para listar los productos por categoría
        const productos = await productosServices.listarPorCategoria(id);

        // Generar la cadena HTML para los productos
        let productosHTML = '';
        productos.forEach(producto => {
            productosHTML += htmlItemProducto(
                producto.id,
                producto.foto, // Uso de 'foto' como 'imagen'
                producto.nombre,
                producto.precio
            );
        });

        // Selecciona el contenedor de productos según el atributo data-idCategoria
        const contenedor = document.querySelector(`.categoria[data-idCategoria="${id}"] .productos`);
        if (contenedor) {
            contenedor.innerHTML = productosHTML;
        }
    } catch (error) {
        console.error('Error al asignar productos:', error);
    }
}         
export async function listarProductos(){
    /************************** .
     /* 1- ESTA FUNCION DEBERA SELECCIONAR DESDE DEL DOM  LA CLASE .seccionProductos. */
     /* 2- DEBERÁ CONSULTAR LA API-REST PARA TRAER LAS CATEGORIAS Y  CONSTRUIR UN BUCLE PARA RECORRERLAS UNA A UNA. */
     /* 3- EN EL INTERIOR DE ESTE BUCLE LLAMARA A LA FUNCION htmlCategoria PARA ASIGNAR EL NOMBRE DE LA CATEGORIA Y SU ID*/
     /* 4- SE DEBERA ASIGNAR EL RESULTADO DE FUNCION ANTERIOR AL ELEMENTO DEL DOM .seccionProductos */
     /* 5- LUEGO DEBERÁ LLAMAR UNA FUNCION, asignarProducto, QUE RECIBA COMO PARAMETRO EL ID DE LA CATEGORIA  */
     /* 6- FIN DEL BUCLE Y FIN DE LA FUNCION */   

     try {
        // Selecciona la sección de productos en el DOM
        const seccionProductos = document.querySelector('.seccionProductos');
        if (!seccionProductos) {
            console.error('No se encontró el contenedor .seccionProductos');
            return;
        }

        // Llama al servicio para listar las categorías
        const categorias = await categoriasServices.listar();

        // Generar la cadena HTML para las categorías
        let categoriasHTML = '';
        for (const categoria of categorias) {
            categoriasHTML += htmlCategoria(categoria.id, categoria.descripcion);
        }

        // Asigna las categorías generadas al DOM
        seccionProductos.innerHTML = categoriasHTML;

        // Asigna los productos de cada categoría
        for (const categoria of categorias) {
            await asignarProducto(categoria.id);
        }
    } catch (error) {
        console.error('Error al listar productos:', error);
    }
}  



