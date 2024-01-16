import MainLayout from "../components/MainLayout";
import ChatBox from "../components/ChatBox/ChatBox";
import styles from "./index.module.scss";

function Chat() {
  return (
    <MainLayout>
      <div className={styles.root}>
        <div className={styles.chatList}></div>
        <ChatBox />
      </div>
    </MainLayout>
  );
}

export default Chat;
