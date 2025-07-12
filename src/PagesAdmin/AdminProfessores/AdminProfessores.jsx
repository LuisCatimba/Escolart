import './AdminProfessores.css';

//Components
import Card from '../../ComponentsAdmin/Card';
import TableTeacher from '../../ComponentsAdmin/TableTeacher';
import FormRegisterTeacher from '../../ComponentsAdmin/FormRegisterTeacher';

//Hooks

import { useCountUp } from '../../Hooks/useCountUp';
import { useGetData } from '../../Hooks/useGetData';
import { useState } from 'react';

//Ícones

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

const AdminProfessores = () => {
  const totalTaecherLp = useCountUp(icons[0].total, 100);
  const totalTeacherMath = useCountUp(icons[1].total, 200);
  const totalTeacherPhysis = useCountUp(icons[2].total, 200);
  const totalTeacherQuimica = useCountUp(icons[3].total, 200);
  const { data, loading } = useGetData('professor');
  const [openModal, setOpenModal] = useState(false);

  const totalCardsTeacher = [
    totalTaecherLp,
    totalTeacherMath,
    totalTeacherPhysis,
    totalTeacherQuimica,
  ];
  return (
    <div className="conteinerAdminTeacher">
      {openModal && <FormRegisterTeacher setOpenModal={setOpenModal} />}
      {loading ? (
        <Loading text="Carregando..." />
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <div className="cards">
                {icons.map((icon, pos) => (
                  <Card
                    key={icon.label}
                    icon={icon.icon}
                    total={totalCardsTeacher[pos]}
                    label={icon.label}
                  />
                ))}
              </div>
              <TableTeacher data={data} />
              <div className="openModal">
                <button onClick={() => setOpenModal(true)}>
                  Cadastrar professor
                </button>
              </div>
            </>
          ) : (
            <div className="nenhumProfessor">
              <button onClick={() => setOpenModal(true)}>
                Cadastrar professor
              </button>
              <span>Nenhum professor cadastrado</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProfessores;
