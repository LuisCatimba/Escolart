import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useReducer } from 'react';

export const useUpdateComment = () => {
  const initialState = {
    error: null,
    loading: false,
    success: false,
  };

  const insertReducer = (state, action) => {
    switch (action.type) {
      case 'ERROR':
        return { error: action.payload, loading: false, success: true };
      case 'LOADING':
        return { error: null, loading: true, success: false };
      case 'SUCCESS':
        return { error: null, loading: false, success: true };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(insertReducer, initialState);

  const updateComment = async (id, collectionName, likes, DesLikes) => {
    try {
      const commentRef = doc(db, collectionName, id);

      dispatch({ type: 'LOADING' });
      await updateDoc(commentRef, {
        like: likes,
        desLikes: DesLikes,
      });
      dispatch({ type: 'SUCCESS' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'ERROR', payload: 'Erro. Tente novamente mais tarde' });
    }
  };

  return { ...state, updateComment };
};
