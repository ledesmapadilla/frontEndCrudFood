import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import DetalleProducto from "./components/pages/DetalleProducto";
import Administrador from "./components/pages/Administrador";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";
import Error404 from "./components/pages/Error404";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import { useEffect, useState } from "react";
import ItemProducto from "./components/pages/producto/ItemProducto";
import { set } from "react-hook-form";
BrowserRouter;

function App() {
  const sesionUsuario =
    JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

  const productosLS = JSON.parse(localStorage.getItem("productosKey")) || [];

  const [usuarioLogueado, setUsuarioLogueado] = useState(sesionUsuario);
  const [productos, setProductos] = useState(productosLS);


  /* actualiza el localStorage cuando nos logeamos */
  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  /* actualiza el localStorage cuando cambia la lista de productos */
  useEffect(() => {
    localStorage.setItem("productosKey", JSON.stringify(productos));
  }, [productos]);

  const crearProducto = (productoNuevo) => {
    setProductos([...productos, productoNuevo]);
    return true;
  };

  const borrarProducto = (idProducto) => {
    const productosFiltrados = productos.filter(
      (itemProducto) => itemProducto.id !== idProducto
    );
    setProductos(productosFiltrados);
    return true;
  };

  const buscarProducto=(idProducto)=>{
    const productoBuscado=productos.find((itemProducto)=>itemProducto.id===idProducto)
    return productoBuscado;
  }
const modificarProducto=(idProducto,datosProducto)=>{
const productosActualizados=productos.map((itemProducto)=>{
  if(itemProducto.id===idProducto){
    return {...itemProducto,...datosProducto}
  }
  return itemProducto;
});

setProductos (productosActualizados);
return true;
}

  return (
    <BrowserRouter>
      <Menu
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
      />
      <main className="container my-3">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/detalle" element={<DetalleProducto />} />
          <Route
            path="/login"
            element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
          />

          <Route
            path="/administrador"
            element={<ProtectorAdmin usuarioLogueado={usuarioLogueado} />}
          >
            <Route
              index
              element={
                <Administrador
                  setProductos={setProductos}
                  productos={productos} 
                  borrarProducto={borrarProducto}
                />
              }
            />

            <Route
              path="crear"
              element={
                <FormularioProducto
                  titulo="Crear Producto"
                  crearProducto={crearProducto}
                />
              }
            />

            <Route
              path="editar/:id"
              element={
                <FormularioProducto
                  titulo="Editar Producto"
                  crearProducto={crearProducto}
                  buscarProducto={buscarProducto}
                  modificarProducto={modificarProducto}
                />
              }
            />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
