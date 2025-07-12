//firebase

import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { useReducer } from 'react';

const initialReducer = {
  loading: false,
  user: null,
  sucess: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, user: null, sucess: false };

    case 'SUCCESS':
      return {
        loading: false,
        user: action.payload,
        sucess: true,
        error: null,
      };

    case 'ERROR':
      return {
        loading: false,
        user: null,
        sucess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const useRegisterUser = () => {
  const [state, dispatch] = useReducer(authReducer, initialReducer);

  const register = async (usuario) => {
    try {
      dispatch({
        type: 'LOADING',
      });

      //create an user

      const { user } = await createUserWithEmailAndPassword(
        auth,
        usuario.email,
        usuario.password,
      );

      const data = new Date();

      //update an user

      await updateProfile(user, {
        displayName: usuario.name,
        photoURL: usuario.urlImage || '',
      });

      //Salvando user no firestore database
      await setDoc(doc(db, usuario.category, user.uid), {
        name: usuario.name,
        email: usuario.email,
        category: usuario.category,
        month: data.getMonth(),
        year: data.getFullYear(),
        createdAt: serverTimestamp(),
        photoURL: usuario.urlImage || '',
        ...(usuario.category === 'professor' && {
          disciplina: usuario.disciplina,
          aboutTeacher: usuario.aboutTeacher,
        }),
      });
      console.log('Salvou no firestore!');

      dispatch({ type: 'SUCCESS', payload: user });
    } catch (error) {
      let msgError;
      if (error.message.includes('Password should be at least 6 characters')) {
        msgError = 'Senha precisa ter pelo menos 6 caracteres.';
      } else if (error.message.includes('auth/email-already-in-use')) {
        msgError = 'Cadastre-se com outro email';
      } else if (error.message.includes('auth/network-request-failed')) {
        msgError = 'Conecte-se a internet';
      } else {
        dispatch({ type: 'ERROR', payload: error.message });
      }

      dispatch({ type: 'ERROR', payload: msgError });
    }
  };

  return { ...state, register, dispatch };
};
