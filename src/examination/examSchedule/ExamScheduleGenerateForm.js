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
  Grid,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SelectControl from "../../components/controls/SelectControl";
import InputControl from "../../components/controls/InputControl";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventForExamScheduleAction,
  postGenerateExamScheduleCreateAction,
} from "./ExamScheduleActions";
import { GET_EVENT_FOR_EXAM_SCHEDULE_RESET } from "./ExamScheduleConstants";

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

const ExamScheduleGenerateForm = ({
  generate,
  setGeneratePopUp,
  programValue,
  eventName,
  acaYear,
  events,
  classValue,
}) => {
  const [year, setYear] = useState("");
  const [ddlYear, setDdlYear] = useState([]);
  const [classId, setClassId] = useState("");
  const [ddlClassId, setDdlClassId] = useState([]);
  const [event, setEvent] = useState("");
  const [eventDdl, setEventDdl] = useState([]);
  const classes = useStyles();
  const [formCheck, setFormCheck] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const { eventExamSchedule, error: eventExamScheduleError } = useSelector(
    (state) => state.getEventForExamSchedule
  );

  // if (eventExamScheduleError) {
  //   setEventDdl([]);
  //   dispatch({ type: GET_EVENT_FOR_EXAM_SCHEDULE_RESET });
  // }

  const handleAcaYear = (value) => {
    setYear(value);
    setEventDdl([]);
    setEvent("");
    if ((value, classId)) {
      dispatch(getEventForExamScheduleAction(value, programValue, classId));
    }
  };

  const handleClassId = (value) => {
    setClassId(value);
    setEventDdl([]);
    setEvent("");
    if ((acaYear, value)) {
      dispatch(getEventForExamScheduleAction(acaYear, programValue, value));
    }
  };

  const eventHandler = (value) => {
    setEvent(value);
  };

  useEffect(() => {
    if (eventExamSchedule) {
      setEventDdl(eventExamSchedule);
      setEvent(events);
    }
    if (eventExamScheduleError) {
      setEventDdl([]);
    }
  }, [eventExamSchedule, eventExamScheduleError]);

  useEffect(() => {
    if (acaYear) {
      setYear(acaYear);
    }
    if (classValue) {
      setClassId(classValue);
    }
    if (generate) {
      setFormCheck([...generate.dbModelLst]);
      setAllChecked(true);
    }
    // if (acaYear && classValue && programValue) {
    //   dispatch(
    //     getEventForExamScheduleAction(acaYear, programValue, classValue)
    //   );
    // }
  }, [acaYear, classValue, generate, programValue, dispatch]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !year ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";
    temp.submit = formCheck?.length <= 0 ? "Select Atleast One Option" : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (subject) => {
    setFormCheck((prev) => {
      const exists = prev?.find(
        (u) =>
          u.IDAcademicFacultySubjectLink ===
          subject.IDAcademicFacultySubjectLink
      );
      if (exists) {
        let newArr = prev?.filter(
          (u) =>
            u.IDAcademicFacultySubjectLink !==
            subject.IDAcademicFacultySubjectLink
        );
        return [...newArr];
      }

      return [...prev, subject];
    });
  };

  const handleBulkChange = (checked) => {
    if (checked) {
      setFormCheck([...generate.dbModelLst]);
      setAllChecked(checked);
    } else {
      setFormCheck([]);
      setAllChecked(checked);
    }
  };

  const formCheckSubmitHandler = () => {
    if (validate()) {
      dispatch(
        postGenerateExamScheduleCreateAction(
          year,
          classId,
          event,
          formCheck,
          generate.searchFilterModel
        )
      );
    }
  };

  return (
    <>
      {generate && (
        <div>
          <Grid container>
            <Grid item xs={4}>
              <SelectControl
                disabled
                name="academicYear"
                label="Academic Year"
                value={year}
                onChange={(e) => handleAcaYear(e.target.value)}
                options={generate?.searchFilterModel?.ddlAcademicYear}
                errors={errors.year}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectControl
                disabled
                name="academicYearNext"
                label="classes"
                value={classId}
                onChange={(e) => handleClassId(e.target.value)}
                options={generate?.searchFilterModel?.ddlClass}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectControl
                name="academicYearNext"
                label="Event Name"
                value={event}
                onChange={(e) => eventHandler(e.target.value)}
                options={eventDdl && eventDdl}
                errors={errors.event}
              />
            </Grid>
          </Grid>
          <div style={{ height: "10px" }}></div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>EventName </StyledTableCell>
                  <StyledTableCell align="center" style={{ width: 180 }}>
                    Subject
                  </StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: 150 }}>
                    DisplayName
                  </StyledTableCell>
                  {/* <StyledTableCell align="center" style={{ width: 150 }}>
                    FromDate
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ width: 150 }}>
                    ToDate
                  </StyledTableCell> */}
                  <StyledTableCell align="center" style={{ width: 150 }}>
                    FullMark
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    FullMark(PT/UT)
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ width: 150 }}>
                    PassMark
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ width: 150 }}>
                    Subject Order
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ width: 150 }}>
                    All{" "}
                    <Checkbox
                      onChange={(e) => handleBulkChange(e.target.checked)}
                      name="checkedB"
                      color="primary"
                      checked={allChecked}
                    />
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generate &&
                  generate.dbModelLst?.map((subject) => {
                    const currentSubject = generate.ddlSubject?.find(
                      (x) => x.Key === subject.IDAcademicFacultySubjectLink
                    );
                    return (
                      <StyledTableRow key={subject.$id}>
                        <StyledTableCell component="th" scope="row">
                          {subject.EventName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {currentSubject && currentSubject?.Value}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {subject.ExamType}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {subject.DisplayName}
                        </StyledTableCell>
                        {/* <StyledTableCell align="right">
                          {subject.ExamScheduleFromDate?.slice(0, 10)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {subject.ExamScheduleToDate?.slice(0, 10)}
                        </StyledTableCell> */}
                        <StyledTableCell align="center">
                          {subject.FullMark}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {subject.FullMarkPractical}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {subject.PassMark}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {subject.SubjectOrder}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {" "}
                          <Checkbox
                            checked={
                              formCheck?.filter(
                                (x) =>
                                  x.IDAcademicFacultySubjectLink ===
                                  subject.IDAcademicFacultySubjectLink
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
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {generate?.dbModelLst?.length <= 0 && (
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
              onClick={() => setGeneratePopUp(false)}
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
        </div>
      )}
    </>
  );
};

export default ExamScheduleGenerateForm;
