import React from "react";
import { Grid, makeStyles, Card } from "@material-ui/core";
import { School, PeopleOutline, Face, Settings } from "@material-ui/icons";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import StayCurrentPortraitIcon from "@material-ui/icons/StayCurrentPortrait";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    margin: "10px",
    padding: "20px 20px 10px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #d4d4d4",
    "& a": {
      textDecoration: "none",
      color: "#000",
    },
  },
  heading: {
    margin: "0",
    color: "#7e7f7a",
  },
  numberHeading: {
    fontSize: "50px",
    fontWeight: "bold",
    margin: "0",
  },
  smallHeading: {
    color: "#65748B",
    fontSize: "12px",
    paddingLeft: "3%",
  },
}));

const DashboardHeader = ({ dashboardTopContent }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={3}>
        <Card className={classes.cardStyle}>
          <Link to={"/employee-management"}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={9}>
                <h4 className={classes.heading}>Total No. Of Staffs</h4>
                <h1 className={classes.numberHeading}>
                  {dashboardTopContent && dashboardTopContent?.activeTeacher}
                </h1>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  backgroundColor: "#d14343",
                  padding: "12px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                <School style={{ fontSize: "30px", color: "#fff" }} />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <ArrowUpwardIcon
                  style={{ fontSize: "25px", color: "#d14343" }}
                />
              </Grid>
              <Grid item xs={11}>
                <p className={classes.smallHeading}>View More...</p>
              </Grid>
            </Grid>
          </Link>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.cardStyle}>
          <Link to={"/student-management"}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={9}>
                <h4 className={classes.heading}>Total No. Of Students</h4>
                <h1 className={classes.numberHeading}>
                  {dashboardTopContent && dashboardTopContent?.activeStudent}
                </h1>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  backgroundColor: "#647acb",
                  padding: "12px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                <PeopleOutline style={{ fontSize: "30px", color: "#fff" }} />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <ArrowUpwardIcon
                  style={{ fontSize: "25px", color: "#647acb" }}
                />
              </Grid>
              <Grid item xs={11}>
                <p className={classes.smallHeading}>View More...</p>
              </Grid>
            </Grid>
          </Link>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.cardStyle}>
          <Link to={"/academic-configuration"}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={9}>
                <h4 className={classes.heading}>Total No. Of Subjects</h4>
                <h1 className={classes.numberHeading}>
                  {dashboardTopContent && dashboardTopContent?.activeSubject}
                </h1>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  backgroundColor: "#e9b949",
                  padding: "12px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                <MenuBookIcon style={{ fontSize: "30px", color: "#fff" }} />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <ArrowUpwardIcon
                  style={{ fontSize: "25px", color: "#e9b949" }}
                />
              </Grid>
              <Grid item xs={11}>
                <p className={classes.smallHeading}>View More...</p>
              </Grid>
            </Grid>
          </Link>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.cardStyle}>
          <Link to={"/access-control"}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={9}>
                <h4 className={classes.heading}>Total No. Of Mobile Users</h4>
                <h1 className={classes.numberHeading}>
                  {dashboardTopContent &&
                    dashboardTopContent?.activeMobileUsers}
                </h1>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  backgroundColor: "#2cb1bc",
                  padding: "12px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                <StayCurrentPortraitIcon
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <ArrowUpwardIcon
                  style={{ fontSize: "25px", color: "#2cb1bc" }}
                />
              </Grid>
              <Grid item xs={11}>
                <p className={classes.smallHeading}>View More...</p>
              </Grid>
            </Grid>
          </Link>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardHeader;
