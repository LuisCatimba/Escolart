//Css

import styles from "./TableUser.module.css";

//Ícones

import { FaTrash } from "react-icons/fa";

//Hooks

import { useDeleteDoc } from "../Hooks/useDeleteDoc";
import { useState } from "react";

const TableUser = ({ data }) => {
  const { deleteDocument, erro } = useDeleteDoc();
  const [users, setUsers] = useState(data);

  const handleDeleteDoc = async (id) => {
    try {
      await deleteDocument("users", id);
      setUsers((prevState) => prevState.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
      alert(erro);
    }
  };

  const mesesAbreviados = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Status</th>
          <th>Cadastrou-se em</th>
          <th>Último Login</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td style={{ textTransform: "capitalize" }}>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <p className={styles.status}>{"active"}</p>
            </td>
            <td>
              {mesesAbreviados[user.month]} de {user.year}
            </td>
            <td style={{ color: "red" }}>
              {user.lastLogin || "Não registrado"}
            </td>
            <td>
              <button onClick={() => handleDeleteDoc(user.id)}>
                <FaTrash size={20} color="red" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableUser;
