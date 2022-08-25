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

const AcademicSubjectTableCollepse = ({
  item,
  updateCollegeHandler,
  deleteCollegeHandler,
}) => {
  const classes = useStyles();

  return (
    <TableRow key={item.$id}>
      <TableCell>{item.SubjectName}</TableCell>
      <TableCell>{item.SubjectCode}</TableCell>
      <TableCell>{item.IsCompulsory ? "True" : "False"}</TableCell>
      <TableCell>{item.IsOptional ? "True" : "False"}</TableCell>
      <TableCell>{item.IsPractical ? "True" : "False"}</TableCell>
      <TableCell>{item.IsTheoritical ? "True" : "False"}</TableCell>
      <TableCell>{item.IsShowInLedger ? "True" : "False"}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => updateCollegeHandler(item.IDAcademicSubject)}
        >
          <EditIcon style={{ fontSize: 12 }} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => deleteCollegeHandler(item.IDAcademicSubject)}
        >
          <DeleteIcon style={{ fontSize: 12 }} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AcademicSubjectTableCollepse;
