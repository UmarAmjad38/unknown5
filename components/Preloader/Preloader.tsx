import Lottie from "lottie-react";
import s from "./preloader.module.scss";
import Loader from "./loader.json";
import { useEffect, useState } from "react";
import { memo } from "react"

const Preloader = () => {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(true);
    }, 2800);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div data-hide={state} className={s.main}>
      <Lottie className={s.main_cover} animationData={Loader} />
    </div>
  );
};

export default memo(Preloader);
