import ConversationListItem from "./../ConversationListItem/ConversationListItem";
import styles from "./index.module.scss";

const conversations = [
  {
    title:
      "Convo 1sldkfjaslkdfjasdflkasfjdlaksdfjasflkajsdfalkfjadflaksfdjasldfk",
    lastMessage: "What is the color of green",
    send_at: "12/27",
  },
  {
    title: "Convo 2",
    lastMessage: "What is the color of blue",
    send_at: "12/28",
  },
  {
    title: "Convo 3",
    lastMessage: "What is the color of red",
    send_at: "12/29",
  },
];

function ConversationList() {
  return (
    <div className={styles.chatList}>
      <h3>Conversations</h3>
      <div className={styles.list}>
        {conversations.map((convo) => (
          <ConversationListItem
            title={convo.title}
            lastMessage={convo.lastMessage}
            sendAt={convo.send_at}
          />
        ))}
      </div>
    </div>
  );
}

export default ConversationList;
