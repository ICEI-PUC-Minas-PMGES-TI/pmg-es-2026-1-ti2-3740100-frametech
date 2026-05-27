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
import Perfil from "./PAGES/Perfil/Perfil";
import HomeProfissional from "./PAGES/HomeProfissional/HomeProfissional";
import HomeAdm from "./PAGES/HomeAdm/Homeadm";
<<<<<<< HEAD
import Eventos from "./PAGES/Eventos/Eventos.jsx";
=======
import Eventos from "./PAGES/Eventos/Eventos";
import EscalaEquipe from "./PAGES/Escalas/EscalaEquipe";
>>>>>>> 514b803 (feat: listagem profissionais e escalas)

import ProtectedRoute from "./ProtectedRoute";
import {
  getCurrentUser,
  getHomeByRole
} from "./utils/authRoutes";

function RoleRedirect() {
  const { isAuthenticated, tipoUsuario } =
    getCurrentUser();

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

function PublicOnlyRoute({ children }) {
  const { isAuthenticated, tipoUsuario } =
    getCurrentUser();

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
<<<<<<< HEAD
          element={
            <PublicOnlyRoute>
              <Home />
            </PublicOnlyRoute>
          }
=======
          element={<Home />}
>>>>>>> 514b803 (feat: listagem profissionais e escalas)
        />

        <Route
          path="/cadastro"
<<<<<<< HEAD
          element={
            <PublicOnlyRoute>
              <Cadastro />
            </PublicOnlyRoute>
          }
=======
          element={<Cadastro />}
>>>>>>> 514b803 (feat: listagem profissionais e escalas)
        />

        <Route
          path="/login"
<<<<<<< HEAD
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
=======
          element={<Login />}
>>>>>>> 514b803 (feat: listagem profissionais e escalas)
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
<<<<<<< HEAD
          path="/escalas"
          element={
            <ProtectedRoute permitido="adm">
              <Navigate to="/home-adm" replace />
=======
          path="/escala-equipe"
          element={
            <ProtectedRoute permitido="adm">
              <EscalaEquipe />
>>>>>>> 514b803 (feat: listagem profissionais e escalas)
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute permitido={["cliente", "prestador", "adm"]}>
              <Perfil />
            </ProtectedRoute>
          }
        />

<<<<<<< HEAD
        <Route path="*" element={<RoleRedirect />} />
=======
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
>>>>>>> 514b803 (feat: listagem profissionais e escalas)

      </Routes>

    </BrowserRouter>

  );
}

export default App;
