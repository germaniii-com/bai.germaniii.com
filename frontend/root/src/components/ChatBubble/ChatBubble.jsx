import { useMemo } from "react";
import { Role } from "../../constants/ChatBoxConstants";
import styles from "./index.module.scss";
import { getDateFromISO } from "../../utils/dateUtils";

function ChatBubble({ message, sendAt, role }) {
  const sendAtFormatted = useMemo(() => getDateFromISO(sendAt, true), [sendAt]);
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
        <div className={styles.sendAt}>{sendAtFormatted}</div>
      </div>
    </div>
  );
}

export default ChatBubble;
