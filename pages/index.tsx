import { Htag, Paragraph, Button, Tag, Rating, Input } from "@/components";
import { withLayout } from "@/Layout/Layout";
import { useState } from "react";
import axios from "axios";
import { GetStaticProps } from "next";
import { MenuItem } from "@/interfaces/menu.interface";
import { Textarea } from "@/components/Textarea/Textarea";
import { API } from "@/helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState(1);
  return (
    <div style={{marginTop:'20px'}}>
      <Htag tag="h1">Text</Htag>
      <Button appearance="primary" arrow="right">
        Button
      </Button>
      <Button appearance="ghost" arrow="down">
        Button
      </Button>
      <Paragraph size="l">{"Большой"}</Paragraph>
      <Paragraph size={"m"}>{"Средний"}</Paragraph>
      <Paragraph size={"s"}>{"Маленький"}</Paragraph>
      <Tag size={"l"} color={"grey"}>
        Кнопка
      </Tag>
      <Tag size={"s"} color={"ghost"}>
        Кнопка
      </Tag>
      <Tag size={"s"} color={"green"}>
        Кнопка
      </Tag>
      <Tag size={"l"} color={"red"}>
        Кнопка
      </Tag>
      <Tag size={"s"} color={"primary"}>
        Кнопка
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <Input placeholder="Test"/>
      <Textarea placeholder="Test textarea"/>
    </div>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    API.topPage.find,{firstCategory}
  );
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
