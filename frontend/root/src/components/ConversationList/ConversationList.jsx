import ConversationListItem from "./../ConversationListItem/ConversationListItem";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { useMemo } from "react";

function ConversationList({ conversations }) {
  const reroute = useNavigate();
  const conversationsSorted = useMemo(
    () =>
      conversations ? conversations.sort((a, b) => a.send_at <= b.send_at) : [],
    [conversations]
  );

  return (
    <div className={styles.chatList}>
      <div className={styles.chatListHeader}>
        <h3>Conversations</h3>
        <BiPencil onClick={() => reroute(`/chat`)} />
      </div>
      <div className={styles.list}>
        {conversationsSorted &&
          conversationsSorted.map((convo) => (
            <div key={convo.id} onClick={() => reroute(`/chat/${convo.id}`)}>
              <ConversationListItem
                id={convo.id}
                title={convo.title}
                lastMessage={convo.lastMessage}
                sendAt={convo.send_at}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ConversationList;
