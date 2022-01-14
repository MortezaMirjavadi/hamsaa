import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import createClass from "classnames";
import storageHelper from "@Utils/storageHelper";

const useStyles = createUseStyles({
  root: {
    width: "100%",
    height: "60px",
    backgroundColor: "rgb(18 79 255 / 90%)",
    boxShadow: "0 11px 21px rgb(0 0 0 / 3%)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "fixed",
    top: 0,
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #eaeaea",
    transition: "background .4s,color .4s,box-shadow .4s",
    zIndex: 1,
  },
  backDrop: {
    width: "100vw",
    height: "100vh",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
    position: "fixed",
    touchAction: "none",
    backgroundColor: "transparent",
    willChange: "opacity",
    transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    webkitFilter: "grayscale(50%)",
    filter: "grayscale(50%)",
    display: "flex",
    justifyContent: "center",
  },
  profileContainer: {
    cursor: "pointer",
    width: 150,
    height: 40,
    background: "#3082ff",
    marginLeft: 30,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    color: "white",
  },
  profile: {
    background: "#3082ff",
    width: 150,
    height: "fit-content",
    borderRadius: 20,
    position: "absolute",
    top: 55,
    left: 30,
  },
  profileItem: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    color: "white",
    padding: 10,
  },
  profileItemFirstHover: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  },
  profileItemLastHover: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  },
});

const AppBar = () => {
  const localStyle = useStyles();
  const [showMenu, setShowMenu] = useState(false);

  function handleToggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className={localStyle.root}>
      {showMenu && (
        <div onClick={handleToggleMenu} className={localStyle.backDrop} />
      )}
      <div onClick={handleToggleMenu} className={localStyle.profileContainer}>
        {storageHelper.getUserInfo()}
      </div>
      {showMenu && (
        <div className={localStyle.profile}>
          <div
            className={createClass(
              localStyle.profileItem,
              localStyle.profileItemFirstHover
            )}
          >
            Dashboard
          </div>
          <div
            className={createClass(
              localStyle.profileItem,
              localStyle.profileItemLastHover
            )}
          >
            Exit
          </div>
        </div>
      )}
    </div>
  );
};

export default AppBar;
