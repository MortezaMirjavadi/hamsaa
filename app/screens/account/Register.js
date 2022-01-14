import React from "react";
import { createUseStyles } from "react-jss";
import { useInput } from "@App/hooks/useInput";
import { Button, TextField } from "@Components/UI";
import { useHistory } from "react-router-dom";

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
  const { values, handleInputChangeWithParam } = useInput({
    email: "",
    password: "",
  });
  function register() {
    console.log(values);
  }
  function toLoginRoute() {
    history.push("/account/login");
  }

  return (
    <div className={localStyle.root}>
      <div className={localStyle.container}>
        <h1>Register</h1>
        <div className={localStyle.fieldItem}>
          <TextField
            label="Email"
            value={values.email}
            name="email"
            type="text"
            onChange={handleInputChangeWithParam}
          />
        </div>
        <div className={localStyle.fieldItem}>
          <TextField
            label="Password"
            value={values.password}
            name="password"
            type="password"
            onChange={handleInputChangeWithParam}
          />
        </div>
        <div className={localStyle.btn}>
          <Button onClick={register} color="secondary">
            Register
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
