//Css

import styles from './FormComentarios.module.css';

//Hooks
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { useInsertComentary } from '../Hooks/usesInsertComentary';
import { useInsertComentary } from '../Hooks/useInsertComentary';
import { useAuth } from '../Hooks/useAuth';
import { useGetDoc } from '../Hooks/useGetDoc';

//Firebase

import { Timestamp } from 'firebase/firestore';

//Component

import Message from './Message';

const FormCommentAboutTeacher = ({ setCommentsWithAuthor }) => {
  const [text, setText] = useState('');
  const [userDoc, setUserDoc] = useState();

  //Id do professor para qual foi feito o comentário

  const { id } = useParams();

  const { error, loading, success, comentary, dispatch, insertComentary } =
    useInsertComentary();
  const { user } = useAuth();
  const { getDocument } = useGetDoc();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() == '') {
      dispatch({
        type: 'ERROR',
        payload: 'Escreve algo sobre o professor para comentar.',
      });
    }

    const newCommentAboutTeacher = {
      authID: user.uid,
      createdAt: Timestamp.now(),
      like: [],
      desLikes: [],
      TeacherID: id,
      text,
    };

    await insertComentary('ComentarioSobreUmProfessor', newCommentAboutTeacher);
  };

  useEffect(() => {
    const fetchDoc = async () => {
      const doc = await getDocument('aluno', user.uid);
      if (doc) {
        console.log(doc);
        setUserDoc(doc);
      }
    };
    fetchDoc();
  }, []);

  useEffect(() => {
    if (success) {
      setCommentsWithAuthor((prev) => [
        { ...{ ...comentary, text }, author: { ...userDoc } },
        ...prev,
      ]);
    }

    //Limpando o textarea

    setText('');

    //Resetando success

    const timer = setTimeout(() => dispatch({ type: 'RESET' }), 3000);
    return () => clearTimeout(timer);
  }, [success]);
  return (
    <div className={styles.FormComentarios}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Comente</span>
          <textarea
            value={text}
            placeholder="Escreva o que achas deste professor"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </label>
        <button disabled={loading}>
          {!loading ? 'Comentar' : 'Aguarde...'}
        </button>
        {error && <Message type="error" message={error} />}
        {success && (
          <Message type="success" message="Comentario feito com sucesso!" />
        )}
      </form>
    </div>
  );
};

export default FormCommentAboutTeacher;
