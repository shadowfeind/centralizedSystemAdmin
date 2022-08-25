import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

const GeneratePublishResultTableCollapse = ({ item }) => {
  return (
    <>
      <TableRow>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.StudentName}</TableCell>
        <TableCell>{item.TotalMark}</TableCell>
        <TableCell>{item.TotalPassMark}</TableCell>
        <TableCell>{item.TotalObtainedMark}</TableCell>
        <TableCell>{item.TotalAvgObtainedMark}</TableCell>
        <TableCell>{item.SecuredDivision}</TableCell>
        <TableCell>{item.DivisionComment}</TableCell>
        <TableCell>{item.Status}</TableCell>
      </TableRow>
    </>
  );
};

export default GeneratePublishResultTableCollapse;
