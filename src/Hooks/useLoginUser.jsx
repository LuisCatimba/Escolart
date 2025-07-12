import { useReducer } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const initialReducer = {
  error: null,
  loading: false,
  success: false,
  user: null,
};

const authReducerLogin = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

export const useLoginUser = () => {
  const [state, dispatch] = useReducer(authReducerLogin, initialReducer);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOADING' });
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      console.log(user);
      dispatch({ type: 'SUCCESS', payload: user });
    } catch (error) {
      let msgError;
      if (
        error.message.includes('Firebase: Error (auth/network-request-failed).')
      ) {
        msgError = 'Conecte-se a internet';
      } else {
        msgError = 'Email ou senha errado.';
      }

      dispatch({ type: 'ERROR', payload: msgError });
    }
  };
  return { ...state, login };
};
