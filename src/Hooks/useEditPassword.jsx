import { auth } from '../firebase/config';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { useReducer } from 'react';

export const useEditPassword = () => {
  const inittialReducer = {
    error: null,
    loading: false,
    success: false,
  };

  const inserteReducer = (state, action) => {
    switch (action.type) {
      case 'ERROR':
        return { error: action.payload, loading: false, success: false };
      case 'LOADING':
        return { error: null, loading: true, success: false };
      case 'SUCCESS':
        return { error: null, loading: false, success: true };
      case 'RESET':
        return inittialReducer;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(inserteReducer, inittialReducer);

  const editPassword = async (senhaActual, newPassword) => {
    const user = auth.currentUser;

    if (!user) {
      dispatch({ type: 'ERROR', payload: 'Usuário não autenticado!' });
      return;
    }

    const credencial = EmailAuthProvider.credential(user.email, senhaActual);

    try {
      dispatch({ type: 'LOADING' });

      //Reautenticado user
      await reauthenticateWithCredential(user, credencial);

      //Actualizando a senha
      await updatePassword(user, newPassword);

      dispatch({ type: 'SUCCESS' });
    } catch (error) {
      let msgError = '';
      if (error.code.includes('auth/invalid-credential')) {
        msgError = 'Senha antiga errada.';
      } else if (error.code.includes('auth/weak-password')) {
        msgError =
          'Você precisa iniciar sessão novamente para alterar  a senha!';
      }

      dispatch({ type: 'ERROR', payload: msgError });
    }
  };
  return { ...state, dispatch, editPassword };
};
