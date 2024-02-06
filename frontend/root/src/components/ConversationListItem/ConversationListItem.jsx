import { useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { useMemo } from "react";
import { getDateFromISO } from "../../utils/dateUtils";

function ConversationListItem({ id, title, lastMessage, sendAt }) {
  const params = useParams();
  const isSelected = useMemo(() => params.conversationId === id, [id, params]);
  const sendAtFormatted = useMemo(
    () => getDateFromISO(sendAt, false),
    [sendAt]
  );

  return (
    <div
      className={`${styles.itemWrapper} ${isSelected ? styles.selected : ""}`}
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.lastMessage}>{lastMessage}</div>
      <div className={styles.sendAt}>{sendAtFormatted}</div>
    </div>
  );
}

export default ConversationListItem;
