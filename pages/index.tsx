import { Htag, Paragraph,Button,Tag,Rating } from "@/components";
import { withLayout } from "@/Layout/Layout";
import { useState } from "react";

function Home(): JSX.Element {

  const[rating,setRating]=useState(1);
  return (
    <>
      <Htag tag='h1'>Text</Htag>
      <Button appearance="primary"arrow="right">Button</Button>
      <Button appearance="ghost" arrow="down">Button</Button>
      <Paragraph size='l'>{'Большой'}</Paragraph>
      <Paragraph size={'m'}>{'Средний'}</Paragraph>
      <Paragraph size={'s'}>{'Маленький'}</Paragraph>
      <Tag size={'l'} color={'grey'}>Кнопка</Tag>
      <Tag size={'s'} color={'ghost'}>Кнопка</Tag>
      <Tag size={'s'} color={'green'}>Кнопка</Tag>
      <Tag size={'l'} color={'red'}>Кнопка</Tag>
      <Tag size={'s'} color={'primary'}>Кнопка</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
    </>
  );
};


export default withLayout(Home);
