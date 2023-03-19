import styles from "./Menu.module.css";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "@/helpers/helpers";



export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);

  const router = useRouter();

  const secondLevelOpen=(secondCtegory:string)=>{
    setMenu && setMenu(menu.map(m=>{
      if(m._id.secondCategory==secondCtegory){
        m.isOpened=!m.isOpened;
      }
      return m;
    }));
  };



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
      {menu.map(m=>{
        if(m.pages.map(p=>p.alias).includes(router.asPath.split('/')[2])){
           m.isOpened=true;
        }
        return(
        <div key={m._id.secondCategory}>
<div className={cn(styles.secondLevel)} onClick={()=>secondLevelOpen(m._id.secondCategory)}>{m._id.secondCategory}</div>
<div className={cn(styles.secondLevelBlock,{
  [styles.secondLevelBlockOpened]:m.isOpened
})}>
  {buildThirdLevel(m.pages,menuItem.route)}
</div>
        </div>
  );})}
      </div>
    );
  };

  const buildThirdLevel = (pages:PageItem[],route:string) => {
    return (
      <>
      {pages.map(p=>(
        <Link key={p._id} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel,{
          [styles.thirdLevelActive]:`/${route}/${p.alias}`==router.asPath
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
