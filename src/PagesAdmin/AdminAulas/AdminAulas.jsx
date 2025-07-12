//Css

import styles from '../../ComponentsAdmin/TableUser.module.css';
import stylesCursos from '../AdminNossosCursos/AdminNossosCursos.module.css';

//Hooks
import { useEffect, useState } from 'react';
import { useGetData } from '../../Hooks/useGetData';
import { useGetAuthorOfComent } from '../../Hooks/useGetAuthorOfComent';
import { useCountUp } from '../../Hooks/useCountUp';

//Components

import Card from '../../ComponentsAdmin/Card';
import Loading from '../../Componentes/Loading';

//Icons

import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserSlash,
  FaCalendarPlus,
} from 'react-icons/fa';

const icons = [
  { icon: FaUsers, total: 165, label: 'Língua Portuguesa' },
  { icon: FaChalkboardTeacher, total: 125, label: 'Matemática' },
  { icon: FaUserSlash, total: 45, label: 'Física' },
  {
    icon: FaCalendarPlus,
    total: 65,
    label: 'Química',
  },
];

const AdminAulas = () => {
  const [aulasWithAlunos, setAulasWithAlunos] = useState([]);
  const { data: aulas, loading } = useGetData('Aulas');
  const { loading: loadingGetAluno, getAuthorOfComent } =
    useGetAuthorOfComent();

  const totalStudentLp = useCountUp(icons[0].total, 200);
  const totalStudentMath = useCountUp(icons[1].total, 200);
  const totalStudentPhysis = useCountUp(icons[3].total, 200);
  const totalStudentQuimica = useCountUp(icons[2].total, 200);

  const totalCards = [
    totalStudentLp,
    totalStudentMath,
    totalStudentPhysis,
    totalStudentQuimica,
  ];

  useEffect(() => {
    if (aulas) {
      let AulasPendentes = aulas.filter((aula) => aula.status == 'Pendente');

      AulasPendentes = AulasPendentes.map((aula) => {
        let newObj = aula;
        //Renomeando o atributo do objecto

        if (!aula.authID) {
          aula.authID = aula.idAluno;
          delete aula.idAluno;
        }

        return newObj;
      });

      const fetchNameAluno = async () => {
        setAulasWithAlunos(await getAuthorOfComent(AulasPendentes));
      };

      fetchNameAluno();
    }
  }, [aulas, getAuthorOfComent]);

  return (
    <div className={stylesCursos.AdminNossosCursosConteiner}>
      {!loading && !loadingGetAluno ? (
        <div>
          <div className="cards">
            {icons.map((icon, pos) => (
              <Card
                icon={icon.icon}
                label={icon.label}
                total={totalCards[pos]}
                key={icon.label}
              />
            ))}
          </div>
          {aulasWithAlunos.length > 0 ? (
            <>
              <h3 style={{ color: '#06bbcc', margin: '20px 0 0 18px' }}>
                Aulas pendentes
              </h3>
              <table className={styles.table} style={{ margin: ' 30px auto ' }}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Endereço</th>
                    <th>Nível</th>
                    <th>Horário</th>
                    <th>Disciplina</th>
                    <th>Idade</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {aulasWithAlunos.map((aula) => (
                    <tr>
                      <td>{aula.author.name}</td>
                      <td>{aula.emailAluno}</td>
                      <td>{aula.endereco}</td>
                      <td>{aula.nivelDeConhecimento}</td>
                      <td>{aula.preferenciaDeHorario}</td>
                      <td>{aula.disciplina}</td>
                      <td>{aula.idade}</td>
                      <td>{aula.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            !loading &&
            !loadingGetAluno && (
              <div style={{ with: '100%', marginTop: '20px' }}>
                <p
                  style={{
                    color: '#ccc',
                    margin: 'auto',
                    textAlign: 'center',
                    fontSize: '18px',
                  }}
                >
                  Sem aulas novas
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <Loading text="Carregando..." />
      )}
    </div>
  );
};

export default AdminAulas;
