//Css

import styles from "./WhyChooseUs.module.css";

//Data
import { NossosPrincipios } from "./QualitiesEPrincipios";

//Components
import CardQualities from "./CardQualities";

const OurPrinciples = () => {
  return (
    <div className={styles.ConteinerWhyChooseUs}>
      <h2>Nossos Príncipios</h2>
      <div>
        {NossosPrincipios.map((card) => (
          <CardQualities card={card} key={card.titulo} />
        ))}
      </div>
    </div>
  );
};

export default OurPrinciples;
