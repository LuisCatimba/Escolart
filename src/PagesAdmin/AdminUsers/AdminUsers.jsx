//Css

import './AdminUser.css';

//Hooks
import { useGetData } from '../../Hooks/useGetData';
import { useCountUp } from '../../Hooks/useCountUp';

//Components

import TableUser from '../../ComponentsAdmin/tableUsers';
import UserGrowthChart from '../../ComponentsAdmin/UserGrowthChart';
import Card from '../../ComponentsAdmin/Card';

import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaCalendarPlus,
} from 'react-icons/fa';
import Loading from '../../Componentes/Loading';

const AdminUsers = () => {
  const { data, loading } = useGetData('aluno');

  const mesesAbreviados = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const icons = [
    { icon: FaUsers, total: 165, label: 'Users' },
    { icon: FaUserCheck, total: 125, label: 'Users Activos' },
    { icon: FaUserSlash, total: 45, label: 'Users Inactivos' },
    {
      icon: FaCalendarPlus,
      total: 65,
      label: `Cadastros em ${mesesAbreviados[new Date().getMonth()]}`,
    },
  ];

  const totalUsers = useCountUp(icons[0].total, 100);
  const totalUsersActive = useCountUp(icons[1].total, 2000);
  const totalUsersInactive = useCountUp(icons[2].total, 2000);
  const totalCadastrosNoMes = useCountUp(icons[3].total, 2000);

  const totalCards = [
    totalUsers,
    totalUsersActive,
    totalUsersInactive,
    totalCadastrosNoMes,
  ];

  return (
    <div className="ConteinerAdminUsers">
      {loading ? (
        <div className="conteinerLoading">
          <Loading text="Carregando..." />
        </div>
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <div className="cards">
                {icons.map((icon, pos) => {
                  return (
                    <Card
                      icon={icon.icon}
                      total={totalCards[pos]}
                      label={icon.label}
                      key={icon.label}
                    />
                  );
                })}
              </div>
              <div className="table_Grafico">
                <TableUser data={data} />
                <UserGrowthChart data={data} className="grafico" />
              </div>
            </>
          ) : (
            <span>Nenhum usuário cadastrado</span>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUsers;
