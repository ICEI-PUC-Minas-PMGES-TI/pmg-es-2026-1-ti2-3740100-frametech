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
import Eventos from "./Pages/Eventos/Eventos.jsx";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

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
          path="/perfil"
          element={
            <ProtectedRoute permitido={["cliente", "prestador", "adm"]}>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;