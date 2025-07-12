//Css

import styles from './UserAvatar.module.css';

//Css

import { useAuth } from '../Hooks/useAuth';

const UserAvatar = ({ onClick }) => {
  const { user } = useAuth();
  return (
    <div className={styles.ConteinerUserAvatar} onClick={onClick}>
      {user.photoURL ? (
        <img src={user.photoURL} alt="Foto de perfil" />
      ) : (
        <div>{user.displayName.charAt(0).toUpperCase()}</div>
      )}
    </div>
  );
};

export default UserAvatar;
