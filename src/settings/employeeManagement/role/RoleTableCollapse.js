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

const RoleTableCollapse = ({
  item,
  updateCollegeHandler,
  deleteCollegeHandler,
}) => {
  const classes = useStyles();

  return (
    <>
      <TableRow>
        <TableCell>{item.RoleName}</TableCell>
        <TableCell>{item.Description}</TableCell>
        {/* <TableCell>{item.Created_On?.slice(0,10)}</TableCell>
        <TableCell>{item.Updated_On?.slice(0,10)}</TableCell> */}
        <TableCell>
          {item.IsSystemDefined ? "Defined" : "Not Defined"}
        </TableCell>
        <TableCell>{item.MarkAsAdmin ? "Admin" : "Not Admin"}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateCollegeHandler(item.IDHRRole)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => deleteCollegeHandler(item.IDHRRole)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button> */}
        </TableCell>
      </TableRow>
    </>
  );
};

export default RoleTableCollapse;
