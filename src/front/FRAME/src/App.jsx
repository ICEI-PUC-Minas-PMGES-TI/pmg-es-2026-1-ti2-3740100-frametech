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
import PaginaEventos from "./PAGES/Eventos/PaginaEventos";
import HomeProfissional from "./Pages/HomeProfissional/HomeProfissional";



import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        /> 



        
        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

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

        <Route
          path="/perfil"
          element={<Perfil />}
        />

        <Route
          path="/eventos"
          element={<PaginaEventos />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;