import { useReducer } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useRegister = () => {
  const initialState = {
    loading: false,
    error: null,
    success: false,
    idDoc: null,
  };

  const insertReducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return { loading: true, error: null, success: false, idDoc: null };
      case 'ERROR':
        return {
          loading: false,
          error: action.payload,
          success: false,
          idDoc: null,
        };
      case 'SUCCESS':
        return {
          loading: false,
          error: null,
          success: true,
          idDoc: action.payload,
        };
      case 'RESET':
        return { loading: false, error: null, success: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(insertReducer, initialState);

  const register = async (collectionName, data) => {
    try {
      dispatch({ type: 'LOADING' });
      const { id } = await addDoc(collection(db, collectionName), data);
      console.log(id);
      dispatch({ type: 'SUCCESS', payload: id });
      setTimeout(() => dispatch({ type: 'RESET' }), 2000);
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ERROR',
        payload: 'Erro ao cadastrar  curso. Tente novamente.',
      });
    }
  };
  return { ...state, dispatch, register };
};
