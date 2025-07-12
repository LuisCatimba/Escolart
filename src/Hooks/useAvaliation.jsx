import { useReducer } from 'react';
import { db } from '../firebase/config';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const useAvaliation = () => {
  const initialReducer = {
    error: null,
    loading: false,
    success: false,
  };

  const inserteReducer = (state, action) => {
    switch (action.type) {
      case 'ERROR':
        return {
          error: action.payload,
          loading: false,
          success: false,
        };

      case 'LOADING':
        return {
          error: null,
          loading: true,
          success: false,
        };
      case 'SUCCESS':
        return {
          error: null,
          loading: false,
          success: true,
        };

      case 'RESET': {
        return { error: null, loading: false, success: false };
      }

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(inserteReducer, initialReducer);

  const avaliar = async (collectionName, id, rating) => {
    try {
      //Referência do doc
      const docRef = doc(db, collectionName, id);

      dispatch({ type: 'LOADING' });
      //Actualizando o doc

      await updateDoc(docRef, { avaliacoes: arrayUnion(rating) });
      dispatch({ type: 'SUCCESS' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'ERROR', payload: 'Erro ao publicar avalião.' });
    }
  };

  return { ...state, dispatch, avaliar };
};
