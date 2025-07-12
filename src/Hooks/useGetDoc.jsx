import { useCallback, useReducer } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useGetDoc = () => {
  const initialState = {
    loading: false,
    error: null,
    success: false,
    document: null,
  };

  const insertReducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return { loading: true, error: null, success: false, document: null };
      case 'ERROR':
        return {
          loading: false,
          error: action.payload,
          success: false,
          document: null,
        };
      case 'SUCCESS':
        return {
          loading: false,
          error: null,
          success: true,
          document: action.payload,
        };
      case 'RESET': {
        return { ...state, loading: false, error: null, success: false };
      }

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(insertReducer, initialState);

  const getDocument = useCallback(
    async (collectionName, id) => {
      try {
        dispatch({ type: 'LOADING' });

        const docRef = doc(db, collectionName, id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = { ...snapshot.data(), id: snapshot.id };

          dispatch({ type: 'SUCCESS', payload: data });
          return data;
        } else {
          dispatch({ type: 'ERROR', payload: 'Documento não encontrado.' });
        }

        return null;
      } catch (error) {
        console.log(error);
        dispatch({
          type: 'ERROR',
          payload: 'Erro. Tente novamente mais tarde.',
        });
      }
    },
    [dispatch],
  );
  return {
    ...state,
    getDocument,
  };
};
