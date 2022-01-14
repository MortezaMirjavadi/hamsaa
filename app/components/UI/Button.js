import React from "react";
import { createUseStyles } from "react-jss";
import theme from "@Config/theme";
import PropTypes from "prop-types";
import createClass from "classnames";

const allowedColors = ["primary", "secondary"];

const useStyles = createUseStyles({
  container: {
    height: "100%",
    width: "100%",
    borderRadius: "4px",
    color: "white",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: (props) => ({
    cursor: "pointer",
    backgroundColor: props.theme.palette[props.color].light,
    "&:hover": {
      opacity: 0.8,
    },
  }),
  disable: {
    cursor: "not-allowed",
    backgroundColor: "gray",
  },
});

function Button({ children, color, ...props }) {
  const localStyle = useStyles({ theme, color });
  return (
    <button
      data-testid="submit-btn"
      className={createClass(localStyle.container, {
        [localStyle.btn]: !props.disabled,
        [localStyle.disable]: props.disabled,
      })}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(allowedColors),
};

Button.displayName = "Button";

export default Button;
