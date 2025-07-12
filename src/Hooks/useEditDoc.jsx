import { useReducer } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useEditeDoc = () => {
  const initialState = {
    loading: false,
    error: null,
    success: false,
  };
  const insertReducer = (state, action) => {
    switch (action.type) {
      case "LOADING":
        return { loading: true, error: null, success: false };
      case "ERROR":
        return { loading: false, error: action.payload, success: false };
      case "SUCCESS":
        return { loading: false, error: null, success: true };
      case "RESET":
        return { loading: false, error: null, success: false };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(insertReducer, initialState);

  const editeDoc = async (collectionName, id, data) => {
    try {
      dispatch({ type: "LOADING" });
      await setDoc(doc(db, collectionName, id), data);
      dispatch({ type: "SUCCESS" });
      setTimeout(() => dispatch({ type: "RESET" }), 2000);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ERROR",
        payload: "Erro ao tentar editar. Tente novamente mais tarde",
      });
    }
    return data;
  };
  return { ...state, editeDoc };
};
