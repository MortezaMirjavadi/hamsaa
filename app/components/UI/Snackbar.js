import React from "react";
import { createUseStyles } from "react-jss";
import { GlobalContext } from "@Store/globalContext";
import { useInterval } from "@App/hooks/useInterval";

const useStyles = createUseStyles({
  root: {
    width: "100vw",
    height: "100vh",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: "fixed",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
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
  container: {
    position: "fixed",
    top: "50px",
    width: "40%",
    height: "fit-content",
    padding: "10px",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "red",
  },
  timerContainer: {
    width: "100%",
    height: 4,
    borderRadius: 4,
    marginBottom: 4,
    marginRight: -16,
    display: "flex",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  timerInnerContainer: {
    background: "#bf032d",
  },
});

const Snackbar = () => {
  const localStyle = useStyles();
  const { closeSnackbar, isShowSnackbar, snackbarMessage } = React.useContext(
    GlobalContext
  );
  const [innerWidth, setInnerWidth] = React.useState(0);

  useInterval(() => {
    if (isShowSnackbar && innerWidth < 100) {
      setInnerWidth(innerWidth + 1);
    } else if (innerWidth === 100) {
      closeSnackbar();
    }
  }, 24);

  return (
    <div className={localStyle.root}>
      <div onClick={closeSnackbar} className={localStyle.backDrop} />
      <div className={localStyle.container}>
        {snackbarMessage}
        <div className={localStyle.timerContainer}>
          <div
            className={localStyle.timerInnerContainer}
            style={{ width: `${innerWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
