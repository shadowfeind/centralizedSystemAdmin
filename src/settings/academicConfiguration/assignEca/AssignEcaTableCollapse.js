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

const AssignEcaTableCollapse = ({ item, level }) => {
  const classes = useStyles();
  const levelNameToShow = level?.filter((s) => s.Key === item.AcademicLevel);
  return (
    <>
      <TableRow>
        {/* <TableCell>{levelNameToShow?.length > 0 && levelNameToShow[0].Value}</TableCell> */}
        <TableCell>{item.ECAName}</TableCell>
        <TableCell>{item.ECADescription}</TableCell>
        <TableCell>{item.Created_On?.slice(0, 10)}</TableCell>
        <TableCell>{item.Updated_On?.slice(0, 10)}</TableCell>
        <TableCell>{item.IsActive ? "IsActive" : "NotActive"}</TableCell>
      </TableRow>
    </>
  );
};

export default AssignEcaTableCollapse;
