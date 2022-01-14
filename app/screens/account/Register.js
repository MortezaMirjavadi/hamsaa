import React, { useContext, useRef } from "react";
import { createUseStyles } from "react-jss";
import { useInput } from "@App/hooks/useInput";
import { Button, TextField } from "@Components/UI";
import { useHistory } from "react-router-dom";
import useFetchData from "@App/hooks/useFetchData";
import { HTTP_METHOD_TYPE, MESSAGE_TYPE } from "@Config/constants";
import { GlobalContext } from "@Store/globalContext";
import Spinner from "@Components/UI/Spinner";
import useEventListener from "@App/hooks/useEventListener";

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
  login: {
    cursor: "pointer",
    border: "1px solid black",
    padding: 10,
    "&:hover": {
      color: "red",
    },
  },
});

const Register = () => {
  const localStyle = useStyles();
  const history = useHistory();
  const refEmail = useRef();
  const { values, setValues, handleInputChangeWithParam } = useInput({
    email: "",
    password: "",
  });
  const { loading, startLoading, stopLoading, showSnackbar } = useContext(
    GlobalContext
  );

  const { request } = useFetchData({
    url: "account/register",
    method: HTTP_METHOD_TYPE.POST,
    params: values,
    fireOnLoad: false,
    disableToken: true,
    middleware: () => {
      startLoading();
    },
    successCallback: (data) => {
      stopLoading();
      showSnackbar({
        message: data.message,
        messageType: MESSAGE_TYPE.SUCCESS,
      });
      history.push("/login");
    },
    failedCallback: (data) => {
      stopLoading();
      let message = "";
      const _data = data.response.data;
      Object.keys(_data).forEach((item) => {
        message += `${_data[item]}\n`;
      });
      showSnackbar({ message, messageType: MESSAGE_TYPE.ERROR });
      clearForm();
    },
  });
  function clearForm() {
    setValues({ email: "", password: "" });
    refEmail.current.focus();
  }
  function register() {
    request();
  }
  function toLoginRoute() {
    history.push("/account/login");
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
  const keyboardListener = (e) => {
    if (loading) {
      return;
    }
    if (e.which === 13 || e.key === "Enter") {
      request();
    }
  };

  useEventListener({
    element: typeof document !== "undefined" ? document : undefined,
    eventName: "keyup",
    listener: keyboardListener,
  });

  return (
    <div className={localStyle.root}>
      <div className={localStyle.container}>
        <h1>Register</h1>
        <div className={localStyle.fieldItem}>
          <TextField
            ref={refEmail}
            label="Email"
            value={values.email}
            name="email"
            type="text"
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
          <Button onClick={register} color="secondary" disabled={loading}>
            {loading ? <Spinner /> : "Register"}
          </Button>
        </div>
        <div className={localStyle.login} onClick={toLoginRoute}>
          Login
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {};

Register.displayName = "Register";

export default Register;
