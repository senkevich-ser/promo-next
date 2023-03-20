import { withLayout } from "@/Layout/Layout";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MenuItem } from "@/interfaces/menu.interface";
import Head from "next/head";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { firstLevelMenu } from "@/helpers/helpers";
import { ParsedUrlQuery } from "querystring";

function Type({title}:TypeProps): JSX.Element {
 
  return (
    <>
    <Head><title>{title}</title></Head>
    <h1>Супер {title}</h1>
    </>
  );
}

export default withLayout(Type);

export const getStaticPaths:GetStaticPaths=async()=>{
  return{
    paths:firstLevelMenu.map(m=>'/'+m.route),
    fallback:true
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({params}:GetStaticPropsContext<ParsedUrlQuery>) => {
  if(!params){
    return{
      notFound:true
    };
  }
  const firstLevelMenuItem=firstLevelMenu.find(m=>m.route==params.type);
  
  if(!firstLevelMenuItem){
    return{
      notFound:true
    };
  }
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",{firstCategory:firstLevelMenuItem.id}
  );
  return {
    props: {
      menu,
      firstCategory:firstLevelMenuItem.id,
      title:firstLevelMenuItem.name
    },
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  title:string;
}
