import { useState } from "react";
import styles from "./index.module.scss";
import { BiSend } from "react-icons/bi";

function ChatBox() {
  const [prompt, setPrompt] = useState("");
  const [sendDisabled, setSendDisabled] = useState(true);

  const handleOnPromptChange = (e) => {
    const newValue = e.target.value;
    setSendDisabled(newValue.length <= 0);
    setPrompt(newValue);
  };

  return (
    <div className={styles.conversationHolder}>
      <div className={styles.conversationWrapper}>
        <div className={styles.titleHolder}>
          <h1>Chat 1</h1>
        </div>
        <div className={styles.conversationBubblesHolder}></div>
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
            <BiSend aria-disabled={sendDisabled} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
