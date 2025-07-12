//Css

import styles from './Comentarios.module.css';

//Components

import FormComentarios from './FormComentarios';
import FormCommentAboutTeacher from './FormCommentAboutTeacher';
import Comentario from './Comentario';
import Loading from './Loading';

//Hooks

import { useEffect, useState } from 'react';
import { useGetAuthorOfComent } from '../Hooks/useGetAuthorOfComent';
import { useAuth } from '../Hooks/useAuth';

//Swiper

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Comentarios = ({ comentarios, title }) => {
  const [commentsWithAuthor, setCommentsWithAuthor] = useState([]);
  const [slidesPerview, setSlidePerview] = useState(3);

  const { user } = useAuth();
  const { loading, getAuthorOfComent } = useGetAuthorOfComent();

  useEffect(() => {
    const fetchData = async () => {
      if (comentarios.length > 0) {
        setCommentsWithAuthor(await getAuthorOfComent(comentarios));
      }
    };

    fetchData();
  }, [getAuthorOfComent, comentarios]);

  useEffect(() => {
    const updateSlidePerview = () => {
      if (window.innerWidth <= 720) {
        setSlidePerview(1);
      } else {
        setSlidePerview(3);
      }
    };

    updateSlidePerview();

    window.addEventListener('resize', updateSlidePerview);

    return () => {
      window.removeEventListener('resize', updateSlidePerview);
    };
  }, []);

  return (
    <div className={styles.ConteinerComentarios}>
      <div className={styles.comentarios}>
        {!loading ? (
          <>
            <h2>{title}</h2>
            <div className={styles.conteinerSwiper}>
              {commentsWithAuthor.length > 0 ? (
                <Swiper
                  slidesPerView={slidesPerview}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                >
                  {commentsWithAuthor.map((comentario) => (
                    <SwiperSlide key={comentario.id}>
                      <Comentario comentario={comentario} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className={styles.semComentario}>
                  <p>
                    Sem comentários. Seja o primeiro a comentar
                    {user && <span>{user.name}</span>}.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <Loading text="Carregando comentários" />
        )}
      </div>
      {title == 'Nossos estudantes dizem' ? (
        <FormComentarios
          commentsWithAuthor={commentsWithAuthor}
          setCommentsWithAuthor={setCommentsWithAuthor}
        />
      ) : (
        <FormCommentAboutTeacher
          setCommentsWithAuthor={setCommentsWithAuthor}
        />
      )}
    </div>
  );
};

export default Comentarios;
