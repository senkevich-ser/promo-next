import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import Image from 'next/image';
import cn from "classnames";

export const Button = ({
  children,
  appearance,
  arrow='none',
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <>
      <button
        className={cn(styles.button, className, {
          [styles.primary]: appearance == "primary",
          [styles.ghost]: appearance == "ghost",
        })}
        {...props}
      >
        {children}
        {arrow!='none'&&<span className={cn(styles.arrow, className, {
          [styles.down]: arrow == "down",
        })}><Image src="../../arrow.svg" alt="#" width={6}
        height={10}/></span>}
      </button>
    </>
  );
};
