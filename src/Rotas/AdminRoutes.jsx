//React Router

import { Routes, Route, Navigate } from 'react-router-dom';

//Componentes

import SidebarAdmin from '../ComponentsAdmin/SidebarAdmin';
import TopBar from '../ComponentsAdmin/TopBar';

//Pages

import HomeAdmin from '../PagesAdmin/AdminHome/AdminHome';
import AdminUsers from '../PagesAdmin/AdminUsers/AdminUsers';
import AdminProfessores from '../PagesAdmin/AdminProfessores/AdminProfessores';
import AdminAulas from '../PagesAdmin/AdminAulas/AdminAulas';
import AdminNossosCursos from '../PagesAdmin/AdminNossosCursos/AdminNossosCursos';
import AdminDenuncias from '../PagesAdmin/AdminDenuncias/AdminDenuncias';
import Page404 from '../Pages/Page404/Page404';
import LerDenuncia from '../PagesAdmin/LerDenuncia/LerDenuncia';

//Contextos

import { ContextUserProvider } from '../Context/ContextUser';

//Hooks

import { useAuth } from '../Hooks/useAuth';
import { useEffect } from 'react';

const AdminRoutes = () => {
  const { admin, loading } = useAuth();

  useEffect(() => {
    console.log(admin);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <ContextUserProvider>
      {admin ? (
        <>
          <SidebarAdmin />
          <div className="conteinerAdmin">
            <TopBar />
            <Routes>
              <Route path="/" element={<HomeAdmin />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/professores" element={<AdminProfessores />} />
              <Route path="/aulas" element={<AdminAulas />} />
              <Route path="/nossosCursos" element={<AdminNossosCursos />} />
              <Route path="/denuncias" element={<AdminDenuncias />} />
              <Route path="*" element={<Page404 />} />
              <Route path="/lerDenuncia/:id" element={<LerDenuncia />} />
            </Routes>
          </div>
        </>
      ) : (
        <Navigate to="/404Page" />
      )}
    </ContextUserProvider>
  );
};

export default AdminRoutes;
