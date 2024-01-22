import { Sender } from "../../constants/ChatBoxConstants";
import styles from "./index.module.scss";

function ChatBubble({ message, sendAt, sender }) {
  return (
    <div
      className={`${styles.chatBubbleWrapper} ${
        sender === Sender.User
          ? styles.userSent
          : sender === Sender.System
          ? styles.systemSent
          : styles.machineSent
      }`}
    >
      <div className={`${styles.chatBubble}`}>
        <div className={styles.message}>{message}</div>
        <div className={styles.sendAt}>{sendAt}</div>
      </div>
    </div>
  );
}

export default ChatBubble;
