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

// Forçando a importação limpa dos dois arquivos distintos
import FormularioCliente from "./PAGES/Eventos/PaginaEventos"; 
import PainelAdministrador from "./PAGES/Eventos/PaginaEventosAdm"; 

import HomeProfissional from "./Pages/HomeProfissional/HomeProfissional";
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

        {/* ROTA DO FORMULÁRIO (Apontando explicitamente para o componente do formulário) */}
        <Route
          path="/novo-evento"
          element={
            <ProtectedRoute permitido="cliente">
              <FormularioCliente />
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

        {/* ADMINISTRADOR */}
        <Route
          path="/home-adm"
          element={
            <ProtectedRoute permitido="adm">
              <PainelAdministrador />
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
