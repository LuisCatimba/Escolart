//Css

import styles from './Slide.module.css';

//Hooks

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

//ícones
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Slide = () => {
  console.log(import.meta.env.BASE_URL);
  const Navigate = useNavigate();
  const sliderRef = useRef(null);
  const { user } = useAuth();
  let pos = 0;

  const updataMarginLeft = () => {
    sliderRef.current.style.marginLeft = `-${pos * 100}vw`;
  };

  const goNextImage = () => {
    if (pos >= 1) {
      pos = 0;
    } else {
      return;
    }

    updataMarginLeft();
  };
  const goPreviewImage = () => {
    if (pos <= 0) {
      pos = 1;
    } else {
      return;
    }

    updataMarginLeft();
  };

  const marcarAula = () => {
    if (user) {
      Navigate('/marcar-aula');
    } else {
      Navigate('/entrar');
    }
  };

  return (
    <div className={styles.conteinerSlide}>
      <div className={styles.slidersControls}>
        <button className={styles.previewImage} onClick={goPreviewImage}>
          <FaAngleLeft size={20} color="white" />
        </button>
        <button className={styles.nextImage} onClick={goNextImage}>
          <FaAngleRight size={20} color="white" />
        </button>
      </div>
      <div className={styles.sliderWidth} ref={sliderRef}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${
              import.meta.env.BASE_URL
            }imagens/carousel-1.jpg)`,
          }}
        >
          <div className={styles.overlay}>
            <div>
              <p>A melhor escola de aulas ao domicílio</p>
              <h2>
                O melhor do ensino personalizado, na sua casa e no seu tempo.
                Chegue mais longe com as nossas aulas.
              </h2>
              <button className={styles.btn} onClick={marcarAula}>
                Marcar aulas
              </button>
            </div>
          </div>
        </div>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${
              import.meta.env.BASE_URL
            }imagens/carousel-2.jpg)`,
          }}
        >
          <div className={styles.overlay}>
            <div>
              <p>Para nós ensinar é uma arte.</p>
              <h2>
                Só a Escolart pode proporcionar a você o aprendizado que você
                precisa, no conforto do seu lar.
              </h2>
              <button className={styles.btn} onClick={marcarAula}>
                Marcar aulas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
