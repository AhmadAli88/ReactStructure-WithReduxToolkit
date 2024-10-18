import React from "react";

const NoPage = React.lazy(() => import("./NoPageFound"));
const SignIn = React.lazy(() => import("./SignIn"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const LandingPage = React.lazy(() => import("./LandingPage"));

const WEB_PAGES = {
  NOPAGE: NoPage,
  SIGN_IN: SignIn,
  DASHBOARD: Dashboard,
  LANDING_PAGE: LandingPage,
};

export { WEB_PAGES };
