import './AboutCourse.css';

//Hooks

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDoc } from '../../Hooks/useGetDoc';
import { useConverteValue } from '../../Hooks/useConverteValue';
import { useAuth } from '../../Hooks/useAuth';
import { useAvaliation } from '../../Hooks/useAvaliation';
import { useGetAuthorOfComent } from '../../Hooks/useGetAuthorOfComent';

//Components

import Estrela from '../../Componentes/Estrelas';
import Message from '../../Componentes/Message';
import Evaluation from '../../Componentes/Evaluation';

//ícone

import { FaStar } from 'react-icons/fa';
import Loading from '../../Componentes/Loading';

const AboutCourse = () => {
  const [querAvaliar, setQuerAvaliar] = useState(false);
  const [curso, setCurso] = useState();
  const [rating, setRating] = useState([]);
  const [text, setText] = useState('');
  const { id } = useParams();
  const Navigate = useNavigate();
  const { loading: loadingGetAuthor, getAuthorOfComent } =
    useGetAuthorOfComent();
  const [evaluations, setEvaluation] = useState([]);
  const [userDoc, setUserDoc] = useState();

  const { converteValue } = useConverteValue();
  const { loading: loadingGetCurso, getDocument } = useGetDoc();
  const {
    error,
    loading: loadingAvaliar,
    success,
    dispatch,
    avaliar,
  } = useAvaliation();
  const { user } = useAuth();

  //BUscando user

  useEffect(() => {
    const fetchDoc = async () => {
      const doc = await getDocument('aluno', user.uid);
      if (doc) {
        setUserDoc(doc);
      }
    };
    fetchDoc();
  }, []);

  useEffect(() => {
    if (success) {
      setEvaluation((prevEvaluation) => [
        {
          text,
          rating: rating.length,
          authID: user.uid,
          author: { ...userDoc },
        },
        ...prevEvaluation,
      ]);
    }
    setText('');
  }, [success]);

  //Capturando curso

  useEffect(() => {
    const fetchCurso = async () => {
      const doc = await getDocument('Cursos', id);
      if (doc) {
        setCurso(doc);
      }
    };

    fetchCurso();
  }, [getDocument, id]);

  //Capturando success de fetchCurso

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch({ type: 'RESET' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  //Buscando os autores das avaliações

  useEffect(() => {
    if (curso) {
      const fetchAuthorEvaluation = async () => {
        const reviewWithAuthor = await getAuthorOfComent(curso.avaliacoes);
        if (reviewWithAuthor) {
          setEvaluation(reviewWithAuthor);
        }
      };

      fetchAuthorEvaluation();
    }
  }, [curso, getAuthorOfComent]);

  const toogleEstrelas = (idStar) => {
    if (rating.includes(idStar)) {
      setRating((prev) => prev.filter((idEstrela) => idEstrela !== idStar));
    } else {
      setRating((prev) => [idStar, ...prev]);
    }
  };

  const publicarEstrelas = async (e) => {
    e.preventDefault();
    if (!user) {
      Navigate('/entrar');
      return;
    }

    if (text.trim() == '') {
      dispatch({
        type: 'ERROR',
        payload: 'A avaliação deve ser acompanhada de um texto.',
      });
      return;
    }

    if (rating.length === 0) {
      dispatch({
        type: 'ERROR',
        payload: 'Tens de dar pelo menos uma estrela para avaliar.',
      });
      return;
    }

    const jaAvaliou = curso.avaliacoes.some(
      (evaluation) => evaluation.authID === user.uid,
    );

    if (jaAvaliou) {
      dispatch({
        type: 'ERROR',
        payload: 'Não é possível avaliar duas vezes o mesmo curso.',
      });
      return;
    }

    const avaliacao = {
      authID: user.uid,
      text,
      rating: rating.length,
    };

    await avaliar('Cursos', curso.id, avaliacao);
  };

  // return Media de Estrelas

  const mediaEstrelas = () => {
    const total = curso.avaliacoes.reduce(
      (acc, ratingActual) => acc + ratingActual.rating,
      0,
    );

    return total / curso.avaliacoes.length;
  };

  return (
    <div className="ConteinerAboutCourse">
      {!loadingGetCurso && curso ? (
        <>
          <div className="DadosCursos">
            <img src={curso.urlImage} alt="foto" />
            <section>
              <h3>{curso.name}</h3>
              {curso.avaliacoes.length > 0 && (
                <>
                  <p>
                    {mediaEstrelas().toFixed(1)}
                    <FaStar
                      color="gold"
                      size={20}
                      style={{ marginLeft: '10px' }}
                    />
                    | {curso.avaliacoes.length}
                    {curso.avaliacoes.length == 1
                      ? ' Avaliação'
                      : ' Avaliações'}
                  </p>
                </>
              )}
              <p>{converteValue(curso.price, 'AOA')} por 15 dias.</p>
              <button
                onClick={() => {
                  user ? Navigate('/marcar-aula') : Navigate('/entrar');
                }}
              >
                Assinar agora
              </button>
            </section>
          </div>
          <div className="aboutCourse">
            <p>{curso.aboutCourse}</p>
          </div>
          <div className="avaliacoes">
            {curso.avaliacoes.length === 0 ? (
              <div>
                <div className="semAvaliacoes">
                  <span>Ainda não há avaliações.</span>
                  <p>
                    Compartilhe sua opinião. Seja o primeiro a deixar uma
                    avaliação.
                  </p>
                  <button onClick={() => setQuerAvaliar(true)}>Avaliar</button>
                </div>
                {querAvaliar && (
                  <div className="classificar">
                    <section className="estrelas">
                      {Array.from({ length: 5 }).map((estrela) => (
                        <Estrela
                          key={estrela}
                          onClick={() => toogleEstrelas(estrela)}
                        />
                      ))}
                    </section>
                    <form onSubmit={publicarEstrelas}>
                      <textarea
                        placeholder="Escreve spbre a tua avaliação."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      ></textarea>
                      <button disabled={loadingAvaliar}>
                        {!loadingAvaliar ? 'Publicar' : 'Publicando...'}
                      </button>
                      {error && <Message type="error" message={error} />}
                      {success && (
                        <Message
                          type="success"
                          message="Avaliação publicada com sucesso!"
                        />
                      )}
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <section className="ConteinerEvaluations">
                <h2>Avaliações</h2>
                {!loadingGetAuthor ? (
                  <section className="evaluations">
                    <section>
                      {evaluations.map((evaluation) => (
                        <Evaluation evaluation={evaluation} />
                      ))}
                    </section>
                    <div>
                      <h3>Avalie-nos</h3>
                      <section className="estrelas">
                        {Array.from({ length: 5 }).map((estrela) => (
                          <Estrela
                            key={estrela}
                            onClick={() => toogleEstrelas(estrela)}
                          />
                        ))}
                      </section>
                      <form onSubmit={publicarEstrelas}>
                        <textarea
                          placeholder="Escreve spbre a tua avaliação."
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <button disabled={loadingAvaliar}>
                          {!loadingAvaliar ? 'Publicar' : 'Publicando...'}
                        </button>
                        {error && <Message type="error" message={error} />}
                        {success && (
                          <Message
                            type="success"
                            message="Avaliação publicada com sucesso!"
                          />
                        )}
                      </form>
                    </div>
                  </section>
                ) : (
                  <Loading text="Buscando avaliações..." />
                )}
              </section>
            )}
          </div>
        </>
      ) : (
        <Loading text="Carregando..." />
      )}
    </div>
  );
};
export default AboutCourse;
