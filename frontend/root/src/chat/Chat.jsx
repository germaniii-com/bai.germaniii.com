import MainLayout from "../components/MainLayout";
import ChatBox from "../components/ChatBox/ChatBox";
import ConversationList from "../components/ConversationList/ConversationList";
import styles from "./index.module.scss";

function Chat() {
  return (
    <MainLayout>
      <div className={styles.root}>
        <ConversationList />
        <ChatBox />
      </div>
    </MainLayout>
  );
}

export default Chat;
