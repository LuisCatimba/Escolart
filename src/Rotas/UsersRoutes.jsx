import { Routes, Route, Navigate } from 'react-router-dom';

// Componentes
import NavBar from '../Componentes/NavBar';
import Footer from '../Componentes/Footer';
import MenuLateral from '../Componentes/MenuLateral';

// Pages
import Home from '../Pages/Home/Home';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Login from '../Pages/Auth/Login';
import Cadastro from '../Pages/Auth/Cadastro';
import EditProfile from '../Pages/EditProfile/EditProfile';
import EditPasssword from '../Pages/EditPassword/EditPassword';
import MarcarAula from '../Pages/MarcarAula/MarcarAula';
import AboutTeacher from '../Pages/AboutTeacher/AboutTeacher';
import MinhasAulas from '../Pages/MInhasAulas/MinhasAulas';
import DenunciaProfessor from '../Pages/DenunciarProfessor/DenunciarProfesessor';
import AboutCourse from '../Pages/AboutCourse/AboutCourse';
import Page404 from '../Pages/Page404/Page404';

// Contextos
import { ContextUserProvider } from '../Context/ContextUser';
import { MenuLateralProvider } from '../Context/ContextMenuLateral';
import { ContextTeacherProvider } from '../Context/ContextTeacher';
//Hooks

import { useAuth } from '../Hooks/useAuth';

// Primeiro provemos os Contextos, depois usamos

const UsersRouter = () => {
  return (
    <ContextUserProvider>
      <MenuLateralProvider>
        <ContextTeacherProvider>
          <UsersRouterContent />
        </ContextTeacherProvider>
      </MenuLateralProvider>
    </ContextUserProvider>
  );
};

// Esse componente está dentro dos Providers, então pode usar o useContext
const UsersRouterContent = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <NavBar />
      <MenuLateral />
      <div className="conteiner">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route
            path="/entrar"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/cadastrar"
            element={!user ? <Cadastro /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-profile"
            element={user ? <EditProfile /> : <Navigate to="/entrar" />}
          />
          <Route
            path="/change-password"
            element={user ? <EditPasssword /> : <Navigate to="/entrar" />}
          />
          <Route
            path="/marcar-aula"
            element={user ? <MarcarAula /> : <Navigate to="/entrar" />}
          />
          <Route path="/sobre-professor/:id" element={<AboutTeacher />} />
          <Route
            path="/minhas-aulas/:id"
            element={user ? <MinhasAulas /> : <Navigate to="/entrar" />}
          />
          <Route
            path="/denunciar-professor/:id"
            element={user ? <DenunciaProfessor /> : <Navigate to="/entrar" />}
          />
          <Route path="/sobre-curso/:id" element={<AboutCourse />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default UsersRouter;
