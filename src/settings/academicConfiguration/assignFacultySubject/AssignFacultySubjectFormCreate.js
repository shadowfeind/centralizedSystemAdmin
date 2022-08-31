import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  TextField,
  DialogContent,
} from "@material-ui/core";
import { symbolsArrPhoneDot } from "../../../helpers/excludeSymbol";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DialogFooter from "../../../components/DialogFooter";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
    color: "#fff",
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

const AssignFacultySubjectFormCreate = ({
  subjectOptions,
  formCheck,
  assignFacSubGenerate,
  setFormCheck,
  formCheckSubmitHandler,
  setOpenPopup,
  createErrors,
  generateErrors,
}) => {
  const [subjects, setSubjects] = useState([]);
  const classes = useStyles();

  const handleBulkChange = (checked) => {
    if (checked) {
      setFormCheck([...assignFacSubGenerate]);
    } else {
      setFormCheck([]);
    }
  };

  const inputHandler = (subject, value) => {
    setFormCheck((prev) => {
      const exists = prev?.find(
        (u) => u.IDAcademicSubject === subject.IDAcademicSubject
      );
      if (exists) {
        const newSubject = { ...subject, CreditHour: Number(value) };
        // console.log(newSubject);
        let newArr = [...prev];
        prev.map((data, index) => {
          newArr[index].CreditHour = Number(value);
        });
        return [...newArr];
      }
      return [...prev];
    });
  };

  const handleChange = (subject) => {
    setFormCheck((prev) => {
      const exists = prev?.find(
        (u) => u.IDAcademicSubject === subject.IDAcademicSubject
      );
      if (exists) {
        let newArr = prev?.filter(
          (u) => u.IDAcademicSubject !== subject.IDAcademicSubject
        );
        return [...newArr];
      }
      let newCreditHour = Number(
        document.getElementById(`subject_${subject.IDAcademicSubject}`).value
      );
      const newSubject = { ...subject, CreditHour: newCreditHour };
      // console.log(newSubject);
      return [...prev, newSubject];
    });
  };

  useEffect(() => {
    if (subjectOptions) {
      setSubjects(subjectOptions);
    } else {
      setSubjects(assignFacSubGenerate);
    }
  }, [subjectOptions, assignFacSubGenerate]);

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Subject Name </StyledTableCell>
                <StyledTableCell align="right">Subject Code</StyledTableCell>
                <StyledTableCell align="right">Compulsory</StyledTableCell>
                <StyledTableCell align="right">Optional</StyledTableCell>
                <StyledTableCell align="right">Practical</StyledTableCell>
                <StyledTableCell align="right">Theoritical</StyledTableCell>
                <StyledTableCell align="center">Credit Hour</StyledTableCell>
                <StyledTableCell align="right">
                  All{" "}
                  <Checkbox
                    className={classes.checkBox}
                    onChange={(e) => handleBulkChange(e.target.checked)}
                    name="checkedB"
                    color="primary"
                  />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects &&
                subjects?.map((subject) => (
                  <StyledTableRow key={subject.IDAcademicSubject}>
                    <StyledTableCell component="th" scope="row">
                      {subject.SubjectName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {subject.SubjectCode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {subject.IsCompulsory ? "True" : "False"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {subject.IsOptional ? "True" : "False"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {subject.IsPractical ? "True" : "False"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {subject.IsTheoritical ? "True" : "False"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <TextField
                        id={`subject_${subject.IDAcademicSubject}`}
                        defaultValue={subject.CreditHour}
                        onWheelCapture={(e) => {
                          e.target.blur();
                        }}
                        type="number"
                        label="Credit Hours"
                        variant="outlined"
                        onKeyDown={(e) =>
                          symbolsArrPhoneDot.includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={(e) => inputHandler(subject, e.target.value)}
                        inputProps={{ tabIndex: "1" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {" "}
                      <Checkbox
                        checked={
                          formCheck?.filter(
                            (x) =>
                              x.IDAcademicSubject === subject.IDAcademicSubject
                          )?.length > 0
                            ? true
                            : false
                        }
                        onChange={() => handleChange(subject)}
                        name="checkedB"
                        color="primary"
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      {createErrors.formCheck && (
        <h4 style={{ color: "red" }}>{createErrors.formCheck}</h4>
      )}

      {generateErrors.formCheck && (
        <h4 style={{ color: "red" }}>{generateErrors.formCheck}</h4>
      )}
      {subjectOptions?.length <= 0 && (
        <div>
          <h3 style={{ color: "red", textAlign: "center" }}>No Data</h3>
        </div>
      )}
      {/* {errors && (
        <div
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "12px",
            paddingTop: "8px",
          }}
        >
          {errors?.submit}
        </div>
      )} */}
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

export default AssignFacultySubjectFormCreate;
