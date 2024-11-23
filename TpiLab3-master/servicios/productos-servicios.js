const url = "https://673be17b96b8dcd5f3f7c21e.mockapi.io/api/s1/Productos";


async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl)
        .then(respuesta => respuesta.json());
}

async function crear(nombre, descripcion, foto, precio, idCategoria, categoria) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            foto: foto,
            precio: precio,
            idCategoria: idCategoria,
            categoria: categoria
        })
    })
}

async function editar(id, nombre, descripcion, foto, precio, idCategoria, categoria) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            foto: foto,
            precio: precio,
            idCategoria: idCategoria,
            categoria: categoria
        })
    })
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
}

async function listarPorCategoria(idCategoria) {
    const newUrl= new URL(url);
    newUrl.searchParams.append('idCategoria', idCategoria);
    return await fetch(newUrl)
        .then(respuesta => respuesta.json());
 
}
export const productosServices = {
    listar,
    crear,
    editar,
    borrar,
    listarPorCategoria
}