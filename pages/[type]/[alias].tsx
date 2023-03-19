import { withLayout } from "@/Layout/Layout";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { ParsedUrlQuery } from "querystring";
import { firstLevelMenu } from "@/helpers/helpers";
import { Htag } from "@/components";
import Head from "next/head";


function Course({ products,title }: CourseProps): JSX.Element {

  return(
    <>
    <Head><title>{title}</title></Head>
    <Htag tag={'h1'}>{title}</Htag>
    <ul>
     {products && products.map(p=><li key={p._id}>{p.title}</li>)} 
     </ul>
    </>
  );
}

export default withLayout(Course);

export const getStaticPaths:GetStaticPaths=async()=>{
  let paths:string[]=[];
  for(const m of firstLevelMenu){
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",{firstCategory:m.id}
    );
    paths=paths.concat(menu.flatMap(s=>s.pages.map(p=>`/${m.route}/${p.alias}`)));
  }
 
  return{
    paths,
    fallback:true
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({params}:GetStaticPropsContext<ParsedUrlQuery>) => {
  
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

  try{
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",{firstCategory:firstLevelMenuItem.id}
    );
  if(menu.length==0){
    return{
      notFound:true
    };
  }
    const { data: page } = await axios.get<TopPageModel>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/"+params.alias
    );
  
    const { data: products } = await axios.post<ProductModel[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",{
        category:page.category,
        limit:10
    }
    );
  
    return {
      props: {
        menu,
        firstCategory:firstLevelMenuItem.id,
        page,
        products,
        title:page.title
      },
    };
  } catch{
    return{
      notFound:true
    }; 
  }
  
};

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page:TopPageModel;
  products:ProductModel[];
  title:string;
}
