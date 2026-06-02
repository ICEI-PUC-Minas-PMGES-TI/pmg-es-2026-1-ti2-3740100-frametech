import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./PAGES/HOME/Home";

import Cadastro from "./PAGES/Cadastro/Cadastro";

import Login from "./PAGES/Login/Login";

import HomeClient from "./PAGES/HomeClient/HomeClient";

import HomeProfissional from "./PAGES/HomeProfissional/HomeProfissional";

import HomeAdm from "./PAGES/HomeAdm/Homeadm";

import Perfil from "./PAGES/Perfil/Perfil";

import Eventos from "./PAGES/Eventos/Eventos";

import EscalaEquipe from "./PAGES/Escalas/EscalaEquipe";

import GestaoEquipamentos from "./PAGES/EQUIPAMENTOS/GestaoEquipamentos";

import ChatEventos from "./PAGES/ChatEventos/ChatEventos";

import ProtectedRoute from "./ProtectedRoute";

import {
  getCurrentUser,
  getHomeByRole
} from "./utils/authRoutes";

function RoleRedirect() {

  const {
    isAuthenticated,
    tipoUsuario
  } = getCurrentUser();

  return (

    <Navigate
      to={
        isAuthenticated
          ? getHomeByRole(tipoUsuario)
          : "/"
      }
      replace
    />

  );
}

function PublicOnlyRoute({
  children
}) {

  const {
    isAuthenticated,
    tipoUsuario
  } = getCurrentUser();

  if (isAuthenticated) {

    return (

      <Navigate
        to={getHomeByRole(tipoUsuario)}
        replace
      />

    );
  }

  return children;
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <Home />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/cadastro"
          element={
            <PublicOnlyRoute>
              <Cadastro />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/home-cliente"
          element={
            <ProtectedRoute permitido="cliente">
              <HomeClient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/eventos"
          element={
            <ProtectedRoute permitido="cliente">
              <Eventos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home-profissional"
          element={
            <ProtectedRoute permitido="prestador">
              <HomeProfissional />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home-adm"
          element={
            <ProtectedRoute permitido="adm">
              <HomeAdm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/escalas"
          element={
            <ProtectedRoute permitido="adm">
              <EscalaEquipe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/equipamentos"
          element={
            <ProtectedRoute permitido="adm">
              <GestaoEquipamentos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat-eventos"
          element={
            <ProtectedRoute permitido={[
              "cliente",
              "prestador",
              "adm"
            ]}>
              <ChatEventos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute permitido={[
              "cliente",
              "prestador",
              "adm"
            ]}>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<RoleRedirect />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;