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

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const EmployeeCategoryRoleTableCollapse = ({
  item,
  updateCollegeHandler,
  deleteCollegeHandler,
}) => {
  const classes = useStyles();
  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{item.Heading}</TableCell>
        <TableCell>{item.Description}</TableCell>
        <TableCell>{item.Created_On.slice(0, 10)}</TableCell>
        <TableCell>{item.Updated_On.slice(0, 10)}</TableCell>
        <TableCell>{item.IsActive ? "Active" : "InActive"}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateCollegeHandler(item.IDHREmployeeCategoryRole)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => deleteCollegeHandler(item.IDHREmployeeCategoryRole)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EmployeeCategoryRoleTableCollapse;
