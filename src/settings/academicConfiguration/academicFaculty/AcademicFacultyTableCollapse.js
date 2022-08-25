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

const AcademicFacultyTableCollapse = ({
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
        <TableCell>{item.Header}</TableCell>
        <TableCell>{item.TotalLevel}</TableCell>
        <TableCell>{item.LevelMOU}</TableCell>
        <TableCell>{item.TotalSeat}</TableCell>
        <TableCell>{item.IsActive ? "IsActive" : "NotActive"}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateCollegeHandler(item.IDFaculty)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => deleteCollegeHandler(item.IDFaculty)}
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
                      <strong>Academic Header</strong>: {item.Header}
                    </ListItem>
                    <ListItem
                      style={{ alignItems: "start", maxWidth: "600px" }}
                    >
                      <strong>Total Level</strong>: {item.TotalLevel}
                    </ListItem>
                    <ListItem>
                      <strong>IsActive</strong>:{" "}
                      {item.IsActive ? "IsActive" : "NotActive"}
                    </ListItem>
                    <ListItem>
                      <strong>Level System</strong>: {item.LevelMOU}
                    </ListItem>
                    <ListItem>
                      <strong>Total Seat</strong>: {item.TotalSeat}
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={6} style={{}}>
                  <List key={item.$id * 0.003}>
                    <ListItem>
                      <strong>Academic Program</strong>:{" "}
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

export default AcademicFacultyTableCollapse;
