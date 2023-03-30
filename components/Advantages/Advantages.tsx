import { AdvantagesProps } from "./Advantages.props";
import styles from "./Advantages.module.css";
import cn from "classnames";
import CheckIcon from "./check.svg";
import { Paragraph } from "../Paragraph/P";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages.map((a) => (
        <div key={a._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <Paragraph size='l' className={styles.description}>{a.description}</Paragraph>
        </div>
      ))}
    </>
  );
};
