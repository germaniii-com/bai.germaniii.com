import { useState } from "react";
import style from "./index.module.scss";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../../utils/stringUtils";
import axiosInstance from "../../../utils/axiosInstance";

function RequestView() {
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
      <p>
        An email with the access code will be sent to you shortly after
        requesting for a demo.
      </p>
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
        </form>
        <div className={style.requestButton}>
          <button onClick={submitForm}>
            Request
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

export default RequestView;
