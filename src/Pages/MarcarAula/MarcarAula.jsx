//Styles

import '../../Pages/Auth/AuthStyles.css';

//Hooks
import { useEffect, useState, useContext } from 'react';
import { useGetData } from '../../Hooks/useGetData';
import { useAuth } from '../../Hooks/useAuth';
import { useRegister } from '../../Hooks/useRegister';
import { useConverteValue } from '../../Hooks/useConverteValue';

//Componente

import Message from '../../Componentes/Message';

//Contex

import { ContextTeacher } from '../../Context/ContextTeacher';

const MarcarAula = () => {
  const [cursos, setCursos] = useState([]);
  const [idade, setIdade] = useState('');
  const [classe, setClasse] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [nivelDeConhecimento, setNivelDeConhecimento] = useState('');
  const [preferenciaDeHorario, setPreferenciaDeHorario] = useState('');
  const [endereco, setEndereco] = useState('');
  const [showMessage, setShowMessage] = useState(true);
  const { converteValue } = useConverteValue();

  const { teacher } = useContext(ContextTeacher);

  useEffect(() => {
    if (teacher) {
      setDisciplina(teacher.disciplina);
    }
  }, []);

  const { loading: loadinGetData, data } = useGetData('Cursos');
  const {
    loading: loadingRegister,
    error,
    success,
    register,
    dispatch,
  } = useRegister();
  const { user } = useAuth();

  const idades = Array.from({ length: 15 }, (_, i) => i + 5 + ' Anos de idade');
  const classes = Array.from({ length: 13 }, (_, i) => i + 1 + 'ª classe');

  useEffect(() => {
    if (data) {
      setCursos(data);
    }
  }, [loadinGetData, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idade) {
      dispatch({ type: 'ERROR', payload: 'Informe sua idade' });
      return;
    }

    if (!classe) {
      dispatch({ type: 'ERROR', payload: 'Informe sua classe' });
      return;
    }

    if (!disciplina) {
      dispatch({
        type: 'ERROR',
        payload: 'Informe a disciplina que pretende estudar.',
      });
      return;
    }

    if (!nivelDeConhecimento) {
      dispatch({
        type: 'ERROR',
        payload: 'Informe o seu nível de conhecimento',
      });
      return;
    }

    if (!preferenciaDeHorario) {
      dispatch({
        type: 'ERROR',
        payload: 'Informe o horário que deseja estudar.',
      });
      return;
    }

    if (!endereco) {
      dispatch({
        type: 'ERROR',
        payload: 'Informe detalhadamente a sua localização',
      });
      return;
    }

    if (teacher && teacher.disciplina !== disciplina) {
      dispatch({
        type: 'ERROR',
        payload: ` O professor ${teacher.name} lecciona ${teacher.disciplina} e não ${disciplina}`,
      });
      return;
    }

    const aula = {
      authID: user.uid,
      emailAluno: user.email,
      idade,
      classe,
      disciplina,
      nivelDeConhecimento,
      preferenciaDeHorario,
      endereco,
      status: 'Pendente',
      ...(teacher && { teacher: teacher.name }),
    };

    setEndereco('');

    await register('Aulas', aula);
  };

  useEffect(() => {
    if (success) {
      setInterval(() => setShowMessage(false), 2000);
    }
  }, [success]);

  return (
    <>
      {!loadinGetData ? (
        <div className="MarcarAula">
          <h4>Marque suas aulas e estude com os melhores professores.</h4>
          {teacher && (
            <p style={{ fontSize: '14px', textAlign: 'center' }}>
              Marcar aula com um professor específico, custa{' '}
              {converteValue(10000, 'AOA')} a mais.
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <label>
              <span>Seleccione a Idade</span>
              <select value={idade} onChange={(e) => setIdade(e.target.value)}>
                <option value="">Seleccione sua idade</option>
                {idades.map((Idade) => (
                  <option value={Idade} key={Idade}>
                    {Idade}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Seleccione a classe</span>
              <select
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
              >
                <option value="">Seleccione sua classe</option>
                {classes.map((classe) => (
                  <option value={classe} key={classe}>
                    {classe}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Disciplina</span>
              <select
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
              >
                <option value="">Seleccione a disciplina</option>
                {cursos.map((curso) => (
                  <option value={curso.name} key={curso.id}>
                    {curso.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Nível de conhecimento</span>
              <select
                value={nivelDeConhecimento}
                onChange={(e) => setNivelDeConhecimento(e.target.value)}
              >
                <option value="">Seleccione seu nível de conhecimento</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Médio">Médio</option>
                <option value="Avançado">Avançado</option>
              </select>
            </label>
            <label>
              <span>Preferência de horário.</span>
              <select
                value={preferenciaDeHorario}
                onChange={(e) => setPreferenciaDeHorario(e.target.value)}
              >
                <option value="">Seleccione horário</option>
                <option value="10h às 11h:30min">10h às 11h:30min</option>
                <option value="13h às 14h:30min">13h às 14h:30min</option>
                <option value="16h às 17h:30min">16h às 17h:30min</option>
              </select>
            </label>
            <label>
              <span>Endereço</span>
              <input
                type="text"
                placeholder="Localização (Município, Bairro, Rua...)"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </label>
            <button disabled={loadingRegister}>
              {!loadingRegister ? 'Marcar aula' : 'Marcando aula...'}
            </button>
            <p style={{ fontSize: '14px', textAlign: 'center' }}>
              As aulas são ministradas durante 2 semanas de segunda à sexta com
              duração de 1h:30min.
            </p>
            {showMessage && success && (
              <Message message="Aula marcada com successo. " type="success" />
            )}
            {error && <Message message={error} type="error" />}
          </form>
        </div>
      ) : (
        <p>Aguarde...</p>
      )}
    </>
  );
};

export default MarcarAula;
