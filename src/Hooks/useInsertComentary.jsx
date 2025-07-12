import { db } from '../firebase/config';
import { useReducer } from 'react';
import { addDoc, collection } from 'firebase/firestore';

export const useInsertComentary = () => {
  const initialReducer = {
    error: null,
    loading: false,
    success: false,
    comentary: null,
  };

  const insertReducer = (state, action) => {
    switch (action.type) {
      case 'ERROR':
        return {
          error: action.payload,
          loading: false,
          success: false,
          comentary: null,
        };

      case 'LOADING':
        return {
          error: null,
          loading: true,
          success: false,
          comentary: null,
        };
      case 'SUCCESS':
        return {
          error: null,
          loading: false,
          success: true,
          comentary: action.payload,
        };
      case 'RESET':
        return {
          error: null,
          loading: false,
          success: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(insertReducer, initialReducer);

  const insertComentary = async (collectionName, comentario) => {
    try {
      dispatch({ type: 'LOADING' });
      const comentarioRef = await addDoc(
        collection(db, collectionName),
        comentario,
      );
      dispatch({ type: 'SUCCESS', payload: comentarioRef });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ERROR',
        payload: 'Erro ao enviar comentário. Tente novamente mais tarde.',
      });
    }
  };

  return { ...state, dispatch, insertComentary };
};
