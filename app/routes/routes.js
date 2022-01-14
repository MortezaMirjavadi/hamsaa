import { lazy } from "@loadable/component";
import { AuthenticatedRoute, AuthenticatedRouteInLogin } from "@Routes/router";

const Login = lazy(() => import("@Screens/account/Login"));
const Register = lazy(() => import("@Screens/account/Register"));
const Shop = lazy(() => import("@Screens/shop/Shop"));
const Dashboard = lazy(() => import("@Screens/dashboard/Layout"));
const Favorites = lazy(() => import("@Screens/dashboard/Favorites"));

const routes = [
  {
    AuthenticateComponent: AuthenticatedRouteInLogin,
    key: "a336d5df-fa47-48f2-ba1d-3144964199a7",
    path: "/",
    exact: true,
    component: Login,
    id: "account",
  },
  {
    AuthenticateComponent: AuthenticatedRouteInLogin,
    key: "b56f88e7-4868-4fae-9a62-f89ab5c1b2dc",
    path: "/account",
    exact: true,
    component: Login,
    id: "account",
  },
  {
    AuthenticateComponent: AuthenticatedRouteInLogin,
    key: "50f767ab-607a-4ce9-8a8c-e87cb9e5fa3b",
    path: "/account/login",
    exact: true,
    component: Login,
    id: "account",
  },
  {
    AuthenticateComponent: AuthenticatedRouteInLogin,
    key: "1d0bcdff-9660-40e9-be58-24b4bec45c6c",
    path: "/account/register",
    exact: true,
    component: Register,
    id: "account",
  },
  {
    AuthenticateComponent: AuthenticatedRoute,
    key: "0eb6543d-72e9-4e84-b3a4-11abef0146be",
    path: "/shop",
    exact: true,
    component: Shop,
    id: "shop",
  },
  {
    AuthenticateComponent: AuthenticatedRoute,
    key: "4c034336-b03a-455b-a5c0-b475a81faf0e",
    path: "/dashboard",
    exact: false,
    component: Dashboard,
    id: "dashboard",
    subRoutes: [
      {
        AuthenticateComponent: AuthenticatedRoute,
        key: "00d37554-6cc3-457c-9548-df1e033d2284",
        path: "/dashboard/favs",
        exact: false,
        component: Favorites,
        id: "favorites",
      },
    ],
  },
];

export default routes;
