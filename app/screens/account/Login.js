import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import { Button, TextField } from "@Components/UI";
import { useInput } from "@App/hooks/useInput";
import { useHistory } from "react-router-dom";
import useFetchData from "@App/hooks/useFetchData";
import { HTTP_METHOD_TYPE } from "@Config/constants";
import { GlobalContext } from "@Store/globalContext";
import Spinner from "@Components/UI/Spinner";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f8f8",
  },
  container: {
    border: "1px solid transparent",
    background: "white",
    width: "100%",
    maxWidth: "420px",
    margin: 0,
    height: "450px",
    borderRadius: "2px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: "30px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    "@media (max-width: 480px)": {
      maxWidth: "100%",
      height: "100%",
    },
  },
  fieldItem: {
    width: "60%",
  },
  btn: {
    width: "40%",
    height: "40px",
  },
  register: {
    cursor: "pointer",
    border: "1px solid black",
    padding: 10,
    "&:hover": {
      color: "red",
    },
  },
});

const Login = () => {
  const localStyle = useStyles();
  const history = useHistory();
  const {
    loginSuccess,
    loading,
    startLoading,
    stopLoading,
    showSnackbar,
  } = useContext(GlobalContext);
  const { values, handleInputChangeWithParam } = useInput({
    email: "",
    password: "",
  });

  const { request } = useFetchData({
    url: "account/login",
    method: HTTP_METHOD_TYPE.POST,
    params: values,
    fireOnLoad: false,
    disableToken: true,
    middleware: () => {
      startLoading();
    },
    successCallback: (data) => {
      loginSuccess({data, email: values.email});
      history.push("/shop?page=1");
    },
    failedCallback: (data) => {
      stopLoading();
      let message = "";
      Object.keys(data).forEach((item) => {
        message += `${data[item]}\n`;
      });
      showSnackbar({ message });
    },
  });

  function login() {
    console.log(values);
    // if (values.password === "") {
    //   console.log("password is required!");
    // }
    request();
  }

  function toRegisterRoute() {
    history.push("/account/register");
  }

  function validation(text) {
    if (text === "") {
      return "required!";
    } else if (text.length > 30) {
      return "text length > 30!";
    }
    return true;
  }
  function validationPassword(text) {
    if (text === "") {
      return "required!";
    } else if (text.length < 8) {
      return "The password must be at least 8 character!";
    }
    return true;
  }

  return (
    <div className={localStyle.root}>
      <div className={localStyle.container}>
        <h1>Login</h1>
        <div className={localStyle.fieldItem}>
          <TextField
            label="Email"
            value={values.email}
            name="email"
            type="email"
            onChange={handleInputChangeWithParam}
            validation={validation}
          />
        </div>
        <div className={localStyle.fieldItem}>
          <TextField
            label="Password"
            value={values.password}
            name="password"
            type="password"
            onChange={handleInputChangeWithParam}
            validation={validationPassword}
          />
        </div>
        <div className={localStyle.btn}>
          <Button onClick={login} color="primary" disabled={loading}>
            {loading ? <Spinner /> : "Login"}
          </Button>
        </div>
        <div className={localStyle.register} onClick={toRegisterRoute}>
          Register
        </div>
      </div>
    </div>
  );
};

export default Login;
