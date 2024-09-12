import { useEffect, useRef, useState } from "react";
import Elements from "./Elements";
import s from "./work.module.scss";
import { data } from "./data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { WorkHeading } from "../Svg/Svg";
import Image from "next/image";
import { useSnapshot } from "valtio";
import { store } from "@/store";
// import Preloader from "../Preloader/Preloader";
import { useRouter } from "next/router";
import { memo } from "react"
// import Link from 'next/link';

const Work = () => {
  const container = useRef<HTMLElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState<number>(1);
  // const [loading, setLoading] = useState(false); 
  const router = useRouter();

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
        { isDesktop: `(min-width: 800px)`, isMobile: `(max-width: 799px)` },
        (context) => {
          let { isDesktop } = context.conditions as { isDesktop: boolean };

          gsap
            .timeline({
              scrollTrigger: {
                trigger: container.current!,
                start: "top 40%",
                toggleActions: "play none none reverse",
                fastScrollEnd: isDesktop,
                preventOverlaps: isDesktop,
              },
              defaults: {
                ease: "power4.inOut",
              },
            })
            .from(".work-heading path", {
              strokeDashoffset: 2340,
              duration: 1.2,
              ease: "none",
            })
            .to(".work-heading path", {
              duration: 1.2,
              fill: "black",
              ease: "power3.inOut",
            });

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: `.slider`,
              start: isDesktop ? "top+=100 top" : "top top",
              end: "bottom+=8000 bottom",
              scrub: 0.6,
              pin: true,
              pinSpacing: true,
            },
            defaults: { ease: "none" },
          });

          data.forEach((_, i) => {
            tl
              .call(() => setCounter(i + 1))
              .to(`.slide-${i - 1}`, { yPercent: -100})
              .from(`.slide-${i}`, { yPercent: i === 0 ? 0 : 100}, "<")
              .from(`.work-path-${i + 1}`, {
                scale: 0,
                duration: 1,
                ease: "power4.out",
              })
              .from(`.heading-${i}`, { scale: innerWidth < 1600 ? 0.6 : 0.6 })
              .from(`.image-${i}`, {
                left: isDesktop ? "120%" : "80%",
                top: isDesktop ? "50%" : "100%",
                rotate: -35,
                duration: 5,
              })
              .call(() => setCounter(i + 1))
              .to(`.work-path-${i + 1}`, {
                scale: 0,
                duration: 1,
                ease: "power4.out",
              });
          });
        }
      );
    },
    { scope: container }

    //       data.map((e, i) => {
    //         tl.call(() => setCounter(i + 1))
    //           .to(`.slide-${i - 1}`, { yPercent: -100 })
    //           .from(`.slide-${i}`, { yPercent: i === 0 ? 0 : 100 }, "<")
    //           .from(`.work-path-${i + 1}`, {
    //             scale: 0,
    //             duration: 0.8,
    //             ease: "power4",
    //           })
    //           .from(`.heading-${i}`, { scale: innerWidth < 1600 ? 0.6 : 0.6 })
    //           .from(`.image-${i}`, {
    //             left: isDesktop ? "120%" : "80%",
    //             top: isDesktop ? "50%" : "100%",
    //             rotate: -35,
    //             duration: 5,
    //           })
    //           .call(() => setCounter(i + 1))
    //           .to(`.work-path-${i + 1}`, {
    //             scale: 0,
    //             duration: 0.8,
    //             ease: "power4",
    //           });
    //       });
    //     }
    //   );
    // },
    // { scope: container }
  );

  const { workHeadingPointerEnter, workHeadingPointerLeave } =
    useSnapshot(store);

  const handleCardClick = (id: number) => {
    // // setLoading(true);
    // setTimeout(() => {
      // setLoading(false);
      router.push(`/work/${id}`); 
    // }, 1000); 
  };

  return (
    <section id="work" ref={container} className={s.main}>
      {/* {loading && <Preloader />}  */}
      <div ref={heading} className={`work-heading ${s.heading}`}>
        <div className="word">
          {"Discover".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"Latest".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"Projects".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div className={`slider ${s.slider}`}>
        <div className={s.counter}>
          <h2>0{counter}/08</h2>
        </div>

        {data.map(({ name }, i) => {
          return (
            <div key={i} className={`slide-${i} ${s.slide}`} onClick={() => handleCardClick(i)}>
              <Elements id={i} />
              <Image
                className={`image-${i} ${s.image}`}
                src={`/work/${i}.webp`}
                alt="image"
                height={2000}
                width={2000}
                loading="lazy" 
              />

              <div
                onPointerEnter={workHeadingPointerEnter}
                onPointerLeave={workHeadingPointerLeave}
              >
                <h2 className={`heading-${i}`}>{name}</h2>
                <h2 className={`heading-${i}`} data-stroke>
                  {name}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default memo(Work);
