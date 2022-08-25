import React, { useState, useSelector } from "react";
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

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const HrValueTableCollapse = ({ item,updateHrValueHandler }) => {
  const classes = useStyles();

  return (
    <>
      <TableRow>
        <TableCell>{item.SchoolName}</TableCell>
        <TableCell>{item.FullAddress}</TableCell>
        <TableCell>{item.TelNo}</TableCell>
        <TableCell>{item.Email}</TableCell>
        <TableCell>{item.IDHRCompany}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateHrValueHandler(item.IDHRCompanyValue,item.IDHRCompany)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          //   onClick={() => deleteCollegeHandler(item.Id)}
        >
          <DeleteIcon style={{ fontSize: 12 }} />
        </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default HrValueTableCollapse;
