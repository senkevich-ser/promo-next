import { withLayout } from "@/Layout/Layout";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { ParsedUrlQuery } from "querystring";
import { firstLevelMenu } from "@/helpers/helpers";


function Course({ menu,page,products }: CourseProps): JSX.Element {


  return(
    <>
     {products && products.map(p=><span key={p._id}>{p.title}</span>)} 
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
  }
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
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",{firstCategory:firstLevelMenuItem.id}
  );

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
      products
    },
  };
};

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page:TopPageModel;
  products:ProductModel[];
}
