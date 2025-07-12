//Css

import styles from './FormRegisterCursos.module.css';

//Hooks

import { useState } from 'react';
import { useRegister } from '../Hooks/useRegister';

//Componentes

import Message from '../Componentes/Message';

const FormRegisterCursos = ({ setOpenModal }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [aboutCourse, setAboutCourse] = useState('');
  const { loading, error, register } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const curso = {
      name,
      price,
      urlImage,
      aboutCourse,
      avaliacoes: [],
    };

    await register('Cursos', curso);

    if (!error && !loading) {
      setOpenModal(false);
    }
  };

  return (
    <div className={styles.overSide}>
      <div className={styles.FormRegisterCursos}>
        <div className={styles.closeModal}>
          <button onClick={() => setOpenModal(false)}>X</button>
        </div>
        {urlImage && /^https:\/\/.*$/.test(urlImage) && (
          <img src={urlImage} alt="Preview da imagem" />
        )}
        <p>Preencha os campos abaixo para cadastrar um novo curso.</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome</span>
            <input
              type="text"
              placeholder="Nome do curso"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span>Preço</span>
            <input
              type="number"
              placeholder="Preço do curso"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            <span>Insere a url da Imagem do curso</span>
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
            <span>Descriçao do curso</span>
            <textarea
              placeholder="Sobre o curso (Áreas de aplicação, nível exigido e etc)."
              required
              value={aboutCourse}
              onChange={(e) => setAboutCourse(e.target.value)}
              minLength={100}
            ></textarea>
          </label>
          <button disabled={loading}>
            {!loading ? 'Cadastrar' : 'Aguarde...'}
          </button>
        </form>
        {error && <Message message={error} type="error" />}
      </div>
    </div>
  );
};

export default FormRegisterCursos;
