import React from "react";
import { makeStyles, Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    margin: "10px",
    padding: "30px 30px 10px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #d4d4d4",
  },
}));

const DashboardNoticeBoard = () => {
  const classes = useStyles();
  return (
    <></>
    // <Card className={classes.cardStyle}>{/* <h1>Notice Board</h1> */}</Card>
  );
};

export default DashboardNoticeBoard;
