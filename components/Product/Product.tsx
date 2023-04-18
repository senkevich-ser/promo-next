import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import cn from "classnames";
import { Card } from "../Card/Card";
import Image from "next/image";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { decOfNum, priceRu } from "@/helpers/helpers";
import { Divider } from "../Divider/Divider";

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
    <div className={styles.price}>
      <div>{priceRu(product.price)}</div>
      {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceRu(product.price-product.oldPrice)}</Tag>}
      </div>
    <div className={styles.credit}>
      {priceRu(product.credit)}/
      <span className={styles.month}>в мес</span>
      </div>
    <div className={styles.rate}>
      <Rating rating={product.reviewAvg ?? product.initialRating}/>
      </div>
    <div className={styles.tags}>
      {product.categories.map((c)=><Tag key={c} color={'primary'}>{c}</Tag>)}
      </div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>в кредит</div>
      <div className={styles.rateTitle}>{product.reviewCount} {decOfNum(product.reviewCount,['отзыв','отзыва','отзывов'])}</div>
      <Divider className={styles.hr}/>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.feature}>
        {product.characteristics.map((c)=><div key={c.value} className={styles.characteristics}>
          <span className={styles.characteristicsTitle}>{c.name}</span>
          <div className={styles.characteristicsDashed}></div>
          <span className={styles.characteristicsValue}>{c.value}</span>
        </div>)}
      </div>
      <div className={styles.advBlock}>
        {product.advantages && <div className={styles.advantages}>
          <div className={styles.advantagesTitle}>Преимущества</div>
          <div className={styles.advantagesText}>{product.advantages}</div>
        </div>}
        {product.disadvantages && <div className={styles.disadvantages}>
          <div className={styles.advantagesTitle}>Недостатки</div>
          <div className={styles.advantagesText}>{product.disadvantages}</div>
        </div>}
      </div>
      <Divider className={styles.hr}/>
      <div className={styles.actions}>
        <Button  className={styles.buttomPrimary} appearance="primary" >Узнать подробнее</Button>
        <Button appearance="ghost" arrow="right">Читать отзывы</Button>
      </div>
    </Card>
  );
};
