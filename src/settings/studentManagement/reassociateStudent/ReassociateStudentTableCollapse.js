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

const ReassociateStudentTableCollapse = ({
  item,
  updateFormHandler,
  //   deleteCollegeHandler,
}) => {
  const classes = useStyles();

  return (
    <TableRow key={item.$id}>
      <TableCell>{item.StudentName}</TableCell>
      <TableCell>{item.RollNo}</TableCell>
      <TableCell>{item.PUNumber}</TableCell>
      <TableCell>{item.AcademicProgramName}</TableCell>
      <TableCell>{item.Email}</TableCell>
      <TableCell>{item.MobileNo}</TableCell>
      <TableCell>{item.LevelStatus}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => updateFormHandler(item.IDStudentFacultyLevel)}
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

export default ReassociateStudentTableCollapse;
