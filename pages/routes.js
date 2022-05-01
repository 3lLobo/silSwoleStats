// import
// import Dashboard from "./dashboard";
// import Tables from "./tables";
// import Billing from "./billing";
// import Profile from "./profile";
// import AuthPage from "./auth";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "../components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    // component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    // rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    // component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    // rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    // component: Billing,
    layout: "/admin",
  },
  // {
  //   path: "/// rtl-support-page",
  //   name: "// rtl",
  //   // rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   // component: // rtlPage,
  //   layout: "/// rtl",
  // },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        // component: Profile,
        layout: "/admin",
      },
      {
        path: "/logout",
        name: "Logout",
        icon: <DocumentIcon color="inherit" />,
        // component: AuthPage,
        layout: "/auth",
      },
      // {
      //   path: "/signup",
      //   name: "Sign Up",
      //   icon: <RocketIcon color="inherit" />,
      //   secondaryNavbar: true,
      //   // component: SignUp,
      //   layout: "/auth",
      // },
    ],
  },
];
export default dashRoutes;
