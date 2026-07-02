import { Works } from "@/widgets/work-block/lib/types";
import cls from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  work: Works;
}

const WorkCard = ({ work }: Props) => {
  const cardContent = (
    <>
      <div className={cls.imgWrapper}>
        {work.img ? (
          <Image
            src={work.img}
            alt={work.name}
            width={2560}
            height={1440}
            priority={work.id <= 2}
            loading={work.id <= 2 ? "eager" : "lazy"}
          />
        ) : (
          <div className={cls.inDeveloping}>
            <h2>Project0{work.id}</h2>
          </div>
        )}
        {work.background_card && (
          <Image
            className={cls.backgroundCard}
            src={work.background_card}
            alt={`background-${work.name}`}
            width={2560}
            height={1440}
            loading="lazy"
          />
        )}
      </div>
      <div className={cls.textWrapper}>
        {work.description && <span>{work.description}</span>}
        <span className={cls.name}>( {work.name} )</span>
      </div>
    </>
  );
  return work.img ? (
    <Link
      href={work.href}
      key={work.id}
      className={cls.card}
      data-cursor="interactive"
      target="_blank"
      onMouseEnter={(e) => {
        document.dispatchEvent(
          new MouseEvent("mousemove", {
            clientX: e.clientX,
            clientY: e.clientY,
          }),
        );
      }}
    >
      {cardContent}
    </Link>
  ) : (
    <div key={work.id} className={cls.card}>
      {cardContent}
    </div>
  );
};

export default WorkCard;
