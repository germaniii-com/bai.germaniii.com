import { useState } from "react";
import style from "./index.module.scss";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidAccessCode } from "../../../utils/stringUtils";
import axiosInstance from "../../../utils/axiosInstance";

function AccessView() {
  const [formData, setFormData] = useState({ email: "", access_code: "" });
  const [formError, setFormError] = useState();
  const [requestDisabled, setRequestDisabled] = useState(false);
  const reroute = useNavigate();
  const submitForm = () => {
    if (requestDisabled) return;
    if (!isValidEmail(formData.email)) {
      setFormError("Invalid Email");
      return;
    }
    setRequestDisabled(true);
    setFormError("");

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
  };
  const onInputChange = (newValue) => {
    setFormError("");
    setRequestDisabled(false);
    setFormData((prev) => ({ ...prev, ...newValue }));
  };

  return (
    <>
      <div className={style.header}>B.A.I.</div>
      <div className={style.subheader}>Beyond Automated Interaction</div>
      <p>Login to your demo account below to access BAI.</p>
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
        </form>
        <div className={style.requestButton}>
          <button onClick={submitForm}>
            Access
            <BiRightArrowAlt />
          </button>
          <span onClick={() => reroute("/")}>
            <BiLeftArrowAlt /> Back
          </span>
        </div>
      </div>
    </>
  );
}

export default AccessView;
