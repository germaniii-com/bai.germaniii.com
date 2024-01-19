import styles from "./index.module.scss";

function ChatBubble({ message, sendAt, isSend }) {
  return (
    <div
      className={`${styles.chatBubbleWrapper} ${isSend ? styles.isSend : ""}`}
    >
      <div className={`${styles.chatBubble}`}>
        <div className={styles.message}>{message}</div>
        <div className={styles.sendAt}>{sendAt}</div>
      </div>
    </div>
  );
}

export default ChatBubble;
