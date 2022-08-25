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

const TeacherFacultySubjectTableCollapse = ({
  item,
  updateTeacherHandler,
  deleteCollegeHandler,
}) => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell>{item.TeacherName}</TableCell>
      <TableCell>
        {item.SubjectName} ({item.SubjectCode})
      </TableCell>
      <TableCell>{item.Created_On.slice(0, 10)}</TableCell>
      <TableCell>{item.Summary}</TableCell>
      <TableCell>{item.IsActive ? "Active" : "Not Active"}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() =>
            updateTeacherHandler(
              item.IDHRTeacherFacultySubjectMappingHeader,
              item.IDTeacher
            )
          }
        >
          <EditIcon style={{ fontSize: 12 }} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() =>
            deleteCollegeHandler(
              item.IDHRTeacherFacultySubjectMappingHeader,
              item.IDTeacher
            )
          }
        >
          <DeleteIcon style={{ fontSize: 12 }} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TeacherFacultySubjectTableCollapse;
