import {
  Navigate,
  useLocation
} from "react-router-dom";

import {
  getCurrentUser,
  getHomeByRole
} from "./utils/authRoutes";

function ProtectedRoute({
  children,
  permitido
}) {

  const location = useLocation();

  const {
    isAuthenticated,
    tipoUsuario
  } = getCurrentUser();

  console.log(
    "TIPO USUARIO:",
    tipoUsuario
  );

  const tiposPermitidos =
    Array.isArray(permitido)
      ? permitido
      : [permitido];

  if (!tipoUsuario) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname
        }}
      />
    );
  }

  if (
    !tiposPermitidos.includes(
      tipoUsuario
    )
  ) {

    return (
      <Navigate
        to={getHomeByRole(tipoUsuario)}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;