import MainLayout from "../components/MainLayout";
import ChatBox from "../components/ChatBox/ChatBox";
import styles from "./index.module.scss";

const conversations = [
  {
    title: "Convo 1",
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

function Chat() {
  return (
    <MainLayout>
      <div className={styles.root}>
        <div className={styles.chatList}>
          <h3>Conversations</h3>
          <div>
            {conversations.map((convo) => (
              <>
                {convo.title}
                {convo.lastMessage}
                {convo.send_at}
                <br />
              </>
            ))}
          </div>
        </div>
        <ChatBox />
      </div>
    </MainLayout>
  );
}

export default Chat;
