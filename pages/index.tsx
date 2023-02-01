import { Htag, Paragraph,Button } from "@/components";

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Text</Htag>
      <Button appearance="primary"arrow="right">Button</Button>
      <Button appearance="ghost" arrow="down">Button</Button>
      <Paragraph size='l'>{'Большой'}</Paragraph>
      <Paragraph size={'m'}>{'Средний'}</Paragraph>
      <Paragraph size={'s'}>{'Маленький'}</Paragraph>
    </>
  );
}
