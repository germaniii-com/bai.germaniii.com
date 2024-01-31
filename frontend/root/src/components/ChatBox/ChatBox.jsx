import { useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { BiSend } from "react-icons/bi";
import { useParams } from "react-router-dom";
import ChatBubble from "../ChatBubble/ChatBubble";
import { Role } from "../../constants/ChatBoxConstants";
import axiosInstance from "../../utils/axiosInstance";

const initialPrompt = {
  id: "0",
  message: "Enter a prompt",
  role: Role.System,
  sendAt: "",
};

const llmOptions = [
  { id: "1", name: "Dolphin Phi" },
  { id: "2", name: "Phi-2" },
  { id: "3", name: "Orca Mini" },
];

function ChatBox({ addConversation, setConversations }) {
  const params = useParams();
  const [prompt, setPrompt] = useState("");
  const [llmOption, setLlmOption] = useState(llmOptions.at(0).id);
  const [messages, setExtraMessages] = useState([initialPrompt]);
  const sendDisabled = useMemo(() => !prompt.length, [prompt]);

  const handleOnPromptChange = (e) => {
    const newValue = e.target.value;
    setPrompt(newValue);
  };

  const handleOnSend = () => {
    if (!prompt.length) return;
    setPrompt("");

    if (!params.conversationId) {
      addConversation({ message: prompt, model: llmOption });
      return;
    }

    axiosInstance
      .post(`/conversations/${params.conversationId}/messages`, {
        message: prompt,
        model: llmOption,
      })
      .then((res) => {
        const message = res.data;
        setExtraMessages((prev) => [
          ...prev,
          {
            id: message.id,
            message: message.message,
            role: message.sender,
            sendAt: message.created_at,
          },
        ]);
        setConversations((prev) =>
          prev.map((conversation) =>
            conversation.id !== message.conversation_id
              ? conversation
              : {
                  ...conversation,
                  lastMessage: message.message,
                  send_at: message.created_at,
                }
          )
        );
      })
      .catch(() => {});
  };

  useEffect(() => {
    setExtraMessages([initialPrompt]);
    if (!params.conversationId) return;
    axiosInstance
      .get(`/conversations/${params.conversationId}/messages`)
      .then((res) => {
        setExtraMessages(
          res.data.map((message) => ({
            id: message.id,
            message: message.message,
            role: message.sender,
            sendAt: message.created_at,
          }))
        );
      })
      .catch(() => {});
  }, [params.conversationId, setExtraMessages]);

  return (
    <div className={styles.conversationHolder}>
      <div className={styles.conversationWrapper}>
        <div className={styles.titleHolder}>
          <h1>Chat 1</h1>
          <select
            value={llmOption}
            onChange={(e) => setLlmOption(e.target.value.id)}
          >
            {llmOptions.map((llm) => (
              <option key={llm.id} value={llm.id}>
                {llm.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.conversationBubblesHolder}>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.message}
              sendAt={message.sendAt}
              role={message.role}
            />
          ))}
        </div>
        <div className={styles.inputHolder}>
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea
              id="prompt"
              value={prompt}
              onChange={handleOnPromptChange}
              rows={5}
              maxLength={1024}
              placeholder="Enter prompt..."
            />
            <BiSend
              className={`${sendDisabled ? styles.sendDisabled : ""}`}
              onClick={handleOnSend}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
