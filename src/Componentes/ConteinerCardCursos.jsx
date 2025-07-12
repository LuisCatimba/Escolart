//Css

import styles from './ConteinerCard.module.css';

//Hooks

import { useEffect, useState } from 'react';
import { useGetData } from '../Hooks/useGetData';

//Componentes

import CardCursos from './CardCursos';
import Loading from './Loading';

const ConteinerCardCursos = () => {
  const { data, loading } = useGetData('Cursos');
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    if (data) {
      setCursos(data);
    }
  }, [loading, data]);
  return (
    <div className={styles.ConteinerCard}>
      <h2 style={{ color: '#06bbcc' }}>Nossos cursos</h2>
      <div>
        {loading ? (
          <Loading text="Buscando cursos..." />
        ) : (
          <>
            {cursos.length > 0 ? (
              <>
                {cursos.map((curso) => (
                  <CardCursos curso={curso} key={curso.id} />
                ))}
              </>
            ) : (
              'De momento não dispomos de nenhum curso.'
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ConteinerCardCursos;
