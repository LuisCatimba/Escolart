import styles from './Message.module.css';

const Message = ({ message, type }) => {
  return (
    <div
      className={
        type == 'error'
          ? `${styles.message} ${styles.error}`
          : `${styles.message} ${styles.success}`
      }
    >
      <p>{message}</p>
    </div>
  );
};

export default Message;
