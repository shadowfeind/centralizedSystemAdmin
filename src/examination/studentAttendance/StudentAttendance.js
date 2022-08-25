import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { symbolsArrPhone } from "../../helpers/excludeSymbol";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import LoadingComp from "../../components/LoadingComp";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import DatePickerControl from "../../components/controls/DatePickerControl";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
  getBulkStudentAttendanceAction,
  getAllStudentAttendanceAction,
  getAllStudentAttendanceInitialDataAction,
  getGeneratedStudentAttendanceAction,
} from "./StudentAttendanceActions";
import SelectControl from "../../components/controls/SelectControl";
import { GET_EVENT_RESET } from "../examMarkEntry/ExamMarkEntryConstants";
import { getEventAction } from "../examMarkEntry/ExamMarkEntryActions";
import {
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_RESET,
  GET_ALL_STUDEN_ATTENDANCE_RESET,
  GET_BULK_STUDENT_ATTENDANCE_RESET,
  GET_GENERATED_STUDENT_ATTENDANCE_RESET,
  POST_BULK_STUDENT_ATTENDANCE_RESET,
} from "./StudentAttendanceConstants";
import StudentAttendanceTableCollapse from "./StudentAttendanceTableCollapse";
import StudentAttendanceBulk from "./StudentAttendanceBulk";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
  customInput: {
    minWidth: "200px",
  },
}));

const test = [{ Key: "", Value: "" }];

const tableHeader = [
  { id: "RollNo", label: "Roll No" },
  { id: "FullName", label: "Full Name" },
  { id: "MobileNumber", label: "Mobile Number" },
  { id: "EmailID", label: "Email ID" },
  { id: "WorkingDay", label: "Working Days" },
  { id: "PresentDay", label: "Present Days" },
  { id: "AbsentDay", label: "Absent Days" },
  { id: "Actions", label: "Actions", disablesorting: true },
];

/*
 * get event name , exam schedule and getBulk has same api
 * as exam mark entry so i have used same reducers and actions
 */

const StudentAttendance = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);

  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [event, setEvent] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsGenerate, setErrorsGenerate] = useState({});
  const [workingDaysTotal, setWorkingDaysTotal] = useState("");
  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();

  const dispatch = useDispatch();
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.FullName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { studentAttendanceInitData, error: studentAttendanceInitDataError } =
    useSelector((state) => state.getAllStudentAttendanceInitialData);

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const {
    allStudentAttendance,
    loading,
    error: allStudentAttendanceError,
  } = useSelector((state) => state.getAllStudentAttendance);

  const {
    bulkStudentAttendance,
    loading: loadingBulk,
    error: bulkStudentAttendanceError,
  } = useSelector((state) => state.getBulkStudentAttendance);

  const {
    success: postBulkStudentAttendanceSuccess,
    error: postBulkStudentAttendanceError,
  } = useSelector((state) => state.postBulkStudentAttendance);

  const {
    generateStudentAttendance,
    success: generateStudentAttendanceSuccess,
    error: generateStudentAttendanceError,
  } = useSelector((state) => state.getGeneratedStudentAttendance);

  // if (getEventSuccess) {
  //   setDdlEvent(allEvents);
  //   dispatch({ type: GET_EVENT_RESET });
  // }

  if (studentAttendanceInitDataError) {
    setNotify({
      isOpen: true,
      message: studentAttendanceInitDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_RESET });
  }

  if (allStudentAttendanceError) {
    setNotify({
      isOpen: true,
      message: allStudentAttendanceError,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDEN_ATTENDANCE_RESET });
  }

  if (generateStudentAttendanceError) {
    setNotify({
      isOpen: true,
      message: generateStudentAttendanceError,
      type: "error",
    });
    dispatch({ type: GET_GENERATED_STUDENT_ATTENDANCE_RESET });
  }

  if (bulkStudentAttendanceError) {
    setNotify({
      isOpen: true,
      message: bulkStudentAttendanceError,
      type: "error",
    });
    dispatch({ type: GET_BULK_STUDENT_ATTENDANCE_RESET });
  }
  if (postBulkStudentAttendanceSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    dispatch({ type: POST_BULK_STUDENT_ATTENDANCE_RESET });
    dispatch(
      getAllStudentAttendanceAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event
      )
    );
    setOpenPopup(false);
  }

  if (postBulkStudentAttendanceError) {
    setNotify({
      isOpen: true,
      message: postBulkStudentAttendanceError,
      type: "error",
    });
    dispatch({ type: POST_BULK_STUDENT_ATTENDANCE_RESET });
    setOpenPopup(false);
  }

  if (generateStudentAttendance) {
    setNotify({
      isOpen: true,
      message: "Successfully Generated",
      type: "success",
    });
    dispatch({ type: GET_GENERATED_STUDENT_ATTENDANCE_RESET });
    dispatch(
      getAllStudentAttendanceAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event
      )
    );
    setOpenPopup(false);
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (studentAttendanceInitData) {
      setProgramValue(
        studentAttendanceInitData?.searchFilterModel.ddlFacultyProgramLink[0]
          ?.Key
      );
      setDdlClass(studentAttendanceInitData?.searchFilterModel.ddlClass);
      setClassId(studentAttendanceInitData?.searchFilterModel.ddlClass[0]?.Key);
      setAcademicYearDdl(
        studentAttendanceInitData?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        studentAttendanceInitData?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setDdlShift(
        studentAttendanceInitData?.searchFilterModel.ddlAcademicShift
      );
      setShift(
        studentAttendanceInitData?.searchFilterModel.ddlAcademicShift[0]?.Key
      );
      setDdlSection(studentAttendanceInitData?.searchFilterModel.ddlSection);
      setSection(
        studentAttendanceInitData?.searchFilterModel.ddlSection[0]?.Key
      );
      setStartDate(studentAttendanceInitData?.searchFilterModel.StartDate);
      setEndDate(studentAttendanceInitData?.searchFilterModel.EndDate);
      dispatch(
        getEventAction(
          studentAttendanceInitData?.searchFilterModel.ddlAcademicYear[0]?.Key,
          studentAttendanceInitData?.searchFilterModel.ddlFacultyProgramLink[0]
            ?.Key,
          studentAttendanceInitData?.searchFilterModel.ddlClass[0]?.Key
        )
      );
    }
  }, [studentAttendanceInitData, dispatch]);

  useEffect(() => {
    dispatch({ type: GET_ALL_STUDEN_ATTENDANCE_RESET });
    dispatch({ type: GET_GENERATED_STUDENT_ATTENDANCE_RESET });
    dispatch(getAllStudentAttendanceInitialDataAction());
  }, []);

  useEffect(() => {
    if (allStudentAttendance) {
      setTableData(allStudentAttendance.dbModelPresentAbsentLst);
    }
  }, [allStudentAttendance]);

  useEffect(() => {
    if (generateStudentAttendance) {
      setTableData(generateStudentAttendance.dbModelPresentAbsentLst);
    }
  }, [generateStudentAttendance]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const generateValidate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";
    temp.WorkingDayTotal = !workingDaysTotal ? "This feild is required" : "";

    setErrorsGenerate({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleShiftChange = (value) => {
    setShift(value);
    setDdlEvent([]);
    setEvent("");
    dispatch(getEventAction(acaYear, programValue, classId, value));
  };

  const handleSectionChange = (value) => {
    setSection(value);
    setDdlEvent([]);
    setEvent("");
    dispatch(getEventAction(acaYear, programValue, classId, shift, value));
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    setDdlEvent([]);
    setEvent("");
    if (classId) {
      dispatch(getEventAction(value, programValue, classId));
    }
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    setDdlEvent([]);
    setEvent("");
    dispatch(getEventAction(acaYear, programValue, value));
  };

  const handleStudentSearch = () => {
    if (validate()) {
      setErrorsGenerate({});
      dispatch(
        getAllStudentAttendanceAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event
        )
      );
    }
  };

  const handleStudentGenerate = () => {
    if (generateValidate()) {
      dispatch(
        getGeneratedStudentAttendanceAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          workingDaysTotal,
          StartDate?.slice(0, 10),
          EndDate?.slice(0, 10)
        )
      );
    }
  };

  const handleBulkEdit = () => {
    if (validate()) {
      setErrorsGenerate({});
      dispatch(
        getBulkStudentAttendanceAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event
        )
      );
      setOpenPopup(true);
    }
  };

  useEffect(() => {
    if (allEvents) {
      setDdlEvent(allEvents);
      setEvent(allEvents[0]?.Key);
    }
  }, [allEvents]);

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => handleYearChange(e.target.value)}
                options={academicYearDdl ? academicYearDdl : test}
                errors={
                  errors.acaYear
                    ? errors.acaYear
                    : errorsGenerate.acaYear && errorsGenerate.acaYear
                }
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => handleProgramValue(e.target.value)}
                options={programDdl ? programDdl : test}
                errors={errors.programValue}
              />
            </Grid> */}
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass ? ddlClass : test}
                errors={
                  errors.classId
                    ? errors.classId
                    : errorsGenerate.classId && errorsGenerate.classId
                }
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => handleShiftChange(e.target.value)}
                options={ddlShift ? ddlShift : test}
                errors={
                  errors.shift1
                    ? errors.shift1
                    : errorsGenerate.shift1 && errorsGenerate.shift1
                }
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => handleSectionChange(e.target.value)}
                options={ddlSection ? ddlSection : test}
                errors={
                  errors.section
                    ? errors.section
                    : errorsGenerate.section && errorsGenerate.section
                }
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
                errors={
                  errors.event
                    ? errors.event
                    : errorsGenerate.event && errorsGenerate.event
                }
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <InputControl
                name="Working Days"
                label="Working Days"
                onFocus={(e) => {
                  e.target.select();
                }}
                onWheelCapture={(e) => {
                  e.target.blur();
                }}
                onKeyDown={(e) =>
                  symbolsArrPhone.includes(e.key) && e.preventDefault()
                }
                value={workingDaysTotal}
                onChange={(e) => setWorkingDaysTotal(e.target.value)}
                type="number"
                errors={errorsGenerate.WorkingDayTotal}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <DatePickerControl
                name="ExamHeldDate"
                label="Attendance StartDate"
                value={StartDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <DatePickerControl
                name="ExamEndDate"
                label="Attendance EndDate"
                value={EndDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkEdit}
              >
                BULK EDIT
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleStudentSearch}
              >
                SEARCH
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleStudentGenerate}
              >
                GENERATE
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {allStudentAttendance && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item) => (
                    <StudentAttendanceTableCollapse
                      item={item}
                      key={item.$id}
                      attendance={
                        allStudentAttendance &&
                        allStudentAttendance.StudentAttendanceDays
                      }
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}

            {allStudentAttendance && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
        {loadingBulk ? (
          <LoadingComp />
        ) : (
          <>
            <StudentAttendanceBulk
              bulkData={
                bulkStudentAttendance &&
                bulkStudentAttendance.dbModelPresentAbsentLst
              }
              search={
                bulkStudentAttendance && bulkStudentAttendance.searchFilterModel
              }
              workingDayTotal={
                bulkStudentAttendance && bulkStudentAttendance.WorkingDayTotal
              }
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default StudentAttendance;
