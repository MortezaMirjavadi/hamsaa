import React from "react";
import PropTypes from "prop-types";

const SVGIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.viewBox}`}
      className={props.className}
      fill={props.fill}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      data-testid={props["data-testid"]}
    >
      {props.children}
    </svg>
  );
};

export default SVGIcon;

SVGIcon.defaultProps = {
  width: 20,
  height: 20,
  viewBox: "24 24",
};

SVGIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  fill: PropTypes.string,
  onClick: PropTypes.func,
};
