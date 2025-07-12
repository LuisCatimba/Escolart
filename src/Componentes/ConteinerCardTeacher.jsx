//Css

import styles from './ConteinerCard.module.css';

//Hook

import { useEffect, useState } from 'react';
import { useGetData } from '../Hooks/useGetData';

//Components

import CardTeacher from './CardTeacher';
import Loading from './Loading';

const ConteinerCardTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const { data, loading } = useGetData('professor');

  useEffect(() => {
    if (data) {
      setTeachers(data);
    }
  }, [loading, data]);

  return (
    <div className={styles.ConteinerCard}>
      <h2 style={{ color: '#06bbcc' }}>Nossos professores</h2>
      <div>
        {loading ? (
          <Loading text="Buscando professores..." />
        ) : (
          <>
            {teachers.length > 0 ? (
              <>
                {teachers.map((teacher) => (
                  <CardTeacher teacher={teacher} key={teacher.id} />
                ))}
              </>
            ) : (
              <p>Nenhum professor cadastrado</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ConteinerCardTeacher;
