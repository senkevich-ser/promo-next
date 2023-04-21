import { Advantages, HhData, Htag, Product, Sort, Tag } from "@/components";
import Head from "next/head";
import styles from "./TopPageComponent.module.css";
import { TopPageComponentProps } from "./TopPageComponent.props";
import cn from "classnames";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { SortEnum } from "@/components/Sort/Sort.props";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";

export const TopPageComponent = ({
  firstCategory,
  page,
  products,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispathSort] = useReducer(
    sortReducer,
    { products, sort: SortEnum.Price }
  );

  useEffect(() => {
    dispathSort({ type: "reset", initialState: products });
  }, [products]);

  const setSort = (sort: SortEnum) => {
    dispathSort({ type: sort });
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{page.title}</title>
      </Head>
      <div className={cn(styles.title)}>
        <Htag tag={"h1"}>{page.title}</Htag>
        <Tag color="grey" size="l">
          {products.length}
        </Tag>
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div className={styles.products}>
        {sortedProducts &&
          sortedProducts.map((p) => <Product key={p._id} product={p} />)}
      </div>
      <div className={cn(styles.title, styles.hhTitle)}>
        <Htag tag={"h2"}>Вакансии - {page.category}</Htag>
        <Tag color="red" size="l">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      <Htag tag={"h2"}>Преимущества</Htag>
      {page.advantages && <Advantages advantages={page.advantages} />}
      <div
        className={styles.seoText}
        dangerouslySetInnerHTML={{ __html: page.seoText }}
      ></div>
      <Htag tag={"h2"}>Получаемые навыки</Htag>
      {page.tags &&
        page.tags.map((t) => (
          <Tag color={"primary"} key={t}>
            {t}
          </Tag>
        ))}
    </div>
  );
};
