export const HOME_BY_ROLE = {
  cliente: "/home-cliente",
  adm: "/home-adm",
  prestador: "/home-profissional",
};

const ROLE_ALIASES = {
  empresa: "adm",
  administrador: "adm",
};

export function normalizeUserType(tipo) {
  if (!tipo) return null;

  const normalized = String(tipo).trim().toLowerCase();

  return ROLE_ALIASES[normalized] || normalized;
}

export function getHomeByRole(tipo) {
  return HOME_BY_ROLE[normalizeUserType(tipo)] || "/login";
}

export function isKnownRole(tipo) {
  return Boolean(HOME_BY_ROLE[normalizeUserType(tipo)]);
}

export function getCurrentUser() {
  const usuarioId = sessionStorage.getItem("usuarioId");
  const tipoUsuario = normalizeUserType(
    sessionStorage.getItem("tipoUsuario")
  );

  return {
    usuarioId,
    tipoUsuario,
    isAuthenticated: Boolean(usuarioId && isKnownRole(tipoUsuario)),
  };
}
