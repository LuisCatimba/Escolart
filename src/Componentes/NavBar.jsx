//Css

import styles from './NavBar.module.css';

//Hooks
import { NavLink, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useAuth } from '../Hooks/useAuth';

//ícones

import { BiBook } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';

//Context

import { menuLateral } from '../Context/ContextMenuLateral';

//Components

import UserAvatar from './UserAvatar';
import AccountMenu from './AccountMenu';

const NavBar = () => {
  const { isOpenMenuLateral, setIsOpenMenuLateral } = useContext(menuLateral);
  const { user } = useAuth();
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  return (
    <nav>
      <div className={styles.logo}>
        <BiBook />
        <h3>
          <i>
            <Link style={{ color: '#06bbcc' }} to="/">
              Escolart
            </Link>
          </i>
        </h3>
      </div>
      <div className={styles.ConteinerItems}>
        <div className={styles.items}>
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

        <FaBars
          className={styles.menuIcon}
          onClick={() => setIsOpenMenuLateral(!isOpenMenuLateral)}
        />
        {user && (
          <UserAvatar onClick={() => setOpenAccountMenu(!openAccountMenu)} />
        )}
      </div>
      <AccountMenu
        openAccountMenu={openAccountMenu}
        setOpenAccountMenu={setOpenAccountMenu}
      />
    </nav>
  );
};

export default NavBar;
