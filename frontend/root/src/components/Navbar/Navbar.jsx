import { useNavigate } from "react-router-dom";
import style from "./index.module.scss";
import { BiLogOut, BiSun } from "react-icons/bi";

const Navbar = () => {
  const reroute = useNavigate();
  const handleLogout = () => {
    reroute("/");
  };
  return (
    <nav className={style.navbar}>
      <span>
        <div className={style.capitalTitle}>B</div>eyond{" "}
        <div className={style.capitalTitle}>A</div>utomated{" "}
        <div className={style.capitalTitle}>I</div>nteraction{" "}
      </span>
      <BiLogOut onClick={handleLogout} />
      <BiSun />
    </nav>
  );
};

export default Navbar;
