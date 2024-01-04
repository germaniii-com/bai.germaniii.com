import { useCallback, useEffect, useState } from "react";
import style from "./index.module.scss";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

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
    <div className={style.root}>
      <Navbar />
      <div className={style.content}>
        <button onClick={fetchServerHealth}>
          Server {serverStatus ? "can be reached" : "cannot be reached"}
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
