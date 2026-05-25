import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Login from "./Pages/Login/Login";
import HomeClient from "./Pages/HomeClient/HomeClient";
import Perfil from "./Pages/Perfil/Perfil";
import HomeProfissional from "./Pages/HomeProfissional/HomeProfissional";
import HomeAdm from "./Pages/HomeAdm/HomeAdm";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/login" element={<Login />} />

        {/* CLIENTE */}
        <Route
          path="/home-cliente"
          element={
            <ProtectedRoute permitido="cliente">
              <HomeClient />
            </ProtectedRoute>
          }
        />

        {/* PROFISSIONAL */}
        <Route
          path="/home-profissional"
          element={
            <ProtectedRoute permitido="prestador">
              <HomeProfissional />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/home-adm"
          element={
            <ProtectedRoute permitido="adm">
              <HomeAdm />
            </ProtectedRoute>
          }
        />

        {/* PERFIL */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute permitido={["cliente", "prestador", "adm"]}>
              <Perfil />
            </ProtectedRoute>
          }
        />

        {/* ROTA PADRÃO */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;