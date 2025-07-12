//Css

import './Home.css';

//Componente

import Slide from '../../Componentes/Slide';
import WelcomeToEscolart from '../../Componentes/WelcomeToEscolart';
import ConteinerCardTeacher from '../../Componentes/ConteinerCardTeacher';
import ConteinerCardCursos from '../../Componentes/ConteinerCardCursos';
import Comentarios from '../../Componentes/Comentarios';

//Hooks

import { useState, useEffect } from 'react';
import { useGetData } from '../../Hooks/useGetData';

const Home = () => {
  const [comentarios, setComentarios] = useState([]);
  const { data } = useGetData('comentarios');

  useEffect(() => {
    if (data) {
      setComentarios(data);
    }
  }, [data]);
  return (
    <div className="ConteinerHome">
      <Slide />
      <WelcomeToEscolart />
      <ConteinerCardTeacher />
      <ConteinerCardCursos />
      <Comentarios comentarios={comentarios} title="Nossos estudantes dizem" />
    </div>
  );
};

export default Home;
