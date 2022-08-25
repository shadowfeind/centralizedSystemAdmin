import React, { useState } from "react";
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

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const StudentAttendanceTableCollapse = ({ item, attendance }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  return (
    <>
      <TableRow>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{item.MobileNumber}</TableCell>
        <TableCell>{item.EmailID}</TableCell>
        <TableCell>{item.WorkingDay}</TableCell>
        <TableCell>{item.PresentDay}</TableCell>
        <TableCell>
          {(item.WorkingDay !== null && item.WorkingDay) -
            (item.PresentDay !== null && item.PresentDay)}
        </TableCell>
        <TableCell>
          {/* <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={() => updateCollegeHandler(item.IDHRCompany)}
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
          </Button> */}
          <Button
            variant="contained"
            onClick={() => setOpen(!open)}
            className={classes.button}
          >
            {" "}
            {open ? (
              <KeyboardArrowUpIcon style={{ fontSize: 12 }} />
            ) : (
              <KeyboardArrowDownIcon style={{ fontSize: 12 }} />
            )}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow key={item.$id * 0.001}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="p" gutterBottom component="div">
                Details
              </Typography>
              <Grid container>
                <Grid item md={6}>
                  <List key={item.$id * 0.002}>
                    <ListItem>
                      <strong>Roll No</strong>: {item.RollNo}
                    </ListItem>
                    <ListItem>
                      <strong>Full Name</strong>: {item.FullName}
                    </ListItem>
                    <ListItem>
                      <strong>Mobile Number</strong>: {item.MobileNumber}
                    </ListItem>
                    <ListItem>
                      <strong>EmailID</strong>: {item.EmailID}
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={6} style={{}}>
                  <List key={item.$id * 0.003}>
                    {/* <ListItem>
                      <strong>Phone No.</strong>: {item.PhoneNo}
                    </ListItem>
                    <ListItem>
                      <strong>Alternative Phone No.</strong>:{" "}
                      {item.AlternatePhoneNo}
                    </ListItem>
                    <ListItem>
                      <strong>EmailID</strong>: {item.EmailID}
                    </ListItem>

                    <ListItem>
                      <strong>WebSite</strong>: {item.WebSite}
                    </ListItem>

                    <ListItem>
                      <strong>POBox</strong>: {item.POBox}
                    </ListItem>
                    <ListItem
                      style={{ alignItems: "start", maxWidth: "600px" }}
                    >
                      <strong>Mission</strong>: {item.Mission}
                    </ListItem> */}
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default StudentAttendanceTableCollapse;
