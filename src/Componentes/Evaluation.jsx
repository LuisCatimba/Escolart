import styles from './Evaluation.module.css';

//Components

import EstrelaDourada from './EstrelaDourada';

const Evaluation = ({ evaluation }) => {
  return (
    <section className={styles.evaluation}>
      <header>
        <section className={styles.infoAuthor}>
          {evaluation.author.photoURL ? (
            <img src={evaluation.author.photoURL} />
          ) : (
            <section className={styles.initialName}>
              {evaluation.author.name.trim().slice(0, 1).toUpperCase()}
            </section>
          )}
          <section className={styles.nameBio}>
            <p className={styles.name}>{evaluation.author.name}</p>
            {evaluation.author.bio && (
              <p className={styles.bio}>
                {evaluation.author.bio.length > 30 ? (
                  <>{evaluation.author.bio.slice(0, 27)}...</>
                ) : (
                  <>{evaluation.author.bio}</>
                )}
              </p>
            )}
          </section>
        </section>
        <section className={styles.rating}>
          {Array.from({ length: evaluation.rating }).map(() => (
            <EstrelaDourada />
          ))}
        </section>
      </header>
      <div className={styles.textEvaluation}>
        <p>{evaluation.text}</p>
      </div>
    </section>
  );
};

export default Evaluation;
