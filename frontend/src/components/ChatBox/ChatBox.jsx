import { useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { BiPencil, BiSend } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import ChatBubble from "../ChatBubble/ChatBubble";
import { Role } from "../../constants/ChatBoxConstants";
import axiosInstance from "../../utils/axiosInstance";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const initialPrompt = {
  id: "0",
  message: "Enter a prompt",
  role: Role.System,
  sendAt: "",
};

const llmOptions = [
  { id: "1", name: "Llama 2" },
  { id: "2", name: "Phi-2" },
  { id: "3", name: "Orca Mini" },
];

function ChatBox({ conversations, addConversation, setConversations }) {
  const reroute = useNavigate();
  const params = useParams();
  const [prompt, setPrompt] = useState("");
  const [llmOption, setLlmOption] = useState(llmOptions.at(0).id);
  const [messages, setExtraMessages] = useState([initialPrompt]);
  const [isSending, setIsSending] = useState(false);
  const sendDisabled = useMemo(() => !prompt.length, [prompt]);
  const currentConversation = useMemo(
    () =>
      conversations?.find(
        (conversation) => conversation.id === params.conversationId
      ) ?? [],
    [conversations, params.conversationId]
  );

  const handleOnPromptChange = (e) => {
    const newValue = e.target.value;
    setPrompt(newValue);
  };

  const handleOnSend = () => {
    if (sendDisabled || isSending) return;
    setPrompt("");
    setIsSending(true);

    if (!params.conversationId) {
      addConversation({ message: prompt, model: "llama2" });
      setIsSending(false);
      return;
    }

    axiosInstance
      .post(`/conversations/${params.conversationId}/messages`, {
        message: prompt,
        model: "llama2",
      })
      .then((res) => {
        const messages = res.data;
        setExtraMessages((prev) => [
          ...messages.map((message) => ({
            id: message.id,
            message: message.message,
            role: message.sender,
            sendAt: message.created_at,
          })),
          ...prev,
        ]);
        setConversations((prev) =>
          prev.map((conversation) =>
            conversation.id !== messages[0].conversation_id
              ? conversation
              : {
                  ...conversation,
                  lastMessage: messages[0].message,
                  send_at: messages[0].created_at,
                }
          )
        );
      })
      .catch(() => {
        alert("An error occured. Please try again.");
      })
      .finally(() => setIsSending(false));
  };

  useEffect(() => {
    if (!params.conversationId) {
      setExtraMessages([initialPrompt]);
      return;
    }

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

  const messagesSorted = useMemo(
    () => (messages ? messages.sort((a, b) => a.sendAt <= b.sendAt) : []),
    [messages]
  );

  return (
    <div className={styles.conversationHolder}>
      <div className={styles.conversationWrapper}>
        <div className={styles.titleHolder}>
          <BiPencil onClick={() => reroute(`/chat`)} />
          <h1>{currentConversation.title ?? ""}</h1>
          <select value={llmOption} onChange={(_) => setLlmOption(1)}>
            {llmOptions.map((llm) => (
              <option key={llm.id} value={llm.id}>
                {llm.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.conversationBubblesHolder}>
          {messagesSorted &&
            messagesSorted.map((message) => (
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
              disabled={isSending}
            />
            {isSending ? (
              <AiOutlineLoading3Quarters className={styles.loading} />
            ) : (
              <BiSend onClick={handleOnSend} />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
