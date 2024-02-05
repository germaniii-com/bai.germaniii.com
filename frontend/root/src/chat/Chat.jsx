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
  const addConversation = ({ message, model }) => {
    axiosInstance
      .post("/conversations", { message })
      .then((res) => {
        const conversation = res.data;
        axiosInstance
          .post(`/conversations/${conversation.id}/messages`, {
            message,
            model,
          })
          .then(() => {
            setConversations((prev) => [
              ...prev,
              {
                id: conversation.id,
                title: conversation.title,
                lastMessage: conversation.last_message,
                send_at: conversation.updated_at,
              },
            ]);
            reroute(`/chat/${conversation.id}`);
          })
          .catch(() => {});
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
            send_at: conversation.updated_at,
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
