//Css

import styles from "./WhyChooseUs.module.css";

//Data

import { CardsQualidadesEscolart } from "./QualitiesEPrincipios";

//Components

import CardQualities from "./CardQualities";

const WhyChooseUs = () => {
  return (
    <div className={styles.ConteinerWhyChooseUs}>
      <h2>Por quê Nós ?</h2>
      <div>
        {CardsQualidadesEscolart.map((card) => (
          <CardQualities card={card} key={card.titulo} />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
