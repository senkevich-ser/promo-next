/* eslint-disable react/display-name */
import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

export const Input = forwardRef(
  (
    { className, error, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.errorWrapper,className)}>
        <input
          className={cn(
            styles.input,
            {
              [styles.error]: error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
