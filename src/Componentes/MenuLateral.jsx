//Css

import styles from './MenuLateral.module.css';

//Ícones

import { FaTimes } from 'react-icons/fa';

//Hooks

import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from '../Hooks/useAuth';

//Context

import { menuLateral } from '../Context/ContextMenuLateral';

const MenuLateral = () => {
  const { isOpenMenuLateral, setIsOpenMenuLateral } = useContext(menuLateral);
  const { user } = useAuth();
  return (
    <>
      {isOpenMenuLateral && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpenMenuLateral(false)}
        />
      )}
      <div
        className={
          isOpenMenuLateral
            ? `${styles.openMenuLateral} ${styles.activo}`
            : styles.openMenuLateral
        }
      >
        <button onClick={() => setIsOpenMenuLateral(false)}>
          <FaTimes />
        </button>

        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'linkActive' : 'linkInactive'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/AboutUs"
              className={({ isActive }) =>
                isActive ? 'linkActive' : 'linkInactive'
              }
            >
              About us
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to={`/minhas-aulas/${user.uid}`}
                className={({ isActive }) =>
                  isActive ? 'linkActive' : 'linkInactive'
                }
              >
                Minhas aulas
              </NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink
                to="/entrar"
                className={({ isActive }) =>
                  isActive ? 'linkActive' : 'linkInactive'
                }
              >
                Entrar
              </NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink
                to="/cadastrar"
                className={({ isActive }) =>
                  isActive ? 'linkActive' : 'linkInactive'
                }
              >
                Cadastrar
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default MenuLateral;
