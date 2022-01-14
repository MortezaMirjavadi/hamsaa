import React from "react";
import { createUseStyles } from "react-jss";
import createClass from "classnames";
import PropTypes from "prop-types";

const allowedTypes = ["text", "email", "password"];

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    height: "30px",
  },
});

const TextField = React.forwardRef(
  ({ name, label, type, value = "", onChange, validation, ...props }, ref) => {
    const localStyle = useStyles();
    const [error, setError] = React.useState("");

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    function validationWrapper(e) {
      const _temp = e.target.value;
      onChange(name, _temp);
      if (type === "email") {
        if (!validateEmail(_temp)) {
          setError("email is not correct!");
          return;
        }
      }
      const _result = validation(_temp);
      if (_result) {
        setError(_result);
        return;
      }
      setError("");
    }

    return (
      <div className={localStyle.root}>
        <label htmlFor="" className={localStyle.fullWidth}>
          {label}
        </label>
        <input
          className={createClass(localStyle.fullWidth, localStyle.text)}
          data-testid={`input-${name}`}
          value={value}
          name={name}
          onChange={validationWrapper}
          type={type}
          {...props}
          ref={ref}
        />
        <div className={createClass(localStyle.error, localStyle.fullWidth)}>
          {error}
        </div>
      </div>
    );
  }
);

TextField.propTypes = {
  type: PropTypes.oneOf(allowedTypes),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  validation: PropTypes.func,
};

TextField.displayName = "TextField";

export default TextField;
