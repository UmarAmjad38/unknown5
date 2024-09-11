import s from "./hero.module.scss";
import { HeroArrowDown } from "../Svg/Svg";
import Data from "./lottie/data.json";
import Data2 from './lottie/EndPortion.json';
import DataM from './lottie/data-m.json';
import DataM2 from './lottie/data-m2.json';
import { useScrollTo } from "react-use-window-scroll";
import useWindowSize from "@/hooks/useWindowSize";
import Lottie from "react-lottie";
import { useState, useEffect } from "react";
import { flushAllTraces } from "next/dist/trace";

const Hero = () => {
  const scrollTo = useScrollTo();
  const size = useWindowSize();
  const [showData2, setShowData2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowData2(true);
    }, 15800); // Switch to second GIF after 16 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className={s.main}>
      <div onClick={() => scrollTo({ top: innerHeight, behavior: "smooth" })} className={s.arrow}>
        <HeroArrowDown />
      </div>
      <div className={s.lottie}>
        {size?.width && size.width > 640 ? (
          <Lottie
            options={{
              loop: showData2 ? true : false,
              autoplay: true,
              animationData: showData2 ? Data2 : Data,
            }}
          />
        ) : (
          <Lottie
            options={{
              loop: showData2 ? true : false,
              autoplay: true,
              animationData: showData2 ? DataM2 : DataM,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
