export const API = {
  topPage: {
    byAlias: process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/",
    find: process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
  },
  product: {
    find: process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
  },
  review: {
    createDemo: process.env.NEXT_PUBLIC_DOMAIN + "/api/review/create-demo",
  },
};
