import { db } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";

export const useDeleteDoc = () => {
  const [erro, setErro] = useState(null);
  const [success, setSuccess] = useState(false);
  const deleteDocument = async (colectionName, id) => {
    setSuccess(false);
    setErro(null);
    try {
      await deleteDoc(doc(db, colectionName, id));
      setSuccess(true);
    } catch (error) {
      setErro(`Erro ao eliminar o documento ${id}.`);
      setSuccess(false);
      console.log(error);
    }
  };
  return { deleteDocument, erro, success };
};
