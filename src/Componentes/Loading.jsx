import styles from './Loading.module.css';

//Icones

import { FaSpinner } from 'react-icons/fa';

const Loading = ({ text }) => {
  return (
    <div className={styles.conteinerLoading}>
      <FaSpinner size="28px" className={styles.iconeLoading} />
      <p>{text}</p>
    </div>
  );
};

export default Loading;
