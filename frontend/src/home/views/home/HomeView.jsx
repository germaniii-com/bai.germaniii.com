import { useNavigate } from "react-router-dom";
import style from "./index.module.scss";

function HomeView() {
  const reroute = useNavigate();
  return (
    <>
      <div className={style.header}>B.A.I.</div>
      <div className={style.subheader}>Beyond Automated Interaction</div>
      <p>
        B.A.I. is a web application to interact with Open Source Large Language
        Models. Check out BAI today.
      </p>
      <div className={style.buttonsHolder}>
        <div className={style.requestButton}>
          <button onClick={() => reroute("/chat")}>
            Try out the demo {">"}
          </button>
          {/*
          <span onClick={() => reroute("/access")}>
            Already have an access code?
          </span>
          */}
        </div>
      </div>
    </>
  );
}

export default HomeView;
