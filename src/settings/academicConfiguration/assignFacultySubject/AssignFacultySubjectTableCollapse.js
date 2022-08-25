import React from "react";
import { Button, TableRow, TableCell, makeStyles } from "@material-ui/core";
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

const AssignFacultySubjectTableCollepse = ({
  item,
  updateFacultySubjectHandler,
  deleteCollegeHandler,
}) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>{item.SubjectName}</TableCell>
      <TableCell>{item.SubjectCode}</TableCell>
      <TableCell>{item.IsOptional ? "True" : "False"}</TableCell>
      <TableCell>{item.IsCompulsory ? "True" : "False"}</TableCell>
      <TableCell>{item.IsTheoritical ? "True" : "False"}</TableCell>
      <TableCell>{item.IsPractical ? "True" : "False"}</TableCell>
      <TableCell>{item.IsActive ? "Active" : "InActive"}</TableCell>
      <TableCell>{item.CreditHour}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() =>
            updateFacultySubjectHandler(item.IDAcademicFacultySubjectLink)
          }
        >
          <EditIcon style={{ fontSize: 12 }} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          //   onClick={() => deleteCollegeHandler(item.IDAcademicSubject)}
        >
          <DeleteIcon style={{ fontSize: 12 }} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AssignFacultySubjectTableCollepse;
