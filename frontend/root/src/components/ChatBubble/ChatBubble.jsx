import { Role } from "../../constants/ChatBoxConstants";
import styles from "./index.module.scss";

function ChatBubble({ message, sendAt, role }) {
  return (
    <div
      className={`${styles.chatBubbleWrapper} ${
        role === Role.User
          ? styles.userSent
          : role === Role.System
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
