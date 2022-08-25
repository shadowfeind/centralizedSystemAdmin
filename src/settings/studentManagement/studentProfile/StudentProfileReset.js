import React from "react";
import { Button, makeStyles, Grid, List, ListItem } from "@material-ui/core";
import { resetSingleStudentPasswordAction } from "./StudentProfileActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const StudentProfileReset = ({ studentDetails, setOpenResetPopup }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return studentDetails ? (
    <>
      <Grid container>
        <Grid item md={6}>
          <List>
            <ListItem>
              <strong>First Name</strong>: {studentDetails.FirstName}
            </ListItem>
            <ListItem>
              <strong>Email</strong>: {studentDetails.EmailID}
            </ListItem>
            <ListItem>
              <strong>Alternate EmailID</strong>:{" "}
              {studentDetails.AlternateEmailID}
            </ListItem>
            <ListItem>
              <strong>Mobile Number</strong>: {studentDetails.MobileNumber}
            </ListItem>
            <ListItem>
              <strong>PositionHead</strong>: {studentDetails.PositionHead}
            </ListItem>
            <ListItem>
              <strong>Sex</strong>: {studentDetails.Sex}
            </ListItem>
          </List>
        </Grid>
        <Grid item md={6} style={{}}>
          <List>
            <ListItem>
              <strong>Last Name</strong>: {studentDetails.LastName}
            </ListItem>
            <ListItem>
              <strong>Married</strong>: {studentDetails.Married}
            </ListItem>
            <ListItem>
              <strong>DOB</strong>: {studentDetails.DOB.slice(0, 10)}
            </ListItem>
            <ListItem>
              <strong>BloodGroup</strong>: {studentDetails.BloodGroup}
            </ListItem>

            <ListItem>
              <strong>Status</strong>:{" "}
              {studentDetails.Status ? "Active" : "InActive"}
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
          dispatch(resetSingleStudentPasswordAction(studentDetails))
        }
      >
        RESET PASSOWRD
      </Button>
    </>
  ) : (
    <div></div>
  );
};

export default StudentProfileReset;
