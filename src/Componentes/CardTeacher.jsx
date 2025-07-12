//Css

import styles from './Card.module.css';

//Hook

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

//Context

import { ContextTeacher } from '../Context/ContextTeacher';

const CardTeacher = ({ teacher }) => {
  const { setTeacher } = useContext(ContextTeacher);
  const Navigate = useNavigate();

  useEffect(() => {
    setTeacher(null);
  }, []);

  const { user } = useAuth();

  const marcarAula = (teacher) => {
    if (user) {
      setTeacher(teacher);
      Navigate('/marcar-aula');
      console.log(teacher);
    } else {
      Navigate('/entrar');
    }
  };
  return (
    <div className={styles.Card}>
      <img src={teacher.photoURL} alt="Teacher photo" />
      <h3>{teacher.name}</h3>
      <p>{teacher.disciplina}</p>
      <div className="buttons">
        <button onClick={() => marcarAula(teacher)}>Marcar aula</button>
        <button onClick={() => Navigate(`sobre-professor/${teacher.id}`)}>
          Sobre o professor
        </button>
      </div>
    </div>
  );
};

export default CardTeacher;
