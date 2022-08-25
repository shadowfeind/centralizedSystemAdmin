import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import LoadingComp from "../../../components/LoadingComp";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import {
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_RESET,
  GET_INITIAL_STUDENT_ID_CARD_DATA_RESET,
  GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_RESET,
} from "./StudentIdCardConstants";
import {
  getActiveStudentsForStudentIdCardDataAction,
  getInitialStudentIdCardDataAction,
  getPrintBulkStudentsForStudentIdCardDataAction,
} from "./StudentIdCardActions";
import { getActiveStudentsForAdmitCardDataAction } from "../../../examination/printAdminCard/PrintAdminCardActions";
import { GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET } from "../../../examination/printAdminCard/PrintAdminCardConstants";
import StudentCardDesign from "./StudentCardDesign";
import StudentCardPrintDesign from "./StudentIdCardPrint";
import StudentCardPrint from "./StudentIdCardPrint";
import StudentIdCardPrint from "./StudentIdCardPrint";
import { getHeaderBannerAction } from "../../../dashboard/DashboardActions";
import { GET_HEADER_BANNER_RESET } from "../../../dashboard/DashboardConstants";

//getActiveStudentsForAdmitCardDataAction is used from admitCard actions to fetch student lists
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

const StudentIdCard = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlStudent, setDdlStudent] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [student, setStudent] = useState("");
  const [date, setDate] = useState();
  const [dateValue, setDateValue] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const classes = useStyles();

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { studentIdCardInitialData, error } = useSelector(
    (state) => state.getInitialStudentIdCardData
  );

  const {
    activeStudentsForAdmitCard,
    success: activeStudentsForAdmitCardSuccess,
  } = useSelector((state) => state.getActiveStudentsForAdmitCardData);

  const { activeStudentsForIdCard, loading } = useSelector(
    (state) => state.getActiveStudentsForStudentIdCardData
  );

  const {
    printBulkStudentsForIdCard,
    loading: loadingBulk,
    printBulkStudentsForIdCardError,
  } = useSelector((state) => state.getPrintBulkStudentsForStudentIdCardData);

  const { headerBanners, error: headerBannersError } = useSelector(
    (state) => state.getHeaderBanner
  );

  useEffect(() => {
    if (!headerBanners) {
      dispatch(getHeaderBannerAction());
    }
  }, [headerBanners, dispatch]);

  if (headerBannersError) {
    dispatch({ type: GET_HEADER_BANNER_RESET });
    setNotify({
      isOpen: true,
      message: headerBannersError,
      type: "error",
    });
  }

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_INITIAL_STUDENT_ID_CARD_DATA_RESET });
  }

  // if (activeStudentsForAdmitCardSuccess) {
  //   setDdlStudent(activeStudentsForAdmitCard);
  //   dispatch({ type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET });
  // }

  if (printBulkStudentsForIdCardError) {
    setNotify({
      isOpen: true,
      message: printBulkStudentsForIdCardError,
      type: "error",
    });
    dispatch({ type: GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_RESET });
  }

  useEffect(() => {
    if (studentIdCardInitialData) {
      setProgramValue(
        studentIdCardInitialData?.searchFilterModel.ddlFacultyProgramLink[0]
          ?.Key
      );
      setDdlClass(studentIdCardInitialData?.searchFilterModel.ddlClass);
      setClassId(studentIdCardInitialData?.searchFilterModel.ddlClass[0]?.Key);
      setAcademicYearDdl(
        studentIdCardInitialData?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        studentIdCardInitialData?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setDdlShift(studentIdCardInitialData?.searchFilterModel.ddlAcademicShift);
      setShift(
        studentIdCardInitialData?.searchFilterModel.ddlAcademicShift[0]?.Key
      );
      setDdlSection(studentIdCardInitialData?.searchFilterModel.ddlSection);
      setSection(
        studentIdCardInitialData?.searchFilterModel.ddlSection[0]?.Key
      );
      setDate(
        studentIdCardInitialData.searchFilterModel.ValidityDate?.slice(0, 10)
      );
      if (
        studentIdCardInitialData?.searchFilterModel.ddlAcademicYear?.length > 0
      ) {
        dispatch(
          getActiveStudentsForAdmitCardDataAction(
            studentIdCardInitialData?.searchFilterModel.ddlAcademicYear[0]?.Key,
            studentIdCardInitialData?.searchFilterModel.ddlFacultyProgramLink[0]
              ?.Key,
            studentIdCardInitialData?.searchFilterModel.ddlClass[0]?.Key,
            studentIdCardInitialData?.searchFilterModel.ddlSection[0]?.Key,
            studentIdCardInitialData?.searchFilterModel.ddlAcademicShift[0]?.Key
          )
        );
      }
    }
  }, [studentIdCardInitialData, dispatch]);

  useEffect(() => {
    dispatch({ type: GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_RESET });
    dispatch(getInitialStudentIdCardDataAction());
  }, []);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    // temp.student = !student ? "This feild is required" : "";
    temp.date =
      date.toString() === "Invalid Date"
        ? "Invalid Date"
        : !date
        ? "Date is required"
        : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSection = (value) => {
    setSection(value);
    setDdlStudent([]);
    setStudent("");
    if ((acaYear, programValue, classId, shift)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          acaYear,
          programValue,
          classId,
          value,
          shift
        )
      );
    }
  };
  const handleYearChange = (value) => {
    setAcaYear(value);
    setDdlStudent([]);
    setStudent("");
    if ((programValue, classId, shift)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          value,
          programValue,
          classId,
          section,
          shift
        )
      );
    }
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    setDdlStudent([]);
    setStudent("");
    if ((programValue, acaYear, shift)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          acaYear,
          programValue,
          value,
          section,
          shift
        )
      );
    }
  };

  const handleShift = (value) => {
    setShift(value);
    setDdlStudent([]);
    setStudent("");
    if ((programValue, acaYear, classId)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          acaYear,
          programValue,
          classId,
          section,
          value
        )
      );
    }
  };

  const handleDate = (date) => {
    setDate(date);
  };

  const handleStudentSearch = () => {
    if (validate()) {
      dispatch(
        getActiveStudentsForStudentIdCardDataAction(
          acaYear,
          programValue,
          classId,
          shift,
          student,
          section,
          date?.slice(0, 10)
        )
      );
    }
  };
  const handleBulkPrint = () => {
    if (validate()) {
      dispatch(
        getPrintBulkStudentsForStudentIdCardDataAction(
          acaYear,
          programValue,
          classId,
          shift,
          student,
          section,
          date?.slice(0, 10)
        )
      );
      setOpenPopup(true);
    }
  };

  useEffect(() => {
    if (activeStudentsForAdmitCardSuccess) {
      setDdlStudent(activeStudentsForAdmitCard);
      setStudent(activeStudentsForAdmitCard[0]?.Key);
    }
  }, [activeStudentsForAdmitCard]);

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
                options={academicYearDdl}
                errors={errors.acaYear}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => handleProgramValue(e.target.value)}
                options={programDdl}
                errors={errors.programValue}
              />
            </Grid> */}
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => handleShift(e.target.value)}
                options={ddlShift}
                errors={errors.shift1}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => handleSection(e.target.value)}
                options={ddlSection}
                errors={errors.section}
              />
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Student"
                label="Student"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                options={ddlStudent ? ddlStudent : test}
                // errors={errors.student}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <DatePickerControl
                name="DOJ"
                label="Pick Exam Date"
                value={date}
                onChange={(e) => handleDate(e.target.value)}
                errors={errors.date}
              />
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkPrint}
              >
                BULK PRINT
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
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {activeStudentsForIdCard && (
              <Grid container style={{ fontSize: "12px" }}>
                {activeStudentsForIdCard.dbModelLst.map((student) => (
                  <StudentCardDesign
                    key={student.$id}
                    student={student}
                    classname={activeStudentsForIdCard?.ddlClass}
                    section={activeStudentsForIdCard?.ddlSection}
                    examDate={date}
                    headerBanners={headerBanners && headerBanners}
                  />
                ))}
              </Grid>
            )}
          </>
        )}
      </CustomContainer>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        {loadingBulk ? (
          <LoadingComp />
        ) : (
          <>
            {printBulkStudentsForIdCard && (
              <Grid container style={{ fontSize: "12px" }}>
                {printBulkStudentsForIdCard.dbModelLst.map((student) => (
                  <StudentIdCardPrint
                    key={student.$id}
                    headerBanners={headerBanners && headerBanners}
                    studentId={student}
                    classnames={printBulkStudentsForIdCard?.ddlClass}
                    section={printBulkStudentsForIdCard?.ddlSection}
                    examDates={date}
                  />
                ))}
              </Grid>
            )}
          </>
        )}
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      {/* <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      /> */}
    </>
  );
};

export default StudentIdCard;
