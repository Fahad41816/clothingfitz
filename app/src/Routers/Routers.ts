import Express from "express";
import { authRouter } from "../modules/auth/auth.route";
import { userRouter } from "../modules/users/user.route";
import { ProductRoutes } from "../modules/Products/product.route";
import { PromoRoutes } from "../modules/PromoCode/promoCode.route";

const routers = Express.Router();

const allRouters = [
  {
    id: 1,
    path: "/auth",
    element: authRouter,
  },
  {
    id: 2,
    path: "/user",
    element: userRouter,
  },
  {
    id: 3,
    path: "/product",
    element: ProductRoutes,
  },
  {
    id: 3,
    path: "/PromoCode",
    element: PromoRoutes,
  },
];

allRouters.map((route: any) => {
  routers.use(route.path, route.element);
});

export default routers;
