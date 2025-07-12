//Css

import styles from '../../ComponentsAdmin/TableUser.module.css';

//Hooks

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetData } from '../../Hooks/useGetData';
import { useGetAuthorOfComent } from '../../Hooks/useGetAuthorOfComent';
import { useCountUp } from '../../Hooks/useCountUp';

//Pages

import LerDenuncia from '../LerDenuncia/LerDenuncia';

//Components

import Card from '../../ComponentsAdmin/Card';

//Icons

import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserSlash,
  FaCalendarPlus,
} from 'react-icons/fa';
import Loading from '../../Componentes/Loading';

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

const AdminDenuncias = () => {
  const navigate = useNavigate();
  const { loading, data } = useGetData('Denuncias');
  const { loading: loadingAuthor, getAuthorOfComent } = useGetAuthorOfComent();
  const [denunciasWithAuthor, setDenunciasWithAuthor] = useState([]);

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
    if (data) {
      const fetchData = async () => {
        setDenunciasWithAuthor(await getAuthorOfComent(data));
      };

      fetchData();
    }
  }, [data, getAuthorOfComent]);

  return (
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
      {!loading && !loadingAuthor ? (
        <div
          style={{
            width: '90%',
            height: 'auto',
            margin: 'auto',
          }}
        >
          {denunciasWithAuthor.length > 0 ? (
            <>
              <h3 style={{ color: '#06bbcc', margin: '20px 0 0 18px' }}>
                Novas denúncias
              </h3>
              <table className={styles.table} style={{ margin: ' 30px auto ' }}>
                <thead>
                  <tr>
                    <th>Denunciante</th>
                    <th>Email do denunciante</th>
                    <th>Denunciado</th>
                    <th>Título</th>
                    <th>Ler denúncia</th>
                  </tr>
                </thead>
                <tbody>
                  {denunciasWithAuthor.map((denuncia) => (
                    <tr>
                      <td>
                        {denuncia.isAnonima ? 'Anónimo' : denuncia.author.name}
                      </td>
                      <td>
                        {denuncia.isAnonima ? 'Anónimo' : denuncia.author.email}
                      </td>
                      <td>{denuncia.denunciado.name}</td>
                      <td>{denuncia.title}...</td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(`/admin/lerDenuncia/${denuncia.id}`)
                          }
                        >
                          Ler Mais
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div style={{ width: '100%', marginTop: '30px' }}>
              <p
                style={{ textAlign: 'center', fontSize: '18px', color: '#ccc' }}
              >
                Sem novas denúncias
              </p>
            </div>
          )}
        </div>
      ) : (
        <Loading text="Carregando..." />
      )}
    </div>
  );
};

export default AdminDenuncias;
