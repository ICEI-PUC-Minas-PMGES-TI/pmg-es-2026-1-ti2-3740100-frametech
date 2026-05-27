export const HOME_BY_ROLE = {
  cliente: "/home-cliente",
  adm: "/home-adm",
  prestador: "/home-profissional",
};

export function normalizeUserType(tipo) {
  if (tipo === "empresa") {
    return "adm";
  }

  return tipo;
}

export function getHomeByRole(tipo) {
  return HOME_BY_ROLE[normalizeUserType(tipo)] || "/login";
}

export function getCurrentUser() {
  const usuarioId = sessionStorage.getItem("usuarioId");
  const tipoUsuario = normalizeUserType(
    sessionStorage.getItem("tipoUsuario")
  );

  return {
    usuarioId,
    tipoUsuario,
    isAuthenticated: Boolean(usuarioId && tipoUsuario),
  };
}
