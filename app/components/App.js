import React, {Suspense, useEffect} from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import routes from "@Routes/index";
import PropTypes from "prop-types";
import Loading from "./Loading/Loading";
import Snackbar from "@Components/UI/Snackbar";
import {DispatchContext, GlobalContext} from "@Store/globalContext";
import {ACTION_SHOW_SNACKBAR} from "@Store/actionTypes";

function App() {
  const x = document.getElementById("splash");
  if (x) {
    document.body.removeChild(x);
  }
  const { isShowSnackbar } = React.useContext(GlobalContext);
  // const dispatch = React.useContext(DispatchContext);

  // useEffect(() => {
  //   dispatch({type: ACTION_SHOW_SNACKBAR, message: "this is a test"});
  // }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {isShowSnackbar && <Snackbar/>}
        <Switch>
          {routes.map((route) => {
            const { AuthenticateComponent, ...routeProps } = route;
            const RouteComp = AuthenticateComponent || Route;
            return <RouteComp {...routeProps} />;
          })}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </>
  );
}

App.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func,
  lastGetTime: PropTypes.string,
  defaultLastGetTime: PropTypes.string,
  transaction_initialized: PropTypes.bool,
  profile: PropTypes.object,
  message: PropTypes.string,
};

App.defaultProps = {
  message: "",
  className: null,
  dispatch: null,
};

export default hot(withRouter(App));
