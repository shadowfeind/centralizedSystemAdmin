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
const CounterConfigurationTableCollapse = ({
  item,
  updateCounterConfig,
  year,
  program,
}) => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell>{item.CounterYear}</TableCell>
      <TableCell>{item.CounterFor}</TableCell>
      <TableCell>{item.Prefix}</TableCell>
      <TableCell>{item.Middle}</TableCell>
      <TableCell>{item.CurrentCount}</TableCell>
      <TableCell>{item.Status}</TableCell>

      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => updateCounterConfig(item.IDCounter, year, program)}
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

export default CounterConfigurationTableCollapse;
