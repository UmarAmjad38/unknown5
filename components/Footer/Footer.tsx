import { Star } from "../Svg/Svg";
import s from "./footer.module.scss";
import Elements from "./Elements";
import CustomLink from "./CustomLink";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { memo } from "react"

const Footer = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top center",
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          defaults: {
            ease: "power4.inOut",
          },
        })
        .from(".footer-star-2", { scale: 0, rotate: 360 })
        .from(".footer-path-1 path", { xPercent: 100, stagger: 0.1 }, "<0.2")
        .from(".footer-path-5 ", { yPercent: 100 }, "<0.2")
        .from(
          ".footer-nav-1 a",
          { clipPath: "inset(100% 0% 0% 0%)", stagger: 0.1 },
          "<0.2"
        )
        .from(".footer-nav-2 a", {
          clipPath: "inset(100% 0% 0% 0%)",
          stagger: 0.1,
        });
    },
    { scope: container }
  );

  return (
    <footer ref={container} id="footer" className={s.main}>
      {/* <Elements /> */}
      <div className={`footer-star-2 ${s.star}`}>
        <Star />
      </div>
      <nav className={`footer-nav-1 ${s.nav}`}>
        <CustomLink href="/" text="Work" />
        <CustomLink href="/" text="Archive" />
        <CustomLink href="/" text="Clients" />
        <CustomLink href="/" text="Services" />
        <CustomLink href="/" text="About" />
        <CustomLink href="/" text="Contact" />
      </nav>
      <div className={`footer-nav-2 ${s.nav}`}>
        <CustomLink
          href="https://www.linkedin.com/in/philippe-layani-56636a77"
          text="Linkedin"
        />
        {/* <CustomLink
          href="https://www.instagram.com/mudassir"
          text="Instagram"
        /> */}
        <CustomLink href="https://www.behance.net/mudassir"
         text="Twitter" 
         />
        <CustomLink href="https://www.behance.net/mudassir" 
        text="Behance" 
        />
      </div>
      <div className={s.foot}>
        <p className="footer-foot">From Berlin & Vienna with Heart</p>
      </div>
    </footer>
  );
};

export default memo(Footer);
