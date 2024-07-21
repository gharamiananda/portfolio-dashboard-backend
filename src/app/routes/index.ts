import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";
import { SalesRoutes } from "../modules/sales/sales.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { ProjectRoutes } from "../modules/project/project.route";

const router = Router();

const moduleRoutes = [
 
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/sales",
    route: SalesRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  }, {
    path: "/projects",
    route: ProjectRoutes,
  },

  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
