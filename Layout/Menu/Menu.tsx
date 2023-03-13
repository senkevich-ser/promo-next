import styles from "./Menu.module.css";
import cn from "classnames";
import { format } from "date-fns";
import { useContext } from "react";
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from "@/interfaces/page.interface";
import Link from "next/link";

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: "courses",
    name: "Курсы",
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: "services",
    name: "Сервисы",
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: "books",
    name: "Книги",
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: "products",
    name: "Товары",
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((mItem) => (
          <div key={mItem.route}>
            <Link href={`/${mItem.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActiv]: mItem.id == firstCategory,
                })}
              >
                {mItem.icon}
                <span>{mItem.name}</span>
              </div>
            </Link>
            {mItem.id == firstCategory && buildSecondLevel(mItem)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem:FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
      {menu.map(m=>(
        <div key={m._id.secondCategory}>
<div className={cn(styles.secondLevel)}>{m._id.secondCategory}</div>
<div className={cn(styles.secondLevelBlock,{
  [styles.secondLevelBlockOpened]:m.isOpened
})}>
  {buildThirdLevel(m.pages,menuItem.route)}
</div>
        </div>
      ))}
      </div>
    );
  };

  const buildThirdLevel = (pages:PageItem[],route:string) => {
    return (
      <>
      {pages.map(p=>(
        <Link key={p._id} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel,{
          [styles.thirdLevelActive]:true
        })}>
          {p.title}
        </Link>
      ))}
      </>
    );
  };

  return (
    <>
      <div className={styles.menu}>{buildFirstLevel()}</div>
    </>
  );
};
