import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

const ExamMarkApprovalTableCollapse = ({ item }) => {
  return (
    <>
      <TableRow>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{item.SubjectName}</TableCell>
        <TableCell>{item.FullMark}</TableCell>
        <TableCell>{item.FullMarkPractical}</TableCell>
        <TableCell>
          {item.ObtainedMark === 0 ? "" : item.ObtainedMark?.toFixed(2)}
        </TableCell>
        <TableCell>
          {item.ObtainedMarkPractical === 0
            ? ""
            : item.ObtainedMarkPractical?.toFixed(2)}
        </TableCell>
        {/* <TableCell>{item.SecuredDivision}</TableCell> */}
        <TableCell>{item.Updated_On?.slice(0, 10)}</TableCell>
        <TableCell>{item.Status}</TableCell>
      </TableRow>
    </>
  );
};

export default ExamMarkApprovalTableCollapse;
