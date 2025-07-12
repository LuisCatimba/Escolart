//Css

import styles from './AdminNossosCursos.module.css';

//Icons
import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserSlash,
  FaCalendarPlus,
} from 'react-icons/fa';

//Components

import Card from '../../ComponentsAdmin/Card';
import FormRegisterCursos from '../../ComponentsAdmin/FormRegisterCursos';
import TableCourses from '../../ComponentsAdmin/TableCourses';

//Hooks

import { useState } from 'react';
import { useGetData } from '../../Hooks/useGetData';
import { useCountUp } from '../../Hooks/useCountUp';
import Loading from '../../Componentes/Loading';

//icons armazenados em um array com o atributo e label e o total

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

const AdminNossosCursos = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading } = useGetData('Cursos');

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

  return (
    <div className={styles.AdminNossosCursosConteiner}>
      {!loading ? (
        <>
          <h4>Cursos mais procurados</h4>
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
          {openModal && <FormRegisterCursos setOpenModal={setOpenModal} />}
          <TableCourses data={data} />
          <div className={styles.openModalToRegisterCourse}>
            <button onClick={() => setOpenModal(true)}>Cadastrar curso</button>
          </div>
        </>
      ) : (
        <Loading text="Carregando..." />
      )}
    </div>
  );
};

export default AdminNossosCursos;
