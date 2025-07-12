//Css

import styles from './FormComentarios.module.css';

//Hooks

import { useEffect, useState } from 'react';
import { useInsertComentary } from '../Hooks/useInsertComentary';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useGetDoc } from '../Hooks/useGetDoc';

//Firebase

import { Timestamp } from 'firebase/firestore';

//Components

import Message from './Message';

const FormComentarios = ({ setCommentsWithAuthor }) => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [userDoc, setUserDoc] = useState();
  const { loading, success, error, comentary, dispatch, insertComentary } =
    useInsertComentary();
  const navigate = useNavigate();
  const { getDocument } = useGetDoc();

  useEffect(() => {
    const fetchDoc = async () => {
      const doc = await getDocument('aluno', user.uid);
      if (doc) {
        setUserDoc(doc);
      }
    };
    fetchDoc();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/entrar');
      return;
    }

    if (text.trim() == '') {
      dispatch({ type: 'ERROR', payload: 'Escreve algo para comentar.' });
      return;
    }

    const newComentary = {
      text,
      like: [],
      desLikes: [],
      createdAt: Timestamp.now(),
      authID: user.uid,
    };

    await insertComentary('comentarios', newComentary);
  };

  useEffect(() => {
    if (success) {
      setCommentsWithAuthor((prev) => [
        { ...{ ...comentary, text: text }, author: { ...userDoc } },
        ...prev,
      ]);
      setText('');
    }
  }, [success]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch({ type: 'RESET' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <div className={styles.FormComentarios}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Comente</span>
          <textarea
            placeholder="Comente o que achas sobre os nossos serviços"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </label>
        <button disabled={loading}>
          {!loading ? 'Comentar' : 'Aguarde...'}
        </button>
        {error && <Message message={error} type="error" />}
        {success && (
          <Message message="Comentário enviado com sucesso!" type="success" />
        )}
      </form>
    </div>
  );
};

export default FormComentarios;
