import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  loader: {
    border: "2px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "1px solid #3498db",
    width: 20,
    height: 20,
    "-webkit-animation": "spin 2s linear infinite",
    animation: "spin 2s linear infinite",
  },
});

const Spinner = (props) => {
  const localStyle = useStyles();
  return <div className={localStyle.loader}/>;
};

export default Spinner;
