//Css

import styles from './SidebarAdmin.module.css';

//Hooks

import { useAuth } from '../Hooks/useAuth';
import { useLogOut } from '../Hooks/useLogOut';

//Link React-router-dom

import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//Ícones

import {
  FaHome,
  FaUser,
  FaChalkboardTeacher,
  FaCog,
  FaSignOutAlt,
  FaGraduationCap,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { BsBookHalf } from 'react-icons/bs';

const SidebarAdmin = () => {
  const { setAdmin } = useAuth();
  const { logOut } = useLogOut();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    setAdmin(null);
    navigate('/entrar');
  };

  return (
    <div className={styles.sibarAdmin}>
      <div>
        <p>
          <h2>DashBoard</h2>
        </p>
        <ul className={styles.items}>
          <li>
            <NavLink
              end
              to="/admin/"
              className={({ isActive }) =>
                isActive ? 'linkActive' : 'linkInactive'
              }
            >
              <FaHome size={24} />
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? 'linkActive' : 'linkInactive'
              }
            >
              <FaUser size={24} />
              <p>Users</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/nossosCursos"
              className={({ isActive }) =>
                isActive ? 'linkActive' : 'linkInactive'
              }
            >
              <FaGraduationCap size={24} />
              <p>Nossos cursos</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/professores"
              className={({ isActive }) =>
                isActive ? 'linkActive' : 'linkInactive'
              }
            >
              <FaChalkboardTeacher size={24} />
              <p> Professores</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/aulas"
              className={({ isActive }) =>
                isActive ? 'linkActive' : 'linkInactive'
              }
            >
              <BsBookHalf size={24} /> <p>Aulas</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/denuncias"
              className={({ isActive }) =>
                isActive ? 'linkActive' : 'linkInactive'
              }
            >
              <FaExclamationTriangle size={24} /> <p>Denúncias</p>
            </NavLink>
          </li>
        </ul>
      </div>
      <button className={styles.logOutButton} onClick={handleLogOut}>
        <FaSignOutAlt size={20} />
      </button>
    </div>
  );
};

export default SidebarAdmin;
