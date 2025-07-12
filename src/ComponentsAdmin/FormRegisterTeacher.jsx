//Css

import styles from './FormRegisterTeacher.module.css';

//Hooks

import { useEffect, useState } from 'react';
import { useRegisterUser } from '../Hooks/useRegisterUser';
import { useGetData } from '../Hooks/useGetData';

//Components

import Message from '../Componentes/Message';

const regexs = [
  /^.{3,}$/,
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  /^(?=.*[!@#$%^&*()_+{}\]:;<>,.?~/-]).{6,}$/,
  /^(?=.*[!@#$%^&*()_+{}\]:;<>,.?~/-]).{6,}$/,
];

//Selecção dos input para verificação

const inputsValidados = document.querySelectorAll("[data-validacao='true']");
const validarBordaInput = () => {
  inputsValidados.forEach((input, pos) => {
    input.addEventListener('keyup', (e) => {
      if (regexs[pos].test(e.target.value)) {
        input.style.border = '1px solid #06bbcc';
      } else {
        input.style.border = '1px solid red';
      }
    });
  });
};

const FormRegisterTeacher = ({ setOpenModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disciplina, setDisciplina] = useState();
  const [aboutTeacher, setAboutTeacher] = useState('');
  const { loading, register, error, dispatch } = useRegisterUser();
  const { data } = useGetData('Cursos');
  const [cursos, setCursos] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!regexs[0].test(name)) {
      dispatch({
        type: 'ERROR',
        payload: 'O nome precisa  ter pelo menos 3 caracteres',
      });
      return;
    }

    if (!regexs[1].test(email)) {
      dispatch({ type: 'ERROR', payload: "'Email inválido'" });
      return;
    }

    if (!regexs[2].test(password)) {
      dispatch({ type: 'ERROR', payload: 'Palavra muito fraca' });
    }

    if (password !== confirmPassword) {
      dispatch({ type: 'ERROR', payload: 'As senhas precisam ser iguais' });
      return;
    }

    const professor = {
      name,
      email,
      aboutTeacher,
      password,
      urlImage,
      category: 'professor',
      disciplina,
    };

    await register(professor);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setCursos(data);
      setDisciplina(data[0].name);
    }
  }, [data]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <div className={styles.overSide}>
      <div className={styles.formRegisterTeacher}>
        <div className={styles.closeModal}>
          <button onClick={() => setOpenModal(false)}>X</button>
        </div>
        {urlImage && /^https:\/\/.*$/.test(urlImage) && (
          <img src={urlImage} alt="Preview da imagem" />
        )}
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome</span>
            <input
              type="text"
              placeholder="Nome"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onInput={validarBordaInput}
              data-validacao="true"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInput={validarBordaInput}
              data-validacao="true"
            />
          </label>
          <label>
            <span>Senha</span>
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onInput={validarBordaInput}
              data-validacao="true"
            />
          </label>
          <label>
            <span>Confirme a senha</span>
            <input
              type="password"
              placeholder="Confirme a senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              data-validacao="true"
              onInput={validarBordaInput}
            />
          </label>
          <label>
            <span>Seleccione a displina</span>
            <select onChange={(e) => setDisciplina(e.target.value)}>
              {cursos &&
                cursos.length > 0 &&
                cursos.map((curso) => (
                  <option value={curso.name} key={curso.id}>
                    {curso.name}
                  </option>
                ))}
            </select>
          </label>
          <label>
            <span>Coloque a url da urlImagem</span>
            <input
              type="url"
              placeholder="https://exemplo.com/imagem.jpg"
              required
              value={urlImage}
              onChange={(e) => setUrlImage(e.target.value)}
              pattern="https://.*"
            />
          </label>
          <label>
            <span>Sobre o professor</span>
            <textarea
              onChange={(e) => setAboutTeacher(e.target.value)}
              required
              placeholder="Escreva sobre o professor..."
              value={aboutTeacher}
            ></textarea>
          </label>
          <button disabled={loading}>
            {!loading ? 'Enviar' : 'Aguarde...'}
          </button>
          {error && <Message message={error} type="error" />}
        </form>
      </div>
    </div>
  );
};

export default FormRegisterTeacher;
