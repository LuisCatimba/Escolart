//Css

import styles from "./AboutEscolart.module.css";

const AboutEscolart = () => {
  return (
    <div
      className={styles.AboutEscolart}
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1310186784/photo/raised-hands-and-arms-of-large-group-of-people-in-class-room.jpg?s=612x612&w=0&k=20&c=BSAT9zqPFZgnWGHDLxZz_JN_DUlUXrd6l7H7rmDyFu4=')",
      }}
    >
      <div>
        <h2>Sobre nós</h2>
        <p>Educar é semear com sabedoria e colher com paciência.</p>
      </div>
    </div>
  );
};

export default AboutEscolart;
