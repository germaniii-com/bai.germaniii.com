import style from "./index.module.scss";
import {
  SiYoutube,
  SiLinkedin,
  SiInstagram,
  SiGithub,
  SiGmail,
} from "react-icons/si";

const socialLinks = [
  {
    icon: (
      <SiGmail className="fill-primary w-3 md:group-hover:motion-safe:animate-bounce" />
    ),
    link: "mailto:germaniiifelisarta@gmail.com",
  },
  {
    icon: (
      <SiGithub className="fill-primary w-3 md:group-hover:motion-safe:animate-bounce" />
    ),
    link: "https://github.com/germaniii",
  },
  {
    icon: (
      <SiInstagram className="fill-primary w-3 md:group-hover:motion-safe:animate-bounce" />
    ),
    link: "https://instagram.com/germaniiifelisarta",
  },
  {
    icon: (
      <SiLinkedin className="fill-primary w-3 md:group-hover:motion-safe:animate-bounce" />
    ),
    link: "https://www.linkedin.com/in/german-iii-felisarta-648b9420b",
  },
  {
    icon: (
      <SiYoutube className="fill-primary w-3 md:group-hover:motion-safe:animate-bounce" />
    ),
    link: "https://www.youtube.com/channel/UCLdx8-LN-JAnrExazmhjmDA",
  },
];

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.title}>German III</div>
      <ul>
        {socialLinks.map((social) => (
          <div key={social.link} className={style.item}>
            <a key={social.link} href={social.link}>
              <li key={social.link}>{social.icon}</li>
            </a>
          </div>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
