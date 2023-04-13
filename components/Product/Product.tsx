import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import cn from "classnames";
import { Card } from "../Card/Card";
import Image from "next/image";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";

export const Product= ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  return (
    <Card
      className={cn(styles.product, className)}>
      <div className={styles.logo}>
        <Image src={process.env.NEXT_PUBLIC_DOMAIN+product.image} alt={product.title} width={70} height={70}/>
        </div>
    <div className={styles.title}>{product.title}</div>
    <div className={styles.price}>{product.price}</div>
    <div className={styles.credit}>{product.credit}</div>
    <div className={styles.rate}>
      <Rating rating={product.reviewAvg ?? product.initialRating}/>
      </div>
    <div className={styles.tags}>
      {product.categories.map((c)=><Tag key={c} color={'primary'}>{c}</Tag>)}
      </div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>в кредит</div>
      <div className={styles.rateTitle}>{product.reviewCount} отзывов</div>
      <div className={styles.hr}><hr/></div>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.feature}>фичи</div>
      <div className={styles.advBlock}>
        <div className={styles.advantages}>
          <div>Преимущества</div>
          <div>{product.advantages}</div>
        </div>
        <div className={styles.advantages}>
          <div>Недостатки</div>
          <div>{product.disadvantages}</div>
        </div>
      </div>
      <div className={styles.hr}><hr/></div>
      <div className={styles.actions}>
        <Button appearance="primary" >Узнать подробнее</Button>
        <Button appearance="ghost" arrow="right">Читать отзывы</Button>
      </div>
    </Card>
  );
};
