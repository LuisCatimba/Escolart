//Css
import './App.css';

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

//Context

import { ContextUserProvider } from './Context/ContextUser';

//Hooks

import UsersRoutes from './Rotas/UsersRoutes';
import AdminRoutes from './Rotas/AdminRoutes';
import Page404 from './Pages/Page404/Page404';

const App = () => {
  return (
    <ContextUserProvider>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<UsersRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </HashRouter>
    </ContextUserProvider>
  );
};

export default App;
