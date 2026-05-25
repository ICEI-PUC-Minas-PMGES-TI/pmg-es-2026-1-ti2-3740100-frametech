import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, permitido }) {

  const tipoUsuario =
    sessionStorage.getItem("tipoUsuario");

  const tiposPermitidos = Array.isArray(permitido)
    ? permitido
    : [permitido];

  if (!tiposPermitidos.includes(tipoUsuario)) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
