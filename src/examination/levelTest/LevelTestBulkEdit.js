import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { postBulkLevelTestAction } from "./LevelTestActions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#253053",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const LevelTestBulkEdit = ({ bulkData, search,setOpenPopup }) => {
  const [bulk, setBulk] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChangeHandler = (subject, value, name, index) => {
    setBulk((prev) => {
      const newReassoc = {
        ...subject,
        [name]: value,
      };

      let newArray = [...prev];
      newArray[index] = newReassoc;

      return [...newArray];
    });
  };

  const formCheckSubmitHandler = () => {
    dispatch(postBulkLevelTestAction(bulk, search));
  };
  useEffect(() => {
    if (bulkData) {
      setBulk(bulkData);
    }
  }, [bulkData]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No.</StyledTableCell>
              <StyledTableCell align="right">FullName</StyledTableCell>
              <StyledTableCell align="right">Aptitude Test</StyledTableCell>
              <StyledTableCell align="right">Handwriting</StyledTableCell>
              <StyledTableCell align="right">Home/Class Work</StyledTableCell>
              <StyledTableCell align="right">Drawing</StyledTableCell>
              <StyledTableCell align="right">Fluency</StyledTableCell>
              <StyledTableCell align="right">Rhyme</StyledTableCell>
              <StyledTableCell align="right">Creation</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bulk &&
              bulk.map((subject, index) => (
                <StyledTableRow key={subject.IDHREmployee}>
                  <StyledTableCell component="th" scope="row">
                    {subject.RollNo}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.FullName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      defaultValue={subject.AptitudeTest}
                      label="Aptitude Test"
                      variant="outlined"
                      name="AptitudeTest"
                      inputProps={{ tabIndex: "1" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      defaultValue={subject.Handwriting}
                      label="Handwriting"
                      variant="outlined"
                      name="Handwriting"
                      inputProps={{ tabIndex: "2" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      defaultValue={subject.HomeClassWork}
                      label="Home/Class Work"
                      variant="outlined"
                      name="HomeClassWork"
                      inputProps={{ tabIndex: "3" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      defaultValue={subject.Drawing}
                      label="Drawing"
                      variant="outlined"
                      name="Drawing"
                      inputProps={{ tabIndex: "4" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      defaultValue={subject.Fluency}
                      label="Fluency"
                      variant="outlined"
                      name="Fluency"
                      inputProps={{ tabIndex: "5" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      defaultValue={subject.Rhyme}
                      label="Rhyme"
                      variant="outlined"
                      name="Rhyme"
                      inputProps={{ tabIndex: "6" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      defaultValue={subject.Creation}
                      label="Creation"
                      variant="outlined"
                      name="Creation"
                      inputProps={{ tabIndex: "7" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingTop: "10px",
              marginTop: "10px",
              borderTop: "1px solid #f3f3f3",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenPopup(false)}
              style={{ margin: "10px 0 0 10px" }}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: "10px 0 0 10px" }}
              onClick={formCheckSubmitHandler}
            >
              SUBMIT
            </Button>
          </div>
        
      </TableContainer>
    </>
  );
};

export default LevelTestBulkEdit;
