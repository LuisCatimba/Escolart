//Css

import styles from './Comentario.module.css';

//Hooks

import { FaEllipsisV } from 'react-icons/fa';
import { BiLike, BiDislike } from 'react-icons/bi';

//Hooks

import { useAuth } from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import { useUpdateComment } from '../Hooks/useUpdateComment';

const Comentario = ({ comentario }) => {
  const { user } = useAuth();
  const Navigate = useNavigate();
  const { updateComment } = useUpdateComment();

  const reducerLike = (Likes, action) => {
    switch (action.type) {
      case 'LIKE':
        return [user.uid, ...comentario.like];
      case 'REMOVELIKE':
        return comentario.like.filter((id) => user.uid !== id);

      default:
        return Likes;
    }
  };

  const reducerDeslike = (DesLikes, action) => {
    switch (action.type) {
      case 'DESLIKE':
        return [user.uid, ...comentario.desLikes];
      case 'REMOVEDESLIKE':
        return comentario.desLikes.filter((id) => user.uid !== id);
      default:
        return DesLikes;
    }
  };

  const [Likes, dispatchLike] = useReducer(reducerLike, comentario.like || []);
  const [DesLikes, dispatchDeslike] = useReducer(
    reducerDeslike,
    comentario.desLikes || [],
  );

  const handleLike = async (idComment) => {
    if (!user) {
      Navigate('/entrar');
      return;
    }

    let newLikes = [...Likes];
    let newDesLikes = [...DesLikes];

    if (!Likes.includes(user.uid)) {
      newLikes = [user.uid, ...Likes];
      newDesLikes = DesLikes.filter((id) => id !== user.uid);

      dispatchLike({ type: 'LIKE' });
      dispatchDeslike({ type: 'REMOVEDESLIKE' });
    } else {
      newLikes = Likes.filter((id) => user.uid !== id);
      dispatchLike({ type: 'REMOVELIKE' });
    }

    //Verificando a coleção do comentário

    if (comentario.TeacherID) {
      await updateComment(
        idComment,
        'ComentarioSobreUmProfessor',
        newLikes,
        newDesLikes,
      );
    } else {
      await updateComment(idComment, 'comentarios', newLikes, newDesLikes);
    }
  };

  const handleDeslike = async (idComment) => {
    if (!user) {
      Navigate('/entrar');
      return;
    }

    let newLikes = [...Likes];
    let newDesLikes = [...DesLikes];

    if (!DesLikes.includes(user.uid)) {
      newDesLikes = [user.uid, ...DesLikes];
      newLikes = Likes.filter((id) => id !== user.uid);

      dispatchDeslike({ type: 'DESLIKE' });
      dispatchLike({ type: 'REMOVELIKE' });
    } else {
      newDesLikes = DesLikes.filter((id) => user.uid !== id);
      dispatchDeslike({ type: 'DESLIKE' });
    }

    await updateComment(idComment, 'comentarios', newLikes, newDesLikes);
  };

  return (
    <div className={styles.comentario}>
      <header>
        <div className={styles.infoUser}>
          {comentario.author.photoURL ? (
            <img src={comentario.author.photoURL} alt="Foto" />
          ) : (
            <section>
              {comentario.author.name.trim().slice(0, 1).toUpperCase()}
            </section>
          )}
          <div>
            <p className={styles.name}>{comentario.author.name}</p>
            {comentario.author.bio && (
              <p className={styles.bio}>
                {comentario.author.bio.length > 30 ? (
                  <>{comentario.author.bio.slice(0, 27)}...</>
                ) : (
                  <>{comentario.author.bio}</>
                )}
              </p>
            )}
          </div>
        </div>
        <FaEllipsisV />
      </header>
      <main>
        <p className={styles.text}>{comentario.text}</p>
        <div className={styles.handleLike}>
          <div>
            <p>{Likes.length}</p>
            {!user ? (
              <BiLike
                style={{ cursor: 'pointer' }}
                color="#52565b"
                size={20}
                onClick={() => handleLike(comentario.id)}
              />
            ) : Likes.includes(user.uid) ? (
              <BiLike
                style={{ cursor: 'pointer' }}
                color="#06bbcc"
                size={20}
                onClick={() => handleLike(comentario.id)}
              />
            ) : (
              <BiLike
                style={{ cursor: 'pointer' }}
                color="#52565b"
                size={20}
                onClick={() => handleLike(comentario.id)}
              />
            )}
          </div>
          <div>
            <p>{DesLikes.length}</p>
            {!user ? (
              <BiDislike
                style={{ cursor: 'pointer' }}
                color="#52565b"
                size={20}
                onClick={() => handleDeslike(comentario.id)}
              />
            ) : DesLikes.includes(user.uid) ? (
              <BiDislike
                style={{ cursor: 'pointer' }}
                color="#06bbcc"
                size={20}
                onClick={() => handleDeslike(comentario.id)}
              />
            ) : (
              <BiDislike
                style={{ cursor: 'pointer' }}
                color="#52565b"
                size={20}
                onClick={() => handleDeslike(comentario.id)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Comentario;
