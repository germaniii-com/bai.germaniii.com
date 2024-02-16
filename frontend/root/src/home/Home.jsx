import { useEffect } from "react";
import style from "./index.module.scss";
import MainLayout from "../components/MainLayout";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function Home() {
  const [params] = useSearchParams();
  const reroute = useNavigate();

  useEffect(() => {
    if (!(params.has("email") && params.has("access_code"))) return;

    axiosInstance
      .post("/auth/access", {
        email: params.get("email"),
        access_code: params.get("access_code"),
      })
      .then(() => reroute("/chat"))
      .catch(() => {});
  }, [params]);

  return (
    <MainLayout>
      <div className={style.content}>
        <div className={style.floatee}>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
