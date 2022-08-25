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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";
import { useDispatch } from "react-redux";
import { getSingleStudentRegistrationDataAction } from "./StudentRegistrationActions";
import { API_URL } from "../../constants";
import { GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_RESET } from "./StudentRegistrationConstants";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const StudentRegistrationTableCollapse = ({
  item,
  index,
  // updateStudentRegistrationHandler,
  selectedIndex,
  setSelectedIndex,
  year,
  program,
  classId,
  singleStudent,
  setOpenPopup,
  studentImage,
  //   deleteCollegeHandler,
}) => {
  const dispatch = useDispatch();
  const handleClick = (index, id) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
      dispatch(
        getSingleStudentRegistrationDataAction(id, year, program, classId)
      );
    }
  };

  const updateStudentRegistrationHandler = (id) => {
    dispatch(
      getSingleStudentRegistrationDataAction(id, year, program, classId)
    );
    dispatch({ type: GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_RESET });
    setOpenPopup(true);
  };

  const classes = useStyles();

  return (
    <>
      <TableRow key={item.$id * 0.0012}>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.RegistrationKey}</TableCell>
        <TableCell>
          {item?.FirstName} {item?.MiddleName} {item?.LastName}
        </TableCell>
        <TableCell>{item.MobileNo}</TableCell>
        <TableCell>{item.EmailAddress}</TableCell>
        <TableCell>{item.Status}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() =>
              updateStudentRegistrationHandler(
                item.IDAdmissionRegistration,
                year,
                program,
                classId
              )
            }
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            // onClick={() => deleteCollegeHandler(item.IDHRCompany)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClick(index, item.IDAdmissionRegistration)}
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
      {singleStudent && (
        <TableRow key={item.$id * 0.001}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Grid container>
                  <Grid item md={6}>
                    <h6></h6>
                    <Typography variant="p" gutterBottom component="div">
                      Personal Details
                    </Typography>
                    <List>
                      <ListItem>
                        <strong>FullName</strong>: {singleStudent.FirstName}
                        {singleStudent.LastName}
                      </ListItem>
                      <ListItem>
                        <strong>Registration Key</strong>:{" "}
                        {singleStudent.RegistrationKey}
                      </ListItem>
                      <ListItem>
                        <strong>Roll No.</strong>: {singleStudent.RollNo}
                      </ListItem>
                      <ListItem>
                        <strong>Mobile No.</strong>: {singleStudent.MobileNo}
                      </ListItem>
                      <ListItem>
                        <strong>Email Address</strong>:{" "}
                        {singleStudent.EmailAddress}
                      </ListItem>
                      <ListItem>
                        <strong>Status</strong>: {singleStudent.Status}
                      </ListItem>
                      <ListItem>
                        <strong>D.O.B</strong>: {singleStudent.DOBNp}
                      </ListItem>
                      <ListItem>
                        <strong>Section</strong>: {singleStudent.Section}
                      </ListItem>
                      <ListItem>
                        <img
                          src={`${API_URL}${studentImage}`}
                          height={200}
                          width={200}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item md={6} style={{}}>
                    <Typography variant="p" gutterBottom component="div">
                      Gurdian Details
                    </Typography>
                    <List>
                      <ListItem>
                        <strong>Father Name</strong>: {singleStudent.FatherName}
                      </ListItem>
                      <ListItem>
                        <strong>Father Contact No.</strong>:{" "}
                        {singleStudent.FatherContactNo}
                      </ListItem>
                      <ListItem>
                        <strong>Mother Name</strong>: {singleStudent.MotherName}
                      </ListItem>

                      <ListItem>
                        <strong>Mother Contact No</strong>:{" "}
                        {singleStudent.MotherContactNo}
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

export default StudentRegistrationTableCollapse;
