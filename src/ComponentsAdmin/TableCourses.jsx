//Css

import styles from '../ComponentsAdmin/TableUser.module.css';

//Ícones

import { FaTrash, FaEdit } from 'react-icons/fa';

//Hook

import { useDeleteDoc } from '../Hooks/useDeleteDoc';
import { useConverteValue } from '../Hooks/useConverteValue';
import { useState } from 'react';

//Componentes

import FormEditeCursos from './FormEditeCursos';

const TableCourses = ({ data }) => {
  const [cursos, setCursos] = useState(data);
  const { deleteDocument, erro } = useDeleteDoc();
  const [openModal, setOpenModal] = useState(false);
  const [cursoEdite, setCursoEdite] = useState(null);
  const { converteValue } = useConverteValue();

  const deleteCurso = async (id) => {
    await deleteDocument('Cursos', id);

    if (erro) {
      alert(erro);
      return;
    }

    setCursos((prevCursos) => prevCursos.filter((curso) => curso.id !== id));
  };

  const editeCurso = (curso) => {
    setOpenModal(true);
    setCursoEdite(curso);
  };
  return (
    <>
      {openModal && (
        <FormEditeCursos
          setOpenModal={setOpenModal}
          cursoEdite={cursoEdite}
          setCursos={setCursos}
        />
      )}
      {cursos.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th style={{ textAlign: 'center' }}>Núnero de alunos</th>
              <th style={{ textAlign: 'center' }}>Número de professores</th>
              <th style={{ textAlign: 'center' }}>Editar</th>
              <th style={{ textAlign: 'center' }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.name}</td>
                <td>{converteValue(curso.price, 'AOA')}</td>
                <td style={{ textAlign: 'center' }}>
                  {curso.numberStudents ? curso.numberStudents : 0}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {curso.numberStudents ? curso.numberStudents : 13}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => deleteCurso(curso.id)}>
                    <FaTrash size={24} color="red" />
                  </button>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button>
                    <FaEdit
                      size={24}
                      color="#06bbcc"
                      onClick={() => editeCurso(curso)}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: '20px', color: '#ccc' }}>
          Sem cursos cadastrados
        </p>
      )}
    </>
  );
};

export default TableCourses;
