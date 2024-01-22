import ConversationListItem from "./../ConversationListItem/ConversationListItem";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";

function ConversationList() {
  const reroute = useNavigate();
  const [conversations] = useState([
    {
      id: "1",
      title:
        "Convo 1sldkfjaslkdfjasdflkasfjdlaksdfjasflkajsdfalkfjadflaksfdjasldfk",
      lastMessage:
        "What is the color of green askldcjfaslkfjdkla;sfjsfdkldfjaklsdfjsdfkl;djafsdlk;sadjfaksl;djadskl;asfjsdkf;ajsfdak;lsdjdsfklafjdsafkdl;jadk;lfjadskfl;ajdskal;sjsaf;lkj",
      send_at: "12/27",
    },
    {
      id: "2",
      title: "Convo 2",
      lastMessage: "What is the color of blue",
      send_at: "12/28",
    },
    {
      id: "3",
      title: "Convo 3",
      lastMessage: "What is the color of red",
      send_at: "12/29",
    },
  ]);

  return (
    <div className={styles.chatList}>
      <div className={styles.chatListHeader}>
        <h3>Conversations</h3>
        <BiPencil onClick={() => reroute(`/chat`)} />
      </div>
      <div className={styles.list}>
        {conversations.map((convo) => (
          <div key={convo.id} onClick={() => reroute(`/chat/${convo.id}`)}>
            <ConversationListItem
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
