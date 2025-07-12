//Css

import './AboutTeacher.css';

//Hooks

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDoc } from '../../Hooks/useGetDoc';
import { useGetData } from '../../Hooks/useGetData';
import { useAuth } from '../../Hooks/useAuth';

//Components

import Comentarios from '../../Componentes/Comentarios';
import Comentario from '../../Componentes/Comentario';
import Loading from '../../Componentes/Loading';

const AboutTeacher = () => {
  const [teacher, setTeacher] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const { id } = useParams();
  const { loading, getDocument } = useGetDoc();
  const Navigate = useNavigate();
  const { loading: loadingData, data } = useGetData(
    'ComentarioSobreUmProfessor',
  );
  const { user } = useAuth();

  useEffect(() => {
    const fetchTeacher = async () => {
      setTeacher(await getDocument('professor', id));
    };

    fetchTeacher();
  }, []);

  useEffect(() => {
    if (data) {
      setComentarios(data.filter((comentario) => comentario.TeacherID === id));
    }
  }, [data]);

  return (
    <>
      {(!loading || loadingData) && teacher ? (
        <div className="aboutTeacher">
          <div className="dadosTeacher">
            <img src={teacher.photoURL} alt="Foto" />
            <div>
              <span>{teacher.name}</span>
              <h3>Licenciado/a em {teacher.disciplina}</h3>
              <p>Professor do Escolart</p>
              <button
                onClick={() => {
                  if (user) {
                    Navigate(`/denunciar-professor/${teacher.id}`);
                  } else {
                    Navigate('/entrar');
                  }
                }}
              >
                Denunciar professor
              </button>
            </div>
          </div>
          <div className="AboutTeacher">
            <h3>Sobre o professor</h3>
            <p>{teacher.aboutTeacher}</p>
          </div>
          <Comentarios
            comentarios={comentarios}
            title={`O que as pessoas dizem sobre o/a professor/a `}
          />
        </div>
      ) : (
        <Loading text={`Buscando comentário sobre `} />
      )}
    </>
  );
};

export default AboutTeacher;
