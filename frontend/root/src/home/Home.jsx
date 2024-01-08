import { useCallback, useEffect, useState } from "react";
import style from "./index.module.scss";
import MainLayout from "../components/MainLayout";

function Home() {
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
    <MainLayout>
      <div className={style.content}>
        <button onClick={fetchServerHealth}>
          Server {serverStatus ? "can be reached" : "cannot be reached"}
        </button>
      </div>
    </MainLayout>
  );
}

export default Home;
