//Css

import styles from "./OurStory.module.css";

const OurStory = () => {
  return (
    <div className={styles.OurStory}>
      <h2>Nossa história</h2>
      <div>
        <img
          src="https://media.istockphoto.com/id/1785042867/pt/foto/young-girl-in-class-raises-her-hand-to-answer-the-teachers-question.jpg?s=612x612&w=0&k=20&c=Wt3EBN_b6NjWrN150aRIJd8Q875PXaB46dGAm4YonSg="
          alt="Imagem"
        />
        <section>
          <h4>O início de um sonho educacional</h4>
          <p>
            O Escolart nasceu do sonho de tornar o ensino mais acessível, humano
            e eficaz. Criado por educadores apaixonados, começamos com a simples
            missão de transformar vidas por meio da educação individualizada. Ao
            longo do tempo, crescemos, aprendemos com nossos alunos e
            aprimoramos nossos métodos, sempre colocando a qualidade e o
            bem-estar do estudante em primeiro lugar.
          </p>
          <p>
            Hoje, somos mais que uma plataforma de aulas — somos um espaço onde
            ensinar é uma arte e aprender se torna uma experiência única.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OurStory;
