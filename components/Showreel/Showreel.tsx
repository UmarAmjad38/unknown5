import { useEffect, useRef } from "react";
import Elements from "./Elements";
import s from "./showreel.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { ShowreelHeading } from "../Svg/Svg";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Showreel = () => {
  const container = useRef<HTMLElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (video.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: video.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      });

      timeline
        .fromTo(
          video.current,
          { x: 0, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
          {
            x: 0,
            y: -100,
            duration: 1.7,
            ease: "power1.out",
            clipPath: "polygon(0 0, 100% 0, 100% 91%, 0 100%)",
          }
        )
        .to(video.current, {
          x: -40,
          y: -100,
          duration: 1,
          ease: "power1.out",
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        })
        .to(video.current, {
          x: -40,
          y: -100,
          duration: 2,
          ease: "power1.out",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)",
        });
    }
  }, []);

  useEffect(() => {
    if (heading.current) {
      const words = heading.current.querySelectorAll(".word");

      words.forEach((word, index) => {
        const letters = word.querySelectorAll(".letter");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heading.current,
            start: "top 90%",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.fromTo(
          word,
          {
            opacity: 0,
            rotationY: -90,
            transformPerspective: 1000,
            transformOrigin: "50% 50%",
          },
          {
            opacity: 1,
            rotationY: 0,
            duration: 1.0,
            ease: "power3.out",
            delay: index * 0.3,
          }
        ).to(word, {
          rotationY: 90,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.02,
        });

        tl.fromTo(
          letters,
          {
            opacity: 0,
            rotationY: -90,
            transformPerspective: 1000,
            transformOrigin: "50% 50%",
          },
          {
            opacity: 1,
            rotationY: 0,
            stagger: {
              each: 0.1,
              from: "end",
            },
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }
  }, []);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: `(min-width: 800px)`,
          isMobile: `(max-width: 799px)`,
        },
        (context) => {
          let { isDesktop } = context.conditions as { isDesktop: boolean };

          // gsap
          //   .timeline({
          //     scrollTrigger: {
          //       trigger: container.current,
          //       start: "top 40%",
          //       toggleActions: "play none none reverse",
          //       fastScrollEnd: isDesktop,
          //       preventOverlaps: isDesktop,
          //     },
          //     defaults: {
          //       ease: "power4.inOut",
          //     },
          //   })
          //   .from(".showreel-heading path", {
          //     strokeDashoffset: 1740,
          //     duration: 0.8,
          //     ease: "none",
          //   })
          //   .to(".showreel-heading path", {
          //     duration: 0.8,
          //     fill: "black",
          //     ease: "power3",
          //   });

          // gsap
          //   .timeline({
          //     scrollTrigger: {
          //       trigger: ".showreel-video",
          //       start: "top bottom",
          //       toggleActions: "play none none reverse",
          //       fastScrollEnd: isDesktop,
          //       preventOverlaps: isDesktop,
          //     },
          //     defaults: {
          //       ease: "power4.inOut",
          //     },
          //   })
          //   .from(".showreel-video", {
          //     clipPath: "inset(100% 25% 0% 25%)",
          //     duration: 2,
          //   });

          gsap.to(heading.current, {
            scrollTrigger: {
              trigger: heading.current,
              start: "top 100%",
              end: "bottom top",
              scrub: true,
            },
            x: () => {
              const scrollY = gsap.getProperty(heading.current, "scrollY");
              const scrollYNumber =
                typeof scrollY === "number" ? scrollY : parseFloat(scrollY);
              return `${Math.sin(scrollYNumber / 100) * 200}px`;
            },
            ease: "none",
            color: "black",
          });

          gsap.from(".path-6 path", {
            scrollTrigger: {
              trigger: ".path-6",
              scrub: true,
              end: "bottom 20%",
            },
            strokeDashoffset: 2600,
            ease: "none",
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: container.current,
                scrub: true,
                end: "bottom top",
              },
              defaults: { ease: "none" },
            })
            .to(".path-3", { bottom: "-35%" })
            .to(".path-4", { bottom: "-10%" }, "<")
            .to(".path-8", { bottom: "-20%" }, "<");
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} id="showreel" className={s.main}>
      <Elements />
      <div ref={heading} className={`showreel-heading ${s.heading}`}>
        <div className="word">
          {"Watch".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"New".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"Showreel".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div
        ref={video}
        className={`showreel-video`}
        style={{
          paddingTop: "56.25%",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: 0,
        }}
      >
        <iframe
          src="https://player.vimeo.com/video/985974400?h=0afc317c3c&autopause=false&autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=1&controls=0"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            pointerEvents: "none",
          }}
          frameBorder={0}
          allow="autoplay; picture-in-picture"
        ></iframe>
      </div>
    </section>
  );
};

export default Showreel;
