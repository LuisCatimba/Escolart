//Css
import '../Auth/AuthStyles.css';

import './DenunciarProfessor.css';

//Hook

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRegister } from '../../Hooks/useRegister';
import { useAuth } from '../../Hooks/useAuth';
//Component

import Message from '../../Componentes/Message';

const DenunciaProfessor = () => {
  const [title, setTitle] = useState('');
  const [texto, setTexto] = useState('');
  const { loading, error, success, dispatch, register } = useRegister();
  const { user } = useAuth();
  const { id } = useParams();
  const [isAnonima, setIsAnonima] = useState(false);

  //Resentando success

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch({ type: 'RESET' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const denuncia = {
      title,
      texto,
      authID: user.uid,
      teacherID: id,
      isAnonima,
    };

    if (title.trim() == '') {
      dispatch({ type: 'ERROR', payload: 'Qual é o título da denúncia.' });
      return;
    }

    if (texto.trim() == '') {
      dispatch({ type: 'ERROR', payload: 'Motivo da denúncia em falta.' });
      return;
    }

    await register('Denuncias', denuncia);
  };

  return (
    <div className="ConteinerFormDenunciar">
      <h3 style={{ color: '#06bbcc' }}>Faça aqui a sua denúncia!</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input
            type="text"
            placeholder="Título da denúncia"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Escreva a denúncia</span>
          <textarea
            placeholder="Escreva aqui a sua denúncia."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          ></textarea>
          <div>
            <input
              type="checkbox"
              checked={isAnonima}
              onChange={(e) => setIsAnonima(e.target.checked)}
            />
            <span>Fazer denúncia anónima.</span>
          </div>
        </label>
        <button disabled={loading}>
          {!loading ? 'Denunciar' : 'Aguarde...'}
        </button>
        {error && <Message message={error} type="error" />}
        {success && (
          <Message message="Denúncia enviada com sucesso" type="success" />
        )}
      </form>
    </div>
  );
};

export default DenunciaProfessor;
