//Css

import "./AboutUs.css";

//Componensts

import AboutEscolart from "../../Componentes/AboutEscolart";
import WhyChooseUs from "../../Componentes/WhyChooseUs";
import OurStory from "../../Componentes/OurSrory";
import OurPrinciples from "../../Componentes/OurPrinciples";

const AboutUs = () => {
  return (
    <div className="ConteinerAboutdiv">
      <AboutEscolart />
      <WhyChooseUs />
      <OurStory />
      <OurPrinciples />
    </div>
  );
};

export default AboutUs;
