import { HhDataProps } from "./HhData.props";
import styles from "./HhData.module.css";
import cn from "classnames";
import { Card } from "../Card/Card";

export const HhData = ({
  count,
  ...props
}: HhDataProps): JSX.Element => {
  return (
    <div
      className={cn(styles.hh)}
      {...props}
    >
      <Card color="white" className={styles.vacancyCard}>
        <div className={styles.vacancyTitle}>Всего вакансий</div>
        <div className={styles.vacancyValue}>{count}</div>
      </Card>
    </div>
  );
};
