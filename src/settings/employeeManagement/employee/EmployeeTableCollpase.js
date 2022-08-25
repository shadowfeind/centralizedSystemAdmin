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
import { useDispatch } from "react-redux";
import { getSingleEmployeeAction } from "./EmployeeActions";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const EmployeeTableCollapse = ({
  item,
  category,
  updateCollegeHandler,
  deleteCollegeHandler,
  index,
  selectedIndex,
  setSelectedIndex,
  setOpenResetPopup,
}) => {
  const dispatch = useDispatch();
  const handleClick = (index, id) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  const classes = useStyles();
const categoryName = category?.filter(s => s.Key === item.IDHREmployeeCategoryRole)
  const handleReset = (id) => {
    dispatch(getSingleEmployeeAction(id));
    setOpenResetPopup(true);
  };

  return (
    <>
      <TableRow>
      <TableCell>{item.LoginIDHREmployee}</TableCell>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{categoryName?.length>0 && categoryName[0].Value}</TableCell>
        <TableCell>{item.EmailID}</TableCell>
        <TableCell>{item.MobileNumber}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateCollegeHandler(item.IDHREmployee)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => deleteCollegeHandler(item.IDHREmployee)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClick(index)}
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
      <TableRow key={item.$id * 0.001}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="p" gutterBottom component="div">
                Details
              </Typography>
              <Grid container>
                <Grid item md={6}>
                  <List key={item.$id * 0.002}>
                    <ListItem>
                      <strong>LoginID</strong>: {item.LoginIDHREmployee}
                    </ListItem>
                    <ListItem>
                      <strong>Branch Name</strong>: {item.BranchName}
                    </ListItem>
                    <ListItem>
                      <strong>Department Name</strong>: {item.DepartmentName}
                    </ListItem>
                    <ListItem>
                      <strong>Position Head</strong>: {item.PositionHead}
                    </ListItem>
                    <ListItem>
                      <strong>EmployeeType Name</strong>: {item.EmployeeTypeName}
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={6} style={{}}>
                  <List>
                    <ListItem>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => handleReset(item.IDHREmployee)}
                      >
                        Reset Password
                      </Button>
                    </ListItem>
                    <ListItem>
                      <strong>Email ID</strong>: {item.EmailID}
                    </ListItem>
                    <ListItem>
                      <strong>Phone No.</strong>: {item.PhoneNo}
                    </ListItem>
                    <ListItem>
                      <strong>Mobile Number</strong>: {item.MobileNumber}
                    </ListItem>

                    <ListItem>
                      <strong>IsActive</strong>:{" "}
                      {item.IsActive ? "Active" : "InActive"}
                    </ListItem>

                    <ListItem>
                      <strong>Updated_On</strong>: {item.Updated_On?.slice(0,10)}
                    </ListItem>
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

export default EmployeeTableCollapse;
