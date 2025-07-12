//Css
import styles from "./TableUser.module.css";

//Ícones

import { FaTrash } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

//Hooks

import { useDeleteDoc } from "../Hooks/useDeleteDoc";
import { useState } from "react";

const TableTeacher = ({ data }) => {
  const [professores, setProfessores] = useState(data);
  const { deleteDocument, success, error } = useDeleteDoc();

  const handleDeleteDoc = async (id) => {
    await deleteDocument("professor", id);

    if (error) {
      alert(error);
      return;
    }

    if (success) {
      setProfessores((previewProfessores) =>
        previewProfessores.filter((professor) => professor.id !== id)
      );
    }
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nome e foto</th>
          <th>Disciplina</th>
          <th>Número de aulas</th>
          <th>Eliminar</th>
          <th>Mensagem</th>
        </tr>
      </thead>
      <tbody>
        {professores.map((professor) => (
          <tr key={professor.uid}>
            <td style={{ display: "flex", gap: "15px", alignItems: "end" }}>
              <img
                src={professor.photoURL}
                alt="Foto de perfil"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "40px",
                }}
              />
              <div>
                <p>{professor.email}</p>
                <p>{professor.name}</p>
              </div>
            </td>
            <td>{professor.disciplina}</td>
            <td>{professor.numeroDeAulas ? professor.numeroDeAulas : 0}</td>
            <td>
              <button onClick={() => handleDeleteDoc(professor.id)}>
                <FaTrash size={20} color="red" cursor="pointer" />
              </button>
            </td>
            <td>
              <FaPaperPlane size={20} color="#06bbcc" cursor="pointer" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTeacher;
