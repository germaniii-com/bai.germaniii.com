import styles from "./index.module.scss";

function ConversationListItem({ title, lastMessage, sendAt }) {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.lastMessage}>{lastMessage}</div>
      <div className={styles.sendAt}>{sendAt}</div>
    </div>
  );
}

export default ConversationListItem;
