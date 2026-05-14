import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Login from "./Pages/Login/Login";
import HomeClient from "./Pages/HomeClient/HomeClient";
import Perfil from "./Pages/Perfil/Perfil";
import PaginaEventos from "./PAGES/Eventos/PaginaEventos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home-cliente" element={<HomeClient />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* Nova rota para a tela que você está criando conforme o Figma */}
        <Route path="/eventos" element={<PaginaEventos />} />

        {/* Redireciona qualquer rota inexistente para a Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;