import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import routerConfig from "./config";
import AllComponents from "../views/index";
const CRouter = () => {
  const createMenu = (r) => {
    const Component = r.component && AllComponents[r.component];
    return (
      <Route
        exact
        key={r.key}
        path={r.key}
        render={(props) => {
          return <Component {...props} />;
        }}
      ></Route>
    );
  };
  const createRoute = (key) => routerConfig[key].map(createMenu);
  return (
    <Switch>
      {Object.keys(routerConfig).map((key) => createRoute(key))}
      <Redirect from="/personalcenter" to="/personalcenter/myinfo" />
      <Redirect from="/famanagementcenter" to="/famanagementcenter/overview" />
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  );
};

export default CRouter;
