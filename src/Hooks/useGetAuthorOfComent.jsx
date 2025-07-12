import { useCallback, useReducer } from 'react';
import { useGetDoc } from './useGetDoc';

export const useGetAuthorOfComent = () => {
  const initialReducer = {
    error: null,
    loading: false,
    data: null,
    success: false,
  };

  const insertReducer = (state, action) => {
    switch (action.type) {
      case 'ERROR':
        return {
          error: action.payload,
          loading: false,
          data: null,
          success: false,
        };
      case 'LOADING':
        return { error: null, loading: true, success: false };
      case 'SUCCESS':
        return {
          error: null,
          loading: false,
          success: true,
          data: action.payload,
        };
      case 'RESET':
        return { error: null, loading: false, success: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(insertReducer, initialReducer);
  const { getDocument } = useGetDoc();

  const getAuthorOfComent = useCallback(
    async (comentarios) => {
      let comentariosWithAuthor = {};
      try {
        dispatch({ type: 'LOADING' });

        comentariosWithAuthor = await Promise.all(
          comentarios.map(async (comentario) => {
            const author = await getDocument('aluno', comentario.authID);
            if (comentario.teacherID) {
              const denunciado = await getDocument(
                'professor',
                comentario.teacherID,
              );
              return { ...comentario, author, denunciado };
            } else {
              return { ...comentario, author };
            }
          }),
        );

        dispatch({ type: 'SUCCESS', data: comentariosWithAuthor });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error });
        return [];
      }

      return comentariosWithAuthor;
    },
    [getDocument],
  );

  return { ...state, dispatch, getAuthorOfComent };
};
