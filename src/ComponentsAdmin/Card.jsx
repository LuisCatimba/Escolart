//Css

import styles from './Card.module.css';

const Card = ({ icon: Icon, total, label }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <Icon size={30} color="white" />
      </div>
      <div className={styles.total}>
        <h2>{total}</h2>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default Card;
