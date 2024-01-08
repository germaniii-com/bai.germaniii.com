import style from "./index.module.scss";
import { BiSun } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <span>
        <div className={style.capitalTitle}>B</div>eyond{" "}
        <div className={style.capitalTitle}>A</div>utomated{" "}
        <div className={style.capitalTitle}>I</div>nteraction{" "}
      </span>
      <BiSun />
    </nav>
  );
};

export default Navbar;
