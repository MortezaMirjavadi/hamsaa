import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    display: "inline-block",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#DDDBDD",
    "&:after": {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transform: "translateX(-100%)",
      backgroundImage:
        "linear-gradient(90deg, rgba(#fff, 0) 0, rgba(#fff, 0.2) 20%, rgba(#fff, 0.5) 60%, rgba(#fff, 0))",
      animation: "shimmer 2s infinite",
      content: "",
    },
  },
});

const Skeleton = () => {
  const localStyle = useStyles();

  return <div className={localStyle.root} />;
};

export default Skeleton;
