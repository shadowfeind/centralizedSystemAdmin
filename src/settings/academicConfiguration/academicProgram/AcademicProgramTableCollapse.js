import React, { useState, useSelector } from "react";
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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const AcademicProgramTableCollapse = ({
  item,
  updateCollegeHandler,
  deleteCollegeHandler,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <TableRow>
        <TableCell>{item.AcademicProgramName}</TableCell>
        <TableCell>{item.Description}</TableCell>
        <TableCell>{item.Created_On.slice(0, 10)}</TableCell>
        <TableCell>{item.Updated_On.slice(0, 10)}</TableCell>
        <TableCell>{item.IsActive ? "IsActive" : "NotActive"}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateCollegeHandler(item.IDAcademicProgram)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => deleteCollegeHandler(item.IDAcademicProgram)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(!open);
            }}
            className={classes.button}
          >
            {" "}
            {open ? (
              <KeyboardArrowUpIcon style={{ fontSize: 12 }} />
            ) : (
              <KeyboardArrowDownIcon style={{ fontSize: 12 }} />
            )}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="p" gutterBottom component="div">
                Details
              </Typography>
              <Grid container>
                <Grid item md={6}>
                  <List key={item.$id * 0.002}>
                    <ListItem>
                      <strong>Academic Program Name</strong>:{" "}
                      {item.AcademicProgramName}
                    </ListItem>
                    <ListItem
                      style={{ alignItems: "start", maxWidth: "600px" }}
                    >
                      <strong>Description</strong>: {item.Description}
                    </ListItem>
                    <ListItem>
                      <strong>IsActive</strong>:{" "}
                      {item.IsActive ? "IsActive" : "NotActive"}
                    </ListItem>
                    <ListItem>
                      <strong>Created On</strong>: {item.Created_On?.slice(0,10)}
                    </ListItem>
                    <ListItem>
                      <strong>Updated On</strong>: {item.Updated_On?.slice(0,10)}
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={6} style={{}}>
                  <List key={item.$id * 0.003}>
                    <ListItem>
                      <strong>School Board</strong>:{" "}
                      {/* {selected.map((item) => (
                        <div>
                          {" "}
                          <p>{item.Name}</p>
                        </div>
                      ))} */}
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AcademicProgramTableCollapse;
