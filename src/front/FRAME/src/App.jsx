import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Login from "./Pages/Login/Login";
import HomeClient from "./Pages/HomeClient/HomeClient";
import Perfil from "./Pages/Perfil/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Raiz: Landing Page */}
        <Route path="/" element={<Home />} />
        
        {/* Rotas de Autenticação */}
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rota do Dashboard (Onde o "Pedro" aparece) */}
        {/* Mudamos de /home-cliente para /client para bater com o seu teste */}
        <Route path="/client" element={<HomeClient />} />
        
        {/* Rota de Perfil */}
        <Route path="/perfil" element={<Perfil />} />

        {/* Redirecionamento de segurança: 
            Se digitar qualquer coisa errada, volta para a Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;