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
} from "@material-ui/core";
import { symbolsArrPhoneDot } from "../../../helpers/excludeSymbol";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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

const ClassSubjectCreateForm = ({
  subjectOptions,
  formCheck,
  checkErrors,
  setFormCheck,
  formCheckSubmitHandler,
  setOpenPopup,
}) => {
  const [subjects, setSubjects] = useState([]);
  const classes = useStyles();

  const inputHandler = (subject, value) => {
    setFormCheck((prev) => {
      const exists = prev?.find(
        (u) => u.IDAcademicSubject === subject.IDAcademicSubject
      );
      if (exists) {
        const newSubject = { ...subject, CreditHour: Number(value) };
        // console.log(newSubject);
        let newArr = [...prev];
        prev?.map((data, index) => {
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
    }
  }, [subjectOptions]);

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Subject Name </StyledTableCell>
              <StyledTableCell align="center">Subject Code</StyledTableCell>
              <StyledTableCell align="center">Compulsory</StyledTableCell>
              <StyledTableCell align="center">Optional</StyledTableCell>
              <StyledTableCell align="center">Practical</StyledTableCell>
              <StyledTableCell align="center">Theoritical</StyledTableCell>
              <StyledTableCell align="center">Credit Hour</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects &&
              subjects?.map((subject) => (
                <StyledTableRow key={subject.IDAcademicSubject}>
                  <StyledTableCell component="th" scope="row">
                    {subject.SubjectName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {subject.SubjectCode}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {subject.IsCompulsory ? "True" : "False"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {subject.IsOptional ? "True" : "False"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {subject.IsPractical ? "True" : "False"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {subject.IsTheoritical ? "True" : "False"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField
                      id={`subject_${subject.IDAcademicSubject}`}
                      defaultValue={subject.CreditHour}
                      type="number"
                      onWheelCapture={(e) => {
                        e.target.blur();
                      }}
                      // label="Credit Hours"
                      onKeyDown={(e) =>
                        symbolsArrPhoneDot.includes(e.key) && e.preventDefault()
                      }
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "left" },
                        },
                      }}
                      variant="outlined"
                      onChange={(e) => inputHandler(subject, e.target.value)}
                      inputProps={{ tabIndex: "1" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
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
      {checkErrors.formCheck && (
        <h4 style={{ color: "red" }}>{checkErrors.formCheck}</h4>
      )}
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
    </>
  );
};

export default ClassSubjectCreateForm;
