import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { lazy, Suspense } from "react";

import ProtectedRoute from "./ProtectedRoute";
import ThemeToggle from "./Components/ThemeToggle/ThemeToggle";

import {
    getCurrentUser,
    getHomeByRole
} from "./utils/authRoutes";

const Home = lazy(() => import("./PAGES/HOME/Home"));
const Cadastro = lazy(() => import("./PAGES/Cadastro/Cadastro"));
const Login = lazy(() => import("./PAGES/Login/Login"));
const HomeClient = lazy(() => import("./PAGES/HomeClient/HomeClient"));
const HomeProfissional = lazy(() => import("./PAGES/HomeProfissional/HomeProfissional"));
const HomeAdm = lazy(() => import("./PAGES/HomeAdm/Homeadm"));
const Perfil = lazy(() => import("./PAGES/Perfil/Perfil"));
const Eventos = lazy(() => import("./PAGES/Eventos/Eventos"));
const EscalaEquipe = lazy(() => import("./PAGES/Escalas/EscalaEquipe"));
const GestaoEquipamentos = lazy(() => import("./PAGES/EQUIPAMENTOS/GestaoEquipamentos"));
const ChatEventos = lazy(() => import("./PAGES/ChatEventos/ChatEventos"));
const EsqueciSenha = lazy(() => import("./PAGES/EsqueciSenha/EsqueciSenha"));

function RoleRedirect() {
    const { isAuthenticated, tipoUsuario } = getCurrentUser();

    return (
        <Navigate
            to={isAuthenticated ? getHomeByRole(tipoUsuario) : "/"}
            replace
        />
    );
}

function PublicOnlyRoute({ children }) {
    const { isAuthenticated, tipoUsuario } = getCurrentUser();

    if (isAuthenticated) {
        return <Navigate to={getHomeByRole(tipoUsuario)} replace />;
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <ThemeToggle />

            <Suspense fallback={<div>Carregando...</div>}>
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
                        path="/esqueci-senha"
                        element={
                            <PublicOnlyRoute>
                                <EsqueciSenha />
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
                            <ProtectedRoute permitido={["cliente", "prestador", "adm"]}>
                                <ChatEventos />
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

                    <Route path="*" element={<RoleRedirect />} />

                </Routes>
            </Suspense>

        </BrowserRouter>
    );
}

export default App;