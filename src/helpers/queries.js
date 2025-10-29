const productosBackend = import.meta.env.VITE_API_PRODUCTOS;

export const listarProductos = async () => {
  try {
    const respuesta = await fetch(productosBackend);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const obtenerProductoPorID = async (id) => {
  try {
    const respuesta = await fetch(`${productosBackend}/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearProducto = async (producto) => {
  try {
    const respuesta = await fetch(productosBackend, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const editarProductoAPI = async (id, producto) => {
  try {
    const respuesta = await fetch(productosBackend + `/` + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const borrarProductoAPI = async (id) => {
  try {
    const respuesta = await fetch(productosBackend + `/` + id, {
      method: "DELETE",
      
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};