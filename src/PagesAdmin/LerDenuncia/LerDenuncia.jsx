//Css

import './LerDenuncia.css';

//Hooks

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDoc } from '../../Hooks/useGetDoc';
import Loading from '../../Componentes/Loading';

const LerDenuncia = () => {
  const { id } = useParams();
  const { getDocument } = useGetDoc();
  const [denuncia, setDenuncia] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoc = async () => {
      setLoading(true);
      const doc = await getDocument('Denuncias', id);

      if (doc) {
        const denunciado = await getDocument('professor', doc.teacherID);
        const author = await getDocument('aluno', doc.authID);
        setDenuncia({ ...doc, author, denunciado });
        setLoading(false);
      }
    };

    fetchDoc();
  }, []);

  return (
    <>
      {!loading && denuncia ? (
        <div className="containerDenuncia">
          <h4 className="title">{denuncia.title}</h4>
          <h5>
            Denuncia de {denuncia.isAnonima ? 'Anónimo' : denuncia.author.name}
            para
            {denuncia.denunciado.name}
          </h5>
          <p>{denuncia.texto}</p>
          <button onClick={() => navigate('/admin/denuncias/')}>Voltar</button>
        </div>
      ) : (
        <Loading text="carregando..." />
      )}
    </>
  );
};

export default LerDenuncia;
