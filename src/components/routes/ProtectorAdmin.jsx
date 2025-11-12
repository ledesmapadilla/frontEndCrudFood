import { Navigate, Outlet } from "react-router";

const ProtectorAdmin = ({usuarioLogueado}) => {
  if (!usuarioLogueado.usuario) {
    return <Navigate to={"/login"} />;

  
  }
    return <Outlet />;
};

export default ProtectorAdmin;
