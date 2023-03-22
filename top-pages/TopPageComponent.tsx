import { Htag, Tag } from "@/components";
import Head from "next/head";
import styles from "./TopPageComponent.module.css";
import { TopPageComponentProps } from "./TopPageComponent.props";
import cn from 'classnames';

export const TopPageComponent = ({
  firstCategory,
  page,
  products,
}: TopPageComponentProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
     <Head>
        <title>{page.title}</title>
      </Head>
      <div className={cn(styles.title)}>
      <Htag tag={"h1"}>{page.title}</Htag>
      <Tag color="grey" size="l">{products.length}</Tag>
      <span>Сортировка</span>
      </div>
      <div className={styles.products}>{products && products.map((p) => <div key={p._id}>{p.title}</div>)}</div>
      <div className={cn(styles.title,styles.hhTitle)}>
      <Htag tag={"h2"}>Вакансии - {page.category}</Htag>
      <Tag color="red" size="l">hh.ru</Tag>
      </div>
    </div>
    
  );
};
