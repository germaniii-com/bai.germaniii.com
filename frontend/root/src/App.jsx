import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [serverStatus, setServerStatus] = useState(false);
  const fetchServerHealth = useCallback(
    () =>
      fetch("http://localhost:8006/api/health")
        .then(() => setServerStatus(true))
        .catch(() => setServerStatus(false)),
    [setServerStatus]
  );

  useEffect(() => fetchServerHealth, [setServerStatus]);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={fetchServerHealth}>
          Server {serverStatus ? "can be reached" : "cannot be reached"}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
