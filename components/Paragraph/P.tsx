import { PProps } from "./P.props";
import styles from "./P.module.css";
import cn from "classnames";

export const Paragraph = ({
  children,
  size='m',
  className,
  ...props
}: PProps): JSX.Element => {
  return (
      <p
        className={cn(styles.middle, className, {
          [styles.s]: size == "s",
          [styles.l]: size == "l",
          [styles.m]: size == "m",
        })}
        {...props}
      >
        {children}
    </p>
  );
};
