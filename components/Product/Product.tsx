import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import cn from "classnames";

export const Product= ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  return (
    <div
      className={cn(styles.product, className)}
      {...props}
    >
      {product && product.title}
    </div>
  );
};
