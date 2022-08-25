import React from "react";
import {
  Button,
  TableRow,
  TableCell,
  makeStyles,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";
import {
  getSingleStudentProfileDetailsAction,
  getSingleStudentProfilePasswordresetDataAction,
} from "./StudentProfileActions";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../constants";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const StudentProfileTableCollapse = ({
  item,
  updateFormHandler,
  detailImagePath,
  addHandler,
  index,
  ImagePathLst,
  selectedIndex,
  setSelectedIndex,
  year,
  program,
  section,
  classId,
  shift,
  status,
  ddlShift,
  studentDetails,
  setOpenResetPopup,
  //   deleteCollegeHandler,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const shiftNameToShow = ddlShift?.filter(
    (s) => s.Key === item.IDAcademicShift
  );
  const handleClick = (index, id) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
      dispatch(
        getSingleStudentProfileDetailsAction(
          id,
          year,
          program,
          classId,
          section,
          shift,
          status
        )
      );
    }
  };

  const currentImagePath = ImagePathLst?.filter(
    (x) => x.Key === item.IDHREmployee
  );

  const handleReset = (id) => {
    dispatch(
      getSingleStudentProfilePasswordresetDataAction(
        id,
        year,
        program,
        classId,
        section,
        shift,
        status
      )
    );
    setOpenResetPopup(true);
  };

  return (
    <>
      <TableRow>
        <TableCell>{item.rollNo}</TableCell>
        <TableCell>
          <img
            src={`${API_URL}${currentImagePath[0]?.Value}`}
            width="30px"
            height="30px"
          />
        </TableCell>
        <TableCell>{item.StudentFullName}</TableCell>
        <TableCell>{item.UniversityRegistrationNumber}</TableCell>
        <TableCell>{item.LoginIDHREmployee}</TableCell>
        <TableCell>
          {shiftNameToShow?.length > 0 && shiftNameToShow[0].Value}
        </TableCell>
        <TableCell>{item.MobileNumber}</TableCell>
        <TableCell>{item.LevelStatus}</TableCell>
        <TableCell>
          {" "}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => addHandler(item.IDHREmployee)}
          >
            <AddIcon style={{ fontSize: 12 }} />
          </Button>
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateFormHandler(item.IDHREmployee)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            //   onClick={() => deleteCollegeHandler(item.IDAcademicSubject)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClick(index, item.IDHREmployee)}
            className={classes.button}
          >
            {" "}
            {selectedIndex ? (
              <KeyboardArrowUpIcon style={{ fontSize: 12 }} />
            ) : (
              <KeyboardArrowDownIcon style={{ fontSize: 12 }} />
            )}
          </Button>
        </TableCell>
      </TableRow>
      {studentDetails && (
        <TableRow key={item.$id * 0.001}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="p" gutterBottom component="div">
                  <h3>Details:</h3>
                </Typography>
                <Grid container>
                  <Grid item md={4}>
                    <List key={item.$id * 0.002}>
                      <ListItem>
                        <strong>Login ID:</strong>:{" "}
                        {studentDetails.LoginIDHREmployee}
                      </ListItem>
                      <ListItem>
                        <strong>Email</strong>: {studentDetails.EmailID}
                      </ListItem>
                      <ListItem>
                        <strong>Alternate EmailID</strong>:{" "}
                        {studentDetails.AlternateEmailID}
                      </ListItem>
                      <ListItem>
                        <strong>Mobile Number</strong>:{" "}
                        {studentDetails.MobileNumber}
                      </ListItem>
                      <ListItem>
                        <strong>PositionHead</strong>:{" "}
                        {studentDetails.PositionHead}
                      </ListItem>
                      <ListItem>
                        <strong>Sex</strong>: {studentDetails.Sex}
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item md={4} style={{}}>
                    <List>
                      <ListItem>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          onClick={() =>
                            handleReset(studentDetails.IDHREmployee)
                          }
                        >
                          Reset Password
                        </Button>
                      </ListItem>
                      <ListItem>
                        <strong>Married</strong>: {studentDetails.Married}
                      </ListItem>
                      <ListItem>
                        <strong>DOB</strong>: {studentDetails.DOB?.slice(0, 10)}
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
                  <Grid item md={4} style={{}}>
                    <List>
                      <ListItem>
                        <img
                          src={`${API_URL}${detailImagePath}`}
                          width="150px"
                          height="150px"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default StudentProfileTableCollapse;
