import { useRef, useEffect, useState } from "react";
import Header from "../Header/Header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { store } from "@/store";
import Preloader from "../Preloader/Preloader";
import { memo } from "react"

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const container = useRef<HTMLElement>(null);
  const mouseHover = useRef<GSAPTween>();
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const [initialized, setInitialized] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      xTo.current = gsap.quickTo(".mouse", "x", {
        duration: 0.01,
        ease: "none",
      });
      yTo.current = gsap.quickTo(".mouse", "y", {
        duration: 0.01,
        ease: "none",
      });

      mouseHover.current = gsap.to(".mouse", {
        scale: 0.4,
        ease: "power4",
        duration: 0.8,
        background: "transparent",
        paused: true,
      });

      let tl = gsap
        .timeline({ paused: true })
        .to(".mouse", { scale: 0.6 })
        .to(".mousepara", { opacity: 1 }, "<0.4");

      store.workHeadingPointerEnter = () => {
        tl.play();
      };
      store.workHeadingPointerLeave = () => {
        tl.reverse();
      };
    },
    { scope: container }
  );

  useEffect(() => {
    const hideMouseInitially = () => {
      const mouseElement = document.querySelector(".mouse");
      if (mouseElement) {
        mouseElement.classList.add("hidden");
      }
    };

    hideMouseInitially();

    const storedX = localStorage.getItem("mouseX");
    const storedY = localStorage.getItem("mouseY");

    if (storedX && storedY) {
      xTo.current?.(parseFloat(storedX));
      yTo.current?.(parseFloat(storedY));
    } else {
      xTo.current?.(window.innerWidth / 2 - 90);
      yTo.current?.(window.innerHeight / 2 - 90); 
    }

    const showMouseAfterDelay = () => {
      setTimeout(() => {
        const mouseElement = document.querySelector(".mouse");
        if (mouseElement) {
          mouseElement.classList.remove("hidden");
        }
      }, 100); 
    };

    showMouseAfterDelay();

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - 90; 
      const y = e.clientY - 90; 

      xTo.current?.(x);
      yTo.current?.(y);

      localStorage.setItem("mouseX", x.toString());
      localStorage.setItem("mouseY", y.toString());
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [contextSafe]);

  const moveMover = contextSafe((e: React.MouseEvent) => {
    xTo.current!(e.clientX - 90);
    yTo.current!(e.clientY - 90);
  });

  const handlePointerEnter = contextSafe(() => {
    gsap
      .timeline()
      .to(".menuinside", { opacity: 0, stagger: 0.1 })
      .to(".menuoutside", { opacity: 1, stagger: 0.1 }, "<")
      .to(
        ".menuoutside",
        {
          keyframes: { y: [0, 80, 0], opacity: [1, 0, 0] },
          stagger: {
            amount: 0.1,
            from: "random",
          },
          duration: 1.5,
        },
        "<0.1"
      )
      .to(".menuinside", { opacity: 1, duration: 0.2, stagger: 0.1 }, "<0.3");
    mouseHover.current?.play();
  });

  const handlePointerLeave = contextSafe(() => {
    mouseHover.current?.reverse();
  });

  return (
    <main onMouseMove={moveMover} ref={container}>
      <div className="mouse hidden">
        <p className="mousepara">View</p>
      </div>
      <Preloader />
      <Header
        menuBtnEnter={handlePointerEnter}
        menuBtnLeave={handlePointerLeave}
      />
      {children}
    </main>
  );
};

export default memo(Layout);
