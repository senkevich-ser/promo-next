import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import { Input } from "../Input/Input";
import SearchIcon from "./search.svg";
import { Button } from "../Button/Button";
import { useState } from "react";
import { useRouter } from "next/router";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input className={styles.input} placeholder="Поиск..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <Button appearance="primary" className={styles.button} onClick={goToSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
};
