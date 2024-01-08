import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./index.module.scss";

const MainLayout = ({ children }) => {
  return (
    <div className={style.root}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
