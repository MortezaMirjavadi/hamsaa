import React from "react";
import { Route, Redirect } from "react-router-dom";
import storageHelper from "@Utils/storageHelper";

function RedirectWithStatus({ from, to, status }) {
  return (
      <Route
          render={({ staticContext }) => {
            if (staticContext) {
              staticContext.status = status;
            }
            return <Redirect from={from} to={to} />;
          }}
      />
  );
}
function AuthenticatedRouteInLogin(props) {
  if (storageHelper.getAccessToken() !== null) {
    return <RedirectWithStatus status={200} to={"/shop?page=1"} />;
  }
  return <Route {...props} />;
}
function AuthenticatedRoute(props) {
  if (storageHelper.getAccessToken() !== null) {
    return <Route {...props} />;
  }
  return <RedirectWithStatus status={302} to={"/account/login"} />;
}

export {
  RedirectWithStatus,
  AuthenticatedRoute,
  AuthenticatedRouteInLogin,
};
