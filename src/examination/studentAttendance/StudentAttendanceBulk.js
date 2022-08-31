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
  DialogContent,
} from "@material-ui/core";
import { symbolsArrPhone } from "../../helpers/excludeSymbol";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { postBulkStudentAttendanceAction } from "./StudentAttendanceActions";
import DialogFooter from "../../components/DialogFooter";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
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

const StudentAttendanceBulk = ({
  bulkData,
  search,
  workingDayTotal,
  setOpenPopup,
}) => {
  const [bulk, setBulk] = useState([]);
  const [workingDays, setWorkingDays] = useState();
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const onChangeHandler = (subject, value, name, index) => {
    if ((value >= 0) & (value <= Number(workingDays))) {
      setBulk((prev) => {
        const newReassoc = {
          ...subject,
          [name]: Number(value),
        };

        let newArray = [...prev];
        newArray[index] = newReassoc;

        return [...newArray];
      });
    } else {
      alert("Present Day must be less than or equal to working days");
    }
  };

  const formCheckSubmitHandler = () => {
    if (validate()) {
      dispatch(postBulkStudentAttendanceAction(bulk, search, workingDays));
    }
  };
  useEffect(() => {
    if (bulkData) {
      setBulk(bulkData);
      setWorkingDays(workingDayTotal);
    }
  }, [bulkData]);

  useEffect(() => {
    setWorkingDays(workingDayTotal);
  }, []); //calling it just once

  const validate = () => {
    let temp = { ...errors };
    temp.workingDays = workingDays?.length > 0 ? "" : "This feild is required";
    temp.submit = bulk?.length <= 0 ? "Cannot Submit When Data is Empty" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <>
      <DialogContent>
        <div style={{ width: "300px", margin: "15px auto" }}>
          Working Total Days:
          <TextField
            type="number"
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            // label="WorkingDayTotal"
            variant="outlined"
            name="WorkingDayTotal"
            value={workingDays}
            onChange={(e) => setWorkingDays(e.target.value)}
            errors={errors.workingDays}
          />
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Roll No.</StyledTableCell>
                <StyledTableCell align="left">FullName</StyledTableCell>
                <StyledTableCell align="center">Present Days</StyledTableCell>
                <StyledTableCell align="center">Absent Days</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bulk &&
                bulk?.map((subject, index) => (
                  <StyledTableRow key={subject.IDHREmployee}>
                    <StyledTableCell component="th" scope="row">
                      {subject.RollNo}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {subject.FullName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <TextField
                        id={`theory_${subject.IDHREmployee}`}
                        value={subject.PresentDay}
                        type="number"
                        label="Present Day"
                        variant="outlined"
                        name="PresentDay"
                        onKeyDown={(e) =>
                          symbolsArr.includes(e.key) && e.preventDefault()
                        }
                        inputProps={{
                          tabIndex: "1",
                          style: { textAlign: "left" },
                        }}
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
                    <StyledTableCell align="center">
                      <TextField
                        disabled
                        id={`practical_${subject.IDHREmployee}`}
                        value={
                          workingDays -
                          (subject.PresentDay !== null && subject.PresentDay)
                        }
                        type="number"
                        label="Absent Day"
                        variant="outlined"
                        name="AbsentDay"
                        onWheelCapture={(e) => {
                          e.target.blur();
                        }}
                        onKeyDown={(e) =>
                          symbolsArr.includes(e.key) && e.preventDefault()
                        }
                        inputProps={{
                          tabIndex: "2",
                          style: { textAlign: "left" },
                        }}
                        onChange={(e) =>
                          e.target.value >= 0 &&
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
        </TableContainer>
        {bulk?.length <= 0 && (
          <div>
            <h3 style={{ color: "red", textAlign: "center" }}>No Data</h3>
          </div>
        )}
        {errors.submit && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "12px",
              paddingTop: "8px",
            }}
          >
            {errors.submit}
          </div>
        )}
      </DialogContent>
      <DialogFooter>
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
      </DialogFooter>
    </>
  );
};

export default StudentAttendanceBulk;
