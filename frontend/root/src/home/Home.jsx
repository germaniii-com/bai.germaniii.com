import { useCallback, useEffect, useState } from "react";
import style from "./index.module.scss";
import MainLayout from "../components/MainLayout";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Home() {
  const [serverStatus, setServerStatus] = useState(false);
  const [accessRequest, setAccessRequest] = useState(0); // 0 - default, 1 - sign up, 2 - login
  const [formData, setFormData] = useState("");
  const [formError, setFormError] = useState();
  const reroute = useNavigate();
  const fetchServerHealth = useCallback(
    () =>
      fetch("http://localhost:8006/api/health")
        .then(() => setServerStatus(true))
        .catch(() => setServerStatus(false)),
    [setServerStatus]
  );
  const submitForm = () => {
    if (accessRequest == 1) {
      if (!formData.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/))
        setFormError("Invalid Email");
      else alert("valid email");
    } else {
      if (formData.length < 10) setFormError("Invalid Access Code");
      else reroute("/chat");
    }
  };
  const onInputChange = (newValue) => {
    setFormError(undefined);
    setFormData(newValue);
  };

  useEffect(() => fetchServerHealth, [setServerStatus]);

  return (
    <MainLayout>
      <div className={style.content}>
        <div className={style.floatee}>
          <div className={style.header}>B.A.I.</div>
          <div className={style.subheader}>Beyond Automated Interaction</div>
          <p>
            B.A.I. is a web application to interact with various Open Source
            Large Language Models. Check out BAI today.
          </p>
          {!accessRequest && (
            <div className={style.requestButton}>
              <button onClick={() => setAccessRequest(1)}>
                Request a demo {">"}
              </button>
              <span onClick={() => setAccessRequest(2)}>
                Already have an access code?
              </span>
            </div>
          )}
          {!!accessRequest && (
            <div className={style.form}>
              <form onSubmit={(e) => e.preventDefault()}>
                {!!formError && <p>{formError}</p>}
                <input
                  type="text"
                  id="fieldData"
                  placeholder={accessRequest == 1 ? "Email" : "Access Code"}
                  value={formData}
                  onChange={(e) => onInputChange(e.target.value)}
                  required
                />
              </form>
              <div className={style.buttonsHolder}>
                <div
                  className={style.backButtonHolder}
                  onClick={() => {
                    setFormData("");
                    setAccessRequest(0);
                  }}
                >
                  <BiLeftArrowAlt /> Back
                </div>
                <div className={style.sendButtonHolder} onClick={submitForm}>
                  {accessRequest == 1 ? "Request" : "Access"}
                  <BiRightArrowAlt />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
