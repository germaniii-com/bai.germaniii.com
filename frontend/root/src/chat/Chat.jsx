import MainLayout from "../components/MainLayout";
import ChatBox from "../components/ChatBox/ChatBox";
import ConversationList from "../components/ConversationList/ConversationList";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Chat() {
  const reroute = useNavigate();
  const [conversations, setConversations] = useState();
  const addConversation = (message) => {
    axiosInstance
      .post("/conversations", { message })
      .then((res) => {
        const conversation = res.data;
        setConversations((prev) => [
          ...prev,
          {
            id: conversation.id,
            title: conversation.title,
            lastMessage: conversation.last_message,
            send_at: conversation.created_at,
          },
        ]);
        reroute(`/chat/${conversation.id}`);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (conversations !== undefined) return;

    axiosInstance
      .get("/conversations")
      .then((res) => {
        setConversations(
          res.data.map((conversation) => ({
            id: conversation.id,
            title: conversation.title,
            lastMessage: conversation.last_message,
            send_at: conversation.created_at,
          }))
        );
      })
      .catch(() => {});
  }, [conversations]);

  return (
    <MainLayout>
      <div className={styles.root}>
        <ConversationList conversations={conversations} />
        <ChatBox
          addConversation={addConversation}
          setConversations={setConversations}
        />
      </div>
    </MainLayout>
  );
}

export default Chat;
