import { useEffect, useState } from "react";
import style from "./index.module.scss";
import MainLayout from "../components/MainLayout";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isValidEmail, isValidAccessCode } from "../utils/stringUtils";
import axiosInstance, { axiosInstanceRoot } from "../utils/axiosInstance";

function Home() {
  const [params] = useSearchParams();
  const [accessRequest, setAccessRequest] = useState(0); // 0 - default, 1 - sign up, 2 - login
  const [formData, setFormData] = useState({ email: "", access_code: "" });
  const [formError, setFormError] = useState();
  const [requestDisabled, setRequestDisabled] = useState(false);
  const reroute = useNavigate();
  const submitForm = () => {
    if (!isValidEmail(formData.email)) {
      setFormError("Invalid Email");
      return;
    }

    setRequestDisabled(true);
    setFormError("");
    switch (accessRequest) {
      case 1:
        if (requestDisabled) return;
        axiosInstance
          .post("/auth/request", { email: formData.email })
          .then(() => {
            setRequestDisabled(true);
            alert(
              `Please check your email for the access code. If you have not received it, please check your spam folder as well. Thank you!`
            );
          })
          .catch((error) => {
            setFormError(error?.response?.data?.message ?? error.message);
            setRequestDisabled(false);
          });
        break;
      case 2:
        if (!isValidAccessCode(formData.access_code)) {
          setFormError("Invalid Access Code");
          return;
        }
        axiosInstance
          .post("/auth/access", formData)
          .then((res) => {
            setRequestDisabled(true);
            sessionStorage.setItem("token", res.data.token);
            reroute("/chat");
          })
          .catch(() => {
            setRequestDisabled(true);
            setFormError("Unauthenticated");
          });

        break;
    }
  };
  const onInputChange = (newValue) => {
    setFormError("");
    setRequestDisabled(false);
    setFormData((prev) => ({ ...prev, ...newValue }));
  };
  const onBackClicked = () => {
    setFormData({ email: "", access_code: "" });
    setFormError("");
    setRequestDisabled(false);
    setAccessRequest(0);
  };

  useEffect(() => {
    if (!(params.has("email") && params.has("access_code"))) return;

    axiosInstanceRoot
      .get("/sanctum/csrf-cookie")
      .then(() =>
        axiosInstance
          .post("/auth/access", {
            email: params.get("email"),
            access_code: params.get("access_code"),
          })
          .then(() => reroute("/chat"))
          .catch(() => setFormError("Unauthenticated"))
      )
      .catch(() =>
        setFormError(
          "There was an error with the server. Please try again later."
        )
      );
  }, [params]);

  return (
    <MainLayout>
      <div className={style.content}>
        <div className={style.floatee}>
          <div className={style.header}>B.A.I.</div>
          <div className={style.subheader}>Beyond Automated Interaction</div>
          <p>
            {accessRequest === 0
              ? "B.A.I. is a web application to interact with Open Source Large Language Models. Check out BAI today."
              : accessRequest === 1
              ? "An email with the access code will be sent to you shortly after requesting for a demo."
              : "Login to your demo account below to access BAI."}
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
                    onInputChange({ [e.target.id]: e.target.value.trim() })
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
                      onInputChange({ [e.target.id]: e.target.value.trim() })
                    }
                    required
                  />
                )}
              </form>
              <div className={style.buttonsHolder}>
                <div className={style.backButtonHolder} onClick={onBackClicked}>
                  <BiLeftArrowAlt /> Back
                </div>
                <div
                  className={`${
                    accessRequest === 1 && requestDisabled
                      ? style.sendButtonHolder__disabled
                      : style.sendButtonHolder
                  }`}
                  onClick={submitForm}
                >
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
