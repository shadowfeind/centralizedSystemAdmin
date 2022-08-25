import React, { useEffect } from "react";
import CustomContainer from "../components/CustomContainer";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  helpTopContainer: {
    padding: "10px 0",
    "& a": {
      textDecoration: "none",
    },
  },
  helpBotContainer: {
    padding: "0 10px",
  },
}));

const Help = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/help" });
  }, []);
  return (
    <CustomContainer>
      <div className={classes.helpTopContainer}>
        <Grid container>
          <Grid item xs={3}>
            {" "}
            <a
              href="https://www.microsoft.com/en-ww/microsoft-teams/download-app"
              target="__blank"
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px" }}
              >
                DOWNLOAD MICROSOFT TEAMS
              </Button>
            </a>
          </Grid>
          <Grid item xs={3}>
            {" "}
            <a href="https://anydesk.com/en/downloads/windows" target="__blank">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px" }}
              >
                DOWNLOAD ANYDESK
              </Button>
            </a>
          </Grid>
          <Grid item xs={3}>
            {" "}
            <a
              href="https://play.google.com/store/apps/details?id=io.ionic.studentmis"
              target="__blank"
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px" }}
              >
                DOWNLOAD ANDROID APP
              </Button>
            </a>
          </Grid>
          {/* <Grid item xs={3}>
            {" "}
            <a
              href="https://play.google.com/store/apps/details?id=divine.school.mobileapp"
              target="__blank"
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px" }}
              >
                DOWNLOAD ANDROID APP
              </Button>
            </a>
          </Grid> */}
        </Grid>
      </div>
      <div className={classes.helpBotContainer}>
        <h3>Contact Informations</h3>
        <p>Address: Jawagal, Lalitpur</p>
        <p>Phone: 9823246127</p>
        <p>Email: blueberryexperts@gmail.com</p>
      </div>
    </CustomContainer>
  );
};

export default Help;
