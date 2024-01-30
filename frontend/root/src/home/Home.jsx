import { useState } from "react";
import style from "./index.module.scss";
import MainLayout from "../components/MainLayout";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidAccessCode } from "../utils/stringUtils";
import axiosInstance, { axiosInstanceRoot } from "../utils/axiosInstance";

function Home() {
  const [accessRequest, setAccessRequest] = useState(0); // 0 - default, 1 - sign up, 2 - login
  const [formData, setFormData] = useState({ email: "", access_code: "" });
  const [formError, setFormError] = useState();
  const reroute = useNavigate();
  const submitForm = () => {
    if (!isValidEmail(formData.email)) {
      setFormError("Invalid Email");
      return;
    }

    switch (accessRequest) {
      case 1:
        axiosInstance
          .post("/auth/request", { email: formData.email })
          .then((res) =>
            alert(
              `Please check your email for the access code. For the mean time, here are the creds\n
                ${JSON.stringify(res.data)}`
            )
          )
          .catch((error) => setFormError(error.message));
        break;
      case 2:
        if (!isValidAccessCode(formData.access_code)) {
          setFormError("Invalid Access Code");
          return;
        }
        axiosInstanceRoot
          .get("/sanctum/csrf-cookie")
          .then(() =>
            axiosInstance
              .post("/auth/access", formData)
              .then(() => reroute("/chat"))
              .catch(() => setFormError("Unauthenticated"))
          )
          .catch(() =>
            setFormError(
              "There was an error with the server. Please try again later."
            )
          );

        break;
    }
  };
  const onInputChange = (newValue) => {
    setFormError("");
    setFormData((prev) => ({ ...prev, ...newValue }));
  };
  const onBackClicked = () => {
    setFormData({ email: "", access_code: "" });
    setAccessRequest(0);
  };

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
                  id="email"
                  placeholder={"Email"}
                  value={formData.email}
                  onChange={(e) =>
                    onInputChange({ [e.target.id]: e.target.value })
                  }
                  required
                />
                {accessRequest != 1 && (
                  <input
                    type="text"
                    id="access_code"
                    placeholder={"Access Code"}
                    value={formData.access_code}
                    onChange={(e) =>
                      onInputChange({ [e.target.id]: e.target.value })
                    }
                    required
                  />
                )}
              </form>
              <div className={style.buttonsHolder}>
                <div className={style.backButtonHolder} onClick={onBackClicked}>
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
