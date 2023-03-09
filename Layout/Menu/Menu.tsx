import styles from "./Footer.module.css";
import cn from "classnames";
import {format} from 'date-fns';
import { useContext } from "react";
import { AppContext } from "@/context/app.context";

export const Menu = (): JSX.Element => {
  const{menu,firstCategory,setMenu}=useContext(AppContext);
  return (
    <ul>
    {menu.map((m) => (
      <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
    ))}
  </ul>
  );
};
