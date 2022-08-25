import React from "react";
import { TableRow, TableCell, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const PrintAdminCardTableCollapse = ({ item, section }) => {
  const classes = useStyles();
  const sectionNameToShow = section?.filter((s) => s.Key == item.Section);
  return (
    <>
      <TableRow>
        <TableCell>{item.StudentFullName}</TableCell>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.UniversityRegistrationNumber}</TableCell>
        <TableCell>
          {item.AcademicProgramName}/{item.FacultyName}
        </TableCell>
        <TableCell>
          {sectionNameToShow?.length > 0 && sectionNameToShow[0]?.Value}
        </TableCell>
        <TableCell>{item.EventName}</TableCell>
        <TableCell>{item.Status}</TableCell>
      </TableRow>
    </>
  );
};

export default PrintAdminCardTableCollapse;
