//Css

import './MinhasAulas.css';
import styles from '../../ComponentsAdmin/TableUser.module.css';

//Hooks

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetData } from '../../Hooks/useGetData';
import Loading from '../../Componentes/Loading';

const MinhasAulas = () => {
  const { loading, data } = useGetData('Aulas');
  const [aulas, setAulas] = useState([]);
  const { id } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setAulas(data.filter((aula) => aula.idAluno === id));
    }
  }, [data]);

  return (
    <div className="conteinerAulas">
      {!loading ? (
        <>
          {aulas.length == 0 ? (
            <div className="semAulas">
              <p>Você ainda não marcou aula</p>
              <button onClick={() => Navigate('/marcar-aula')}>
                Marcar aula
              </button>
            </div>
          ) : (
            <>
              <div className="minhasAulas">
                <h2>Minhas aulas</h2>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>Classe</th>
                    <th>Horário</th>
                    <th>Nível</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {aulas.map((aula) => (
                    <tr>
                      <td>{aula.disciplina}</td>
                      <td>{aula.classe}</td>
                      <td>{aula.preferenciaDeHorario}</td>
                      <td>{aula.nivelDeConhecimento}</td>
                      <td>{aula.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      ) : (
        <Loading text="Carregando..." />
      )}
    </div>
  );
};

export default MinhasAulas;
