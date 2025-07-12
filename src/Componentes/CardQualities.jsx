import styles from "./CardQualities.module.css";

const CardQualities = ({ card }) => {
  return (
    <div className={styles.CardQualities}>
      <div>{card.icon}</div>
      <span>{card.titulo}</span>
      <p>{card.descricao}</p>
      <button>Saber mais</button>
    </div>
  );
};

export default CardQualities;
