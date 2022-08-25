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

const AcademicYearTableCollapse = ({
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
        <TableCell>{item.AcademicYearName}</TableCell>
        <TableCell>{item.AcademicYearCode}</TableCell>
        <TableCell>{item.StartDate.slice(0, 10)}</TableCell>
        <TableCell>{item.EndDate.slice(0, 10)}</TableCell>
        <TableCell>{item.IsActive ? "IsActive" : "NotActive"}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateCollegeHandler(item.IDAcademicYear)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => deleteCollegeHandler(item.IDAcademicYear)}
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
                      <strong>Academic Year Name</strong>: {item.IDAcademicYear}
                    </ListItem>
                    <ListItem>
                      <strong>Academic Year</strong>: {item.AcademicYear}
                    </ListItem>
                    <ListItem>
                      <strong>IsActive</strong>:{" "}
                      {item.IsActive ? "IsActive" : "NotActive"}
                    </ListItem>
                    <ListItem>
                      <strong>Academic Year Code</strong>:{" "}
                      {item.AcademicYearCode}
                    </ListItem>
                    <ListItem>
                      <strong>Start Date</strong>: {item.StartDate?.slice(0,10)}
                    </ListItem>
                    <ListItem>
                      <strong>End Date</strong>: {item.EndDate?.slice(0,10)}
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

export default AcademicYearTableCollapse;
