import { useMemo, useState } from "react";
import styles from "./index.module.scss";
import { BiSend } from "react-icons/bi";
import { useParams } from "react-router-dom";
import ChatBubble from "../ChatBubble/ChatBubble";
import { Sender } from "../../constants/ChatBoxConstants";

const initialPrompt = {
  id: "0",
  message: "Enter a prompt",
  sender: Sender.System,
  sendAt: "",
};

const extraMessages = [
  {
    id: "1",
    message: "Hello, what can I help you with today?",
    sender: Sender.Machine,
    sendAt: "12/12/12",
  },
  {
    id: "2",
    message: "Hi there! I'm here to assist you. How can I be of service?",
    sender: Sender.User,
    sendAt: "12/12/12",
  },
  {
    id: "3",
    message:
      "Greetings! Let me know if there's anything specific you'd like assistance with.",
    sender: Sender.Machine,
    sendAt: "12/12/12",
  },
  {
    id: "4",
    message:
      "Hey! Need help or information on a particular topic? Feel free to ask!",
    sender: Sender.User,
    sendAt: "12/12/12",
  },
];

const llmOptions = [
  { id: "1", name: "Dolphin Phi" },
  { id: "2", name: "Phi-2" },
  { id: "3", name: "Orca Mini" },
];

function ChatBox() {
  const params = useParams();
  const [prompt, setPrompt] = useState("");
  const [llmOption, setLlmOption] = useState(llmOptions.at(0).id);
  const messages = useMemo(
    () =>
      params.conversationId
        ? [...extraMessages, initialPrompt]
        : [initialPrompt],
    [params]
  );
  const sendDisabled = useMemo(() => !prompt.length, [prompt]);

  const handleOnPromptChange = (e) => {
    const newValue = e.target.value;
    setPrompt(newValue);
  };

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
              sender={message.sender}
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
            <BiSend className={`${sendDisabled ? styles.sendDisabled : ""}`} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
