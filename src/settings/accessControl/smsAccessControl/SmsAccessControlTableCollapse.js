import React, { useState } from "react";
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

const useStyles = makeStyles({
    button: {
      marginRight: "1px",
      padding: "5px",
      minWidth: "10px",
      fontSize: "12px",
    },
  });

  const SmsAccessControlTableCollapse = ({
    item,
    updateSMSHandler,
  }) => {
    const classes = useStyles();

    return (
        <TableRow>
          <TableCell>{item.SMSHeader}</TableCell>
          <TableCell>{item.IDHRCompany}</TableCell>
          <TableCell>{item.Created_On.slice(0, 10)}</TableCell>
          <TableCell>{item.Updated_On.slice(0, 10)}</TableCell>
          <TableCell>{item.IsActive ? "Active" : "InActive"}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => updateSMSHandler(item.IDSMSControl,item.IDHRCompany)}
            >
              <EditIcon style={{ fontSize: 12 }} />
            </Button>
          </TableCell>
        </TableRow>
      );
    };
    
    export default SmsAccessControlTableCollapse;
  