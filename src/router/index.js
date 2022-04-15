import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 路由懒加载
const Home = () => import("views/home/Home");
const Login = () => import("views/login/Login");
const Register = () => import("views/register/Register");
const Business = () => import("views/business/Business");

const UserLogin = () => import("views/user/childComps/UserLogin");
const UserHouseInfo = () => import("views/user/childComps/UserHouseInfo");
const UserCollect = () => import("views/user/childComps/UserCollect");
const UserProfile = () => import("views/user/childComps/UserProfile");
const UserEditPass = () => import("views/user/childComps/UserEditPass");

const StoreLogin = () => import("views/store/childComps/StoreLogin");
const StoreProfile = () => import("views/store/childComps/StoreProfile");
const StoreEditPass = () => import("views/store/childComps/StoreEditPass");
const StoreHouse = () => import("views/store/childComps/StoreHouse");
const StoreRelease = () => import("views/store/childComps/StoreRelease");
const StoreRental = () => import("views/store/childComps/StoreRental");

const AdminLogin = () => import("views/admin/childComps/AdminLogin");
const AdminUser = () => import("views/admin/childComps/AdminUser");
const AdminStore = () => import("views/admin/childComps/AdminStore");
const AdminRental = () => import("views/admin/childComps/AdminRental");
const AdminHouse = () => import("views/admin/childComps/AdminHouse");
const AdminRelease = () => import("views/admin/childComps/AdminRelease");
const AdminEditPass = () => import("views/admin/childComps/AdminEditPass");

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/business",
    component: Business,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/userLogin",
    component: UserLogin,
    children: [
      {
        path: "/",
        redirect: "/userLogin/profile",
      },
      {
        path: "/userLogin/profile",
        component: UserProfile,
      },
      {
        path: "/userLogin/userHouseInfo",
        component: UserHouseInfo,
      },
      {
        path: "/userLogin/userCollect",
        component: UserCollect,
      },
      {
        path: "/userLogin/editPass",
        component: UserEditPass,
      },
    ],
  },
  {
    path: "/storeLogin",
    component: StoreLogin,
    children: [
      {
        path: "/",
        redirect: "/storeLogin/profile",
      },
      {
        path: "/storeLogin/profile",
        component: StoreProfile,
      },
      {
        path: "/storeLogin/storeRelease",
        component: StoreRelease,
      },
      {
        path: "/storeLogin/storeRental",
        component: StoreRental,
      },
      {
        path: "/storeLogin/storeHouse",
        component: StoreHouse,
      },
      {
        path: "/storeLogin/editPass",
        component: StoreEditPass,
      },
    ],
  },
  {
    path: "/adminLogin",
    component: AdminLogin,
    children: [
      {
        path: "/",
        redirect: "/adminLogin/adminUser",
      },
      {
        path: "/adminLogin/adminUser",
        component: AdminUser,
      },
      {
        path: "/adminLogin/adminStore",
        component: AdminStore,
      },
      {
        path: "/adminLogin/adminRelease",
        component: AdminRelease,
      },
      {
        path: "/adminLogin/adminRental",
        component: AdminRental,
      },
      {
        path: "/adminLogin/adminHouse",
        component: AdminHouse,
      },
      {
        path: "/adminLogin/adminEditPass",
        component: AdminEditPass,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
