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
const AdmissionConfigurationTableCollapse = ({
  item,
  year,
  program,
  updateAdmissionConfig,
}) => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell>{item.AdmissionStartDate.slice(0, 10)}</TableCell>
      <TableCell>{item.AdmissionEndDate.slice(0, 10)}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() =>
            updateAdmissionConfig(item.IDFacultyConfiguration, year, program)
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

export default AdmissionConfigurationTableCollapse;
