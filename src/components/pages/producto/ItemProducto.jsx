import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { borrarProductoAPI } from "../../../helpers/queries";
import { listarProductos } from "../../../helpers/queries";
import { set } from "react-hook-form";

const ItemProducto = ({
  itemProducto,
  fila,
  setListaProductos,
  setProductos,
}) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "No se puede revertir este paso posteriormente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarProductoAPI(itemProducto._id);

        if (respuesta.status == 200) {
          Swal.fire({
            title: "Producto eliminado",
            text: `El producto fue eliminado correctamente`,
            icon: "success",
          });

          const respuestaProductos = await listarProductos();

          if (respuestaProductos.status === 200) {
            const productosRestantes = await respuestaProductos.json();

            setProductos(productosRestantes);
          }
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `El producto no fue eliminado correctamente`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td className="text-center">1</td>
      <td>{itemProducto.nombreProducto}</td>
      <td className="text-end">{itemProducto.precio}</td>
      <td className="text-center">
        <img
          src={itemProducto.imagen}
          className="img-thumbnail"
          alt={itemProducto.nombreProducto}
        ></img>
      </td>
      <td>{itemProducto.categoria}</td>
      <td className="text-center">
        <Link
          className="me-lg-2 btn btn-warning"
          to={`/administrador/editar/${itemProducto._id}`}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={eliminarProducto}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
