//Css

import styles from "./WelcomeToEscolart.module.css";

const WelcomeToEscolart = () => {
  return (
    <div className={styles.WelcomeToEscolart}>
      <h1>Sobre nós</h1>
      <section>
        <img
          src="https://media.istockphoto.com/id/2166781246/pt/foto/students-running-on-schoolyard.webp?a=1&b=1&s=612x612&w=0&k=20&c=GL0j-rmfit2H33iCgw2xFi_yf08oqm6x9SpiZVPiuoY="
          alt="Escolart"
        />
        <div>
          <h2>Bem vindo ao Escolart</h2>
          <p>
            Seja muito bem-vindo(a) ao Escolart, o seu portal inteligente de
            marcação de aulas ao domicílio! Aqui, você encontra os melhores
            professores, nos horários que mais combinam com você, e com a
            comodidade de aprender no conforto da sua casa. Seja para reforço
            escolar, preparação para exames ou desenvolvimento pessoal, o
            Escolart está pronto para conectar alunos e professores com
            qualidade, segurança e praticidade.
          </p>
          <button>Ler Mais sobre Escolart</button>
        </div>
      </section>
      <section>
        <div>
          <h2>P'ra nós, ensinar é uma arte.</h2>
          <p>
            E é por isso que cuidamos de cada detalhe para que o aprendizado
            aconteça de forma leve, eficiente e inspiradora.
          </p>
          <h2>É novo por aqui ?</h2>
          <p>Cadastre-se agora mesmo e comece sua jornada de aprendizado!</p>
        </div>
        <img
          src="https://plus.unsplash.com/premium_photo-1663110026932-0725b0bcd44e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGF1bGFzfGVufDB8fDB8fHww"
          alt="Imagem"
        />
      </section>
    </div>
  );
};

export default WelcomeToEscolart;
