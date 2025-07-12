import { createContext, useState, useEffect } from 'react';

export const ContextUser = createContext();

export const ContextUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  //Para user

  useEffect(() => {
    const fetchDados = async () => {
      const userSalvo = JSON.parse(localStorage.getItem('user'));
      const adminSalvo = JSON.parse(localStorage.getItem('admin'));
      if (userSalvo) {
        setUser(userSalvo);
      }

      if (adminSalvo) {
        setAdmin(adminSalvo);
      }

      setLoading(false);
    };

    fetchDados();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return;
    }
    localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin));
      return;
    }
    localStorage.removeItem('admin');
  }, [admin]);

  return (
    <ContextUser.Provider value={{ user, setUser, admin, setAdmin, loading }}>
      {children}
    </ContextUser.Provider>
  );
};
