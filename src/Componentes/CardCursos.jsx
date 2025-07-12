//Css

import styles from './Card.module.css';

//Hook

import { useConverteValue } from '../Hooks/useConverteValue';
import { useNavigate } from 'react-router-dom';

const CardCursos = ({ curso }) => {
  const { converteValue } = useConverteValue();
  const Navigate = useNavigate();

  return (
    <div className={styles.Card}>
      <img src={curso.urlImage} alt="Imagem do curso." />
      <p>{curso.name}</p>
      <p> {converteValue(curso.price, 'AOA')} por cada 15 dias.</p>
      <button
        className={styles.btnCursos}
        onClick={() => {
          Navigate(`/sobre-curso/${curso.id}`);
        }}
      >
        Ler mais
      </button>
    </div>
  );
};

export default CardCursos;
