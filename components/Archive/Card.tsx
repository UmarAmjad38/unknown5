import s from "./archive.module.scss";
import type { Data } from "./data";

type Props = Data & { id: number };

const Card: React.FC<Props> = ({
  imgVarient,
  heading,
  para,
  position,
  id,
  video,
  lessPad,
}) => {
  return (
    <div data-varient={position} className={`archive-card-${id} ${s.card}`}>
      <div
        style={{ backgroundImage: `url(/archive/${id}.png)` }}
        data-varient={imgVarient}
        className={s.card_img}
      >
        {video && (
          <iframe
            src={video}
            className={s.card_video}
            frameBorder={0}
            allow="autoplay; fullscreen; picture-in-picture"
          ></iframe>
        )}
      </div>

      <div data-varient={imgVarient} data-less={lessPad} className={s.card_box}>
        <div>
          {heading.map((e, i) => {
            return <h2 key={i}>{e}</h2>;
          })}
        </div>
        <p>{para}</p>
      </div>
    </div>
  );
};

export default Card;
