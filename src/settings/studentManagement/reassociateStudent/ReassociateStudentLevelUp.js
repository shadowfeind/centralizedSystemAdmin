import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SelectControl from "../../../components/controls/SelectControl";
import InputControl from "../../../components/controls/InputControl";
import { validate } from "schema-utils";

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

const ReassociateStudentLevelUp = ({
  dbModelLst,
  ddlSection,
  ddlLevelStatus,
  ddlAcademicYear,
  ddlAcademicYearNext,
  idAcademicYearValue,
  noNextYearError,
  idNextAcademicYearValue,
  ddlClass,
  nextClass,
  setOpenPopup,
  setFormCheck,
  formCheck,
  formCheckSubmitHandler,
}) => {
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const [active, setActive] = useState(false);

  const handleBulkChange = (checked) => {
    if (checked) {
      setFormCheck([...dbModelLst]);
    } else {
      setFormCheck([]);
    }
  };
  let showNextClass = ddlClass && ddlClass.filter((x) => x.Key === nextClass);

  const handleChange = (subject) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDStudentFacultyLevel === subject.IDStudentFacultyLevel
      );
      if (exists) {
        let newArr = prev.filter(
          (u) => u.IDStudentFacultyLevel !== subject.IDStudentFacultyLevel
        );
        return [...newArr];
      }
      let newSection = document.getElementById(
        `section_${subject.IDStudentFacultyLevel}`
      ).value;
      let newStatus = document.getElementById(
        `status_${subject.IDStudentFacultyLevel}`
      ).value;

      const newReassoc = {
        ...subject,
        Section: newSection,
        LevelStatus: newStatus,
      };

      return [...prev, newReassoc];
    });
  };

  const sectionHandler = (value, subject) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDStudentFacultyLevel === subject.IDStudentFacultyLevel
      );
      if (exists) {
        const newReassoc = { ...subject, Section: value };

        let newArr = [...prev];
        prev.map((data, index) => {
          newArr[index].Section = value;
        });
        return [...newArr];
      }
      return [...prev];
    });
  };

  const statusHandler = (value, subject) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDStudentFacultyLevel === subject.IDStudentFacultyLevel
      );
      if (exists) {
        const newReassoc = { ...subject, LevelStatus: value };

        let newArr = [...prev];
        prev.map((data, index) => {
          newArr[index].LevelStatus = value;
        });
        return [...newArr];
      }
      return [...prev];
    });
    console.log(value);
  };

  const validate = () => {
    let temp = {};
    temp.submit = formCheck?.length <= 0 ? "Select Atleast one options" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const formCheckSubmitHandlerHolder = () => {
    if (validate()) {
      setActive(true);
      formCheckSubmitHandler();
    }
  };

  return (
    <>
      <div>
        {noNextYearError && (
          <h3 style={{ color: "red", textAlign: "center" }}>
            {noNextYearError}
          </h3>
        )}
      </div>
      {!noNextYearError && (
        <>
          <Grid container>
            {idAcademicYearValue && (
              <Grid item xs={4}>
                <SelectControl
                  disabled
                  name="academicYear"
                  label="Academic Year"
                  value={idAcademicYearValue}
                  onChange={null}
                  options={ddlAcademicYear}
                />
              </Grid>
            )}
            {idNextAcademicYearValue && (
              <Grid item xs={4}>
                <SelectControl
                  disabled
                  name="academicYearNext"
                  label="Next Academic Year"
                  value={idNextAcademicYearValue}
                  onChange={null}
                  options={ddlAcademicYearNext}
                />
              </Grid>
            )}
            <Grid item xs={4}>
              <InputControl
                disabled
                variant="filled"
                value={showNextClass && showNextClass[0].Value}
              />
            </Grid>
          </Grid>
          <div style={{ height: "10px" }}></div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>StudentName </StyledTableCell>
                  <StyledTableCell align="center" style={{ width: 180 }}>
                    Batch
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    Program/Faculty
                  </StyledTableCell> */}
                  <StyledTableCell align="center">Class</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: 150 }}>
                    Section
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ width: 150 }}>
                    Status
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    All{" "}
                    <Checkbox
                      onChange={(e) => handleBulkChange(e.target.checked)}
                      name="checkedB"
                      color="primary"
                    />
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dbModelLst &&
                  dbModelLst.map((subject) => (
                    <StyledTableRow key={subject.IDStudentFacultyLevel}>
                      <StyledTableCell component="th" scope="row">
                        {subject.StudentName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {subject.AcademicYear}
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">
                        {subject.FacultyPath ? "True" : "False"}
                      </StyledTableCell> */}
                      <StyledTableCell align="center">
                        {subject.IDLevel
                          ? ddlClass.filter(
                              (x) => x.Key === subject.IDLevel
                            )?.[0].Value
                          : ""}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <FormControl
                          variant="filled"
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor="filled-age-native-simple">
                            Section
                          </InputLabel>
                          <Select
                            native
                            defaultValue={subject.Section}
                            id={`section_${subject.IDStudentFacultyLevel}`}
                            onChange={(e) =>
                              sectionHandler(e.target.value, subject)
                            }
                          >
                            {ddlSection.map((section) => (
                              <option value={section.Key}>
                                {section.Value}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <FormControl
                          variant="filled"
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor="Status">Status</InputLabel>
                          <Select
                            native
                            defaultValue={subject.LevelStatus}
                            id={`status_${subject.IDStudentFacultyLevel}`}
                            onChange={(e) =>
                              statusHandler(e.target.value, subject)
                            }
                          >
                            {ddlLevelStatus.map((levelStatus) => (
                              <option value={levelStatus.Key}>
                                {levelStatus.Value}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {" "}
                        <Checkbox
                          checked={
                            formCheck.filter(
                              (x) => x.IDHREmployee === subject.IDHREmployee
                            ).length > 0
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
          {dbModelLst?.length <= 0 && (
            <div>
              <h3 style={{ color: "red", textAlign: "center" }}>
                No Data Found
              </h3>
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
              disabled={active}
              style={{ margin: "10px 0 0 10px" }}
              onClick={formCheckSubmitHandlerHolder}
            >
              {active ? "PROCESSING" : "SUBMIT"}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ReassociateStudentLevelUp;
