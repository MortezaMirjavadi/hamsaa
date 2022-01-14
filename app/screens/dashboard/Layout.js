import React, { Suspense } from "react";
import { createUseStyles } from "react-jss";
import AppBar from "@Components/UI/AppBar";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Loading from "@Components/Loading/Loading";
import Routes from "@Routes/routes";
import storageHelper from "@Utils/storageHelper";

const useStyles = createUseStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    position: "relative",
  },
  appbar: {
    width: "100%",
    height: 60,
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  sidenav: {
    marginTop: 60,
    width: "200px",
    height: "92%",
    background: "#0674ff",
  },
  content: {
    marginTop: 60,
    width: "100%",
    height: "92%",
    background: "white",
    overflowY: "auto",
  },
  menuItem: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    color: "white",
    padding: 20,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
});

const Layout = (props) => {
  const localStyle = useStyles();
  const history = useHistory();

  const getRoutes = (routes) => {
    return (
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes.map((route) => {
            const { AuthenticateComponent, ...routeProps } = route;
            const RouteComp = AuthenticateComponent || Route;
            return <RouteComp {...routeProps} />;
          })}
          <Redirect to="/dashboard/favs" />
        </Switch>
      </Suspense>
    );
  };
  function exit() {
    storageHelper.clearLocalStorage();
    history.push("/login");
  }
  function back() {
    history.goBack();
  }

  return (
    <div className={localStyle.root}>
      {/*<div className={localStyle.appbar}>*/}
      {/*  <AppBar />*/}
      {/*</div>*/}
      <AppBar />
      <div className={localStyle.container}>
        <div className={localStyle.sidenav}>
          <div className={localStyle.menuItem} onClick={back}>
            Return
          </div>
          <div className={localStyle.menuItem}>Favorite</div>
          <div className={localStyle.menuItem} onClick={exit}>
            Exit
          </div>
        </div>
        <div className={localStyle.content}>
          {getRoutes(
            Routes.find((x) => x.path.includes("/dashboard"))?.subRoutes
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
