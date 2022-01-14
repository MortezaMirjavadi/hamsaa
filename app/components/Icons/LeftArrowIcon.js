import React from "react";
import PropTypes from "prop-types";
import SVG from "../../components/UI/SVGIcon";

const LeftArrowIcon = (props) => {
  return (
    <SVG
      width={props.width}
      height={props.height}
      viewBox="24,24"
      className={props.className}
      color={props.color}
      fill="none"
    >
      <path
        d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
        fill={props.color}
      />
    </SVG>
  );
};

export default React.memo(LeftArrowIcon);

LeftArrowIcon.defaultProps = {
  className: "",
  color: "white",
  width: 24,
  height: 24,
};

LeftArrowIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
