//Css

import styles from "./AccountMenu.module.css";

//Data

import { userMenuOptions } from "./QualitiesEPrincipios";

//Hook

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useLogOut } from "../Hooks/useLogOut";

const AccountMenu = ({ openAccountMenu, setOpenAccountMenu }) => {
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const { logOut } = useLogOut();

  const handleSubmit = async (action) => {
    setOpenAccountMenu(false);
    switch (action) {
      case "edit-profile":
        navigate("/edit-profile");
        return;

      case "logout":
        await logOut();
        setUser(null);
        navigate("/entrar");
        return;

      case "change-password":
        navigate("/change-password");
        return;
    }
  };
  return (
    <div
      className={
        openAccountMenu
          ? styles.ConteinerAccountMenu
          : `${styles.ConteinerAccountMenu} ${styles.desactive}`
      }
    >
      <ul>
        {userMenuOptions.map((userMenuOption) => {
          return (
            <li
              key={userMenuOption.label}
              onClick={() => handleSubmit(userMenuOption.action)}
            >
              {userMenuOption.icon} <p>{userMenuOption.label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AccountMenu;
