import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: 2,
    },
  },
});

export default function CircularIndeterminate() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="loading-three-dots">
        {[1,2,3,4].map(item => <div key={item}/>)}
      </div>
    </div>
  );
}

