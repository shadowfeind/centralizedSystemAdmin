import React from "react";
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

const SmsClassNotificationTableCollapse = ({
  item,
  updateNotificationHandler,
}) => {
  const classes = useStyles();
  return (
    <>
      <TableRow>
        <TableCell>
          {item.FirstName} {item.MiddleName} {item.LastName}
        </TableCell>
        <TableCell style={{ width: "40%" }}>
          {item.MessageDescription}
        </TableCell>
        <TableCell>{item.Created_On?.slice(0, 10)}</TableCell>
        <TableCell>
          {" "}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            //   onClick={() => updateNotificationHandler(item.IDECA)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            //   onClick={() => updateEcaHandler(item.IDECA)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SmsClassNotificationTableCollapse;
