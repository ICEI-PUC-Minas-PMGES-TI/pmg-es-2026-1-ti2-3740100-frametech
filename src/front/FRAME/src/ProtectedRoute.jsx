import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, permitido }) {

  const tipoUsuario =
    sessionStorage.getItem("tipoUsuario");

  if (tipoUsuario !== permitido) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;