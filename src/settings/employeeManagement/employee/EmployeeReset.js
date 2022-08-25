import React from "react";
import { Button, makeStyles, Grid, List, ListItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { resetSingleEmployeePasswordAction } from "./EmployeeActions";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const EmployeeReset = ({ employeeDetails, setOpenResetPopup }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return employeeDetails ? (
    <>
      <Grid container>
        <Grid item md={6}>
          <List>
            <ListItem>
              <strong>First Name</strong>: {employeeDetails.FirstName}
            </ListItem>
            <ListItem>
              <strong>Email</strong>: {employeeDetails.EmailID}
            </ListItem>
            <ListItem>
              <strong>Alternate EmailID</strong>:{" "}
              {employeeDetails.AlternateEmailID}
            </ListItem>
            <ListItem>
              <strong>Mobile Number</strong>: {employeeDetails.MobileNumber}
            </ListItem>
            <ListItem>
              <strong>Login ID</strong>: {employeeDetails.LoginIDHREmployee}
            </ListItem>
            <ListItem>
              <strong>Sex</strong>: {employeeDetails.Sex}
            </ListItem>
          </List>
        </Grid>
        <Grid item md={6} style={{}}>
          <List>
            <ListItem>
              <strong>Last Name</strong>: {employeeDetails.LastName}
            </ListItem>
            <ListItem>
              <strong>Married</strong>: {employeeDetails.Married}
            </ListItem>
            <ListItem>
              <strong>DOB</strong>: {employeeDetails.DOB.slice(0, 10)}
            </ListItem>
            <ListItem>
              <strong>BloodGroup</strong>: {employeeDetails.BloodGroup}
            </ListItem>

            <ListItem>
              <strong>Status</strong>:{" "}
              {employeeDetails.Status ? "Active" : "InActive"}
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => setOpenResetPopup(false)}
      >
        CANCEL
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() =>
          dispatch(resetSingleEmployeePasswordAction(employeeDetails))
        }
      >
        RESET PASSOWRD
      </Button>
    </>
  ) : (
    <div></div>
  );
};

export default EmployeeReset;
