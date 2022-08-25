import React, { useEffect, useState } from "react";
import { Button, makeStyles, Toolbar, Grid } from "@material-ui/core";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import LoadingComp from "../../components/LoadingComp";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_RESET,
  GET_ENGLISH_DATE_RESET,
  GET_LIST_FOR_PRESENT_STUDENT_RESET,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_RESET,
  GET_LIST_STUDENT_PRESENT_RESET,
  GET_SUBJECT_OPTIONS_FOR_SELECT_RESET,
  POST_LIST_STUDENT_PRESENT_RESET,
} from "./StudentMonthlyPresentSheetConstants";
import {
  getAllStudentPresentSheetDataAction,
  getEnglishDateAction,
  getListForPresentStudentAction,
  getListForUpdateStudentPresentAction,
  getListStudentPresentAction,
  getSubjectOptionsForSelectAction,
} from "./StudentMonthlyPresentSheetActions";
import DatePickerControl from "../../components/controls/DatePickerControl";
import StudentMonthlyPresentSheetTableCollapse from "./StudentMonthlyPresentSheetTableCollapse";
import StudentMonthlyPresentSheetUpdateForm from "./StudentMonthlyPresentSheetUpdateForm";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

const StudentMonthlyPresentSheet = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlSubject, setDdlSubject] = useState([]);
  const [ddlNepMonth, setDdlNepMonth] = useState([]);
  const [ddlNepYear, setDdlNepYear] = useState([]);

  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [nepMonth, setNepMonth] = useState("");
  const [nepYear, setNepYear] = useState("");
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState();

  const dispatch = useDispatch();
  const classes = useStyles();

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
    allStudentMonthlyPresentSheetData,
    error: allStudentMonthlyPresentSheetDataError,
  } = useSelector((state) => state.getAllStudentMonthlyPresentSheet);

  const { subjectOptions, error: subjectOptionsError } = useSelector(
    (state) => state.getSubjectOptionsForSelect
  );

  const { engDate, error: engDateError } = useSelector(
    (state) => state.getEnglishDate
  );

  const {
    getListStudentPresent,
    loading,
    error: getListStudentPresentError,
  } = useSelector((state) => state.getListStudentPresent);

  const {
    getListForUpdateStudentPresent,
    loading: loadingUpdate,
    error: getListForUpdateStudentPresentError,
  } = useSelector((state) => state.getListForUpdateStudentPresent);

  const { presentStudent, error: presentStudentError } = useSelector(
    (state) => state.getListForPresentStudent
  );

  const {
    success: postListStudentPresentSuccess,
    error: postListStudentPresentError,
  } = useSelector((state) => state.postListStudentPresent);

  if (allStudentMonthlyPresentSheetDataError) {
    setNotify({
      isOpen: true,
      message: allStudentMonthlyPresentSheetDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_RESET });
  }
  if (subjectOptionsError) {
    setNotify({
      isOpen: true,
      message: subjectOptionsError,
      type: "error",
    });
    dispatch({ type: GET_SUBJECT_OPTIONS_FOR_SELECT_RESET });
  }
  if (postListStudentPresentError) {
    setNotify({
      isOpen: true,
      message: postListStudentPresentError,
      type: "error",
    });
    dispatch({ type: POST_LIST_STUDENT_PRESENT_RESET });
  }
  if (postListStudentPresentSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Posted",
      type: "success",
    });
    dispatch({ type: POST_LIST_STUDENT_PRESENT_RESET });
    setOpenPopup(false);
    dispatch(
      getListStudentPresentAction(
        acaYear,
        programValue,
        classId,
        subject,
        section,
        shift,
        nepYear,
        nepMonth,
        date
      )
    );
  }
  //eng date api not working
  //   if (engDateError) {
  //     setNotify({
  //       isOpen: true,
  //       message: engDateError,
  //       type: "error",
  //     });
  //     dispatch({ type: GET_ENGLISH_DATE_RESET });
  //   }
  if (getListStudentPresentError) {
    setNotify({
      isOpen: true,
      message: getListStudentPresentError,
      type: "error",
    });
    dispatch({ type: GET_LIST_STUDENT_PRESENT_RESET });
  }
  if (getListForUpdateStudentPresentError) {
    setNotify({
      isOpen: true,
      message: getListForUpdateStudentPresentError,
      type: "error",
    });
    dispatch({ type: GET_LIST_FOR_UPDATE_STUDENT_PRESENT_RESET });
  }
  if (presentStudentError) {
    setNotify({
      isOpen: true,
      message: presentStudentError,
      type: "error",
    });
    dispatch({ type: GET_LIST_FOR_PRESENT_STUDENT_RESET });
  }

  useEffect(() => {
    if (allStudentMonthlyPresentSheetData) {
      setProgramValue(
        allStudentMonthlyPresentSheetData?.searchFilterModel
          .ddlFacultyProgramLink[0]?.Key
      );
      setDdlClass(
        allStudentMonthlyPresentSheetData?.searchFilterModel?.ddlClass
      );
      setClassId(
        allStudentMonthlyPresentSheetData?.searchFilterModel.ddlClass[0]?.Key
      );
      setAcademicYearDdl(
        allStudentMonthlyPresentSheetData?.searchFilterModel?.ddlAcademicYear
      );
      setAcaYear(
        allStudentMonthlyPresentSheetData?.searchFilterModel.ddlAcademicYear[0]
          ?.Key
      );
      setDdlShift(
        allStudentMonthlyPresentSheetData?.searchFilterModel?.ddlAcademicShift
      );
      setShift(
        allStudentMonthlyPresentSheetData?.searchFilterModel.ddlAcademicShift[0]
          ?.Key
      );
      setDdlSection(
        allStudentMonthlyPresentSheetData?.searchFilterModel?.ddlSection
      );
      setSection(
        allStudentMonthlyPresentSheetData?.searchFilterModel.ddlSection[0]?.Key
      );
      setDdlNepMonth(
        allStudentMonthlyPresentSheetData?.searchFilterModel?.ddlnpMonth
      );
      setDdlNepYear(
        allStudentMonthlyPresentSheetData?.searchFilterModel?.ddlnpYear
      );
      setDate(
        allStudentMonthlyPresentSheetData?.searchFilterModel.currentDate?.slice(
          0,
          10
        )
      );

      setNepMonth(allStudentMonthlyPresentSheetData?.searchFilterModel.npMonth);
      setNepYear(allStudentMonthlyPresentSheetData?.searchFilterModel.npYear);
      if (
        allStudentMonthlyPresentSheetData?.searchFilterModel.ddlAcademicYear
          ?.length > 0 &&
        allStudentMonthlyPresentSheetData?.searchFilterModel
          .ddlFacultyProgramLink?.length > 0 &&
        allStudentMonthlyPresentSheetData?.searchFilterModel.ddlClass?.length >
          0
      ) {
        dispatch(
          getSubjectOptionsForSelectAction(
            allStudentMonthlyPresentSheetData?.searchFilterModel
              .ddlAcademicYear[0]?.Key,
            allStudentMonthlyPresentSheetData?.searchFilterModel
              .ddlFacultyProgramLink[0]?.Key,
            allStudentMonthlyPresentSheetData?.searchFilterModel.ddlClass[0]
              ?.Key
          )
        );
      }
    }
  }, [allStudentMonthlyPresentSheetData, dispatch]);

  useEffect(() => {
    dispatch({ type: GET_LIST_STUDENT_PRESENT_RESET });
    dispatch(getAllStudentPresentSheetDataAction());
  }, []);

  useEffect(() => {
    if (subjectOptions) {
      setDdlSubject(subjectOptions);
      setSubject(subjectOptions[0]?.Key);
    }
  }, [subjectOptions]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.subject = !subject ? "This feild is required" : "";
    temp.nepMonth = !nepMonth ? "This feild is required" : "";
    temp.nepYear = !nepYear ? "This feild is required" : "";
    temp.date = !date ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSearchAttendance = () => {
    if (validate()) {
      dispatch(
        getListStudentPresentAction(
          acaYear,
          programValue,
          classId,
          subject,
          section,
          shift,
          nepYear,
          nepMonth,
          date
        )
      );
    }
  };

  const handleUpdate = () => {
    if (validate()) {
      dispatch(
        getListForUpdateStudentPresentAction(
          acaYear,
          programValue,
          classId,
          subject,
          section,
          shift,
          nepYear,
          nepMonth,
          date
        )
      );
      dispatch(getListForPresentStudentAction(date, programValue, subject));
      setOpenPopup(true);
    }
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    setSubject("");
    setDdlSubject([]);
    if ((programValue, classId)) {
      dispatch(getSubjectOptionsForSelectAction(value, programValue, classId));
    }
  };

  const handleProgramChange = (value) => {
    setProgramValue(value);
    if ((acaYear, classId)) {
      dispatch(getSubjectOptionsForSelectAction(acaYear, value, classId));
    }
    setSubject("");
    setDdlSubject([]);
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    if ((acaYear, programValue)) {
      dispatch(getSubjectOptionsForSelectAction(acaYear, programValue, value));
    }
    setSubject("");
    setDdlSubject([]);
  };

  const nepMonthHandler = (value) => {
    setNepMonth(value);
    if (nepYear) {
      dispatch(getEnglishDateAction(nepYear, value));
    }
  };
  const nepYearHandler = (value) => {
    setNepYear(value);
    if (nepMonth) {
      dispatch(getEnglishDateAction(value, nepMonth));
    }
  };

  useEffect(() => {
    if (engDate) {
      setDate(engDate?.Key);
    }
  }, [engDate]);

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
                errors={errors.acaYear}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => handleProgramChange(e.target.value)}
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
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                options={ddlShift ? ddlShift : test}
                errors={errors.shift}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                options={ddlSection ? ddlSection : test}
                errors={errors.section}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Sujbect"
                label="Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                options={ddlSubject ? ddlSubject : test}
                errors={errors.subject}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="NepaliMonth"
                label="Nepali Month"
                value={nepMonth}
                onChange={(e) => nepMonthHandler(e.target.value)}
                options={ddlNepMonth ? ddlNepMonth : test}
                errors={errors.nepMonth}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="NepaliYear"
                label="Nepali Year"
                value={nepYear}
                onChange={(e) => nepYearHandler(e.target.value)}
                options={ddlNepYear ? ddlNepYear : test}
                errors={errors.nepYear}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  name="CurrentYear"
                  label="Current Date"
                  value={date}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    setDate(newDate?.toLocaleDateString()?.slice(0, 10));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleUpdate}
              >
                UPDATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleSearchAttendance}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {getListStudentPresent && (
              <StudentMonthlyPresentSheetTableCollapse
                students={getListStudentPresent && getListStudentPresent}
                fromDate={
                  getListStudentPresent &&
                  getListStudentPresent.searchFilterModel.fromDate
                }
              />
            )}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
        {loadingUpdate ? (
          <LoadingComp />
        ) : (
          <>
            <StudentMonthlyPresentSheetUpdateForm
              students={
                getListForUpdateStudentPresent && getListForUpdateStudentPresent
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

export default StudentMonthlyPresentSheet;
