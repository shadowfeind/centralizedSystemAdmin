import React, { useEffect, useState } from "react";
import { Button, makeStyles, Toolbar, Grid } from "@material-ui/core";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  getEventForExamMarkAction,
  getExamLedgerHeaderAction,
  getExamResultListAction,
  getInitialExamResultDataAction,
  getStudentOptionsForExamMarkAction,
  printExamResultAction,
  printExamResultCountAction,
  printFinalResultAction,
} from "./ExamResultActions";
import {
  GET_EVENT_FOR_EXAM_MARK_RESET,
  GET_EXAM_LEDGER_HEADER_RESET,
  GET_EXAM_RESULT_LIST_RESET,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_RESET,
  PRINT_EXAM_RESULT_COUNT_RESET,
  PRINT_EXAM_RESULT_RESET,
  PRINT_FINAL_RESULT_RESET,
} from "./ExamResultConstants";
import ExamResultTableCollapse from "./ExamResultTableCollapse";
import ExamResultModel from "./ExamResultModel";
import ExamAnnualResultTable from "./ExamAnnualResultTable";
import DatePickerControl from "../../components/controls/DatePickerControl";
import FinalExamResult from "./FinalExamResult";
import ExamResultWithMarksModel from "./ExamResultWithMarksModel";
import ExamResultCount from "./ExamResultCount";
import LoadingComp from "../../components/LoadingComp";
import {
  getHeaderBannerAction,
  getPrincipleSignatureAction,
} from "../../dashboard/DashboardActions";
import { GET_HEADER_BANNER_RESET } from "../../dashboard/DashboardConstants";

// NOTE
//exam ledger header is exam ledger
//NOTE
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

const ExamResult = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [ddlStudent, setDdlStudent] = useState([]);
  const [ddlNpYear, setDdlNpYear] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [event, setEvent] = useState("");
  const [student, setStudent] = useState(0);
  const [date, setDate] = useState();
  const [dateValue, setDateValue] = useState();
  const [npYear, setNpYear] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupResultMark, setOpenPopupResultMark] = useState(false);
  const [openPopupFinal, setOpenPopupFinal] = useState(false);
  const [openPopupCount, setOpenPopupCount] = useState(false);
  const [showDataTable, setShowDatatable] = useState(false); //to avoid data changing when chaning select control
  const [showAnnualLedger, setShowAnnualLedger] = useState(false);
  const [showValue, setShowValue] = useState(0);

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

  const { examResultInitialDatas } = useSelector(
    (state) => state.getInitialExamResultData
  );

  const { allEventsForExamMark, success: getExamMarkEventSuccess } =
    useSelector((state) => state.getEventForExamMark);

  const {
    studentOptionsForExamMark,
    success: studentOptionsForExamMarkSuccess,
  } = useSelector((state) => state.getInitialExamResultStudentOptions);

  const {
    examResultList,
    error: getexamResultListError,
    loading: getExamResultListLoading,
  } = useSelector((state) => state.getExamResultList);
  const {
    printExamResult,
    error: printExamResultError,
    success: printExamResultSuccess,
    loading: printExamResultLoading,
  } = useSelector((state) => state.printExamResult);
  const {
    examLedgerHeader,
    error: examLedgerHeaderError,
    loading: getExamLedgerHeaderLoading,
  } = useSelector((state) => state.getExamLedgerHeader);
  const {
    printFinalResult,
    error: printFinalResultError,
    success: printFinalResultSuccess,
    loading: printFinalResultLoading,
  } = useSelector((state) => state.printFinalResult);
  const {
    printExamResultCount,
    error: printExamResultCountError,
    success: printExamResultCountSuccess,
    loading: printExamResultCountLoading,
  } = useSelector((state) => state.printExamResultCount);

  const { headerBanners, error: headerBannersError } = useSelector(
    (state) => state.getHeaderBanner
  );
  const { principleSignature, error: getPrincipleSignatureError } = useSelector(
    (state) => state.getPrincipleSignature
  );

  useEffect(() => {
    if (!headerBanners) {
      dispatch(getHeaderBannerAction());
    }
  }, [headerBanners, dispatch]);

  useEffect(() => {
    if (!principleSignature) {
      dispatch(getPrincipleSignatureAction());
    }
  }, [principleSignature, dispatch]);

  if (headerBannersError) {
    dispatch({ type: GET_HEADER_BANNER_RESET });
    setNotify({
      isOpen: true,
      message: headerBannersError,
      type: "error",
    });
  }

  if (getexamResultListError) {
    setNotify({
      isOpen: true,
      message: getexamResultListError,
      type: "error",
    });
    dispatch({ type: GET_EXAM_RESULT_LIST_RESET });
  }
  if (printExamResultCountError) {
    setNotify({
      isOpen: true,
      message: printExamResultCountError,
      type: "error",
    });
    dispatch({ type: PRINT_EXAM_RESULT_COUNT_RESET });
  }
  if (printFinalResultError) {
    setNotify({
      isOpen: true,
      message: printFinalResultError,
      type: "error",
    });
    dispatch({ type: PRINT_FINAL_RESULT_RESET });
  }
  if (examLedgerHeaderError) {
    setNotify({
      isOpen: true,
      message: examLedgerHeaderError,
      type: "error",
    });
    dispatch({ type: GET_EXAM_LEDGER_HEADER_RESET });
  }
  if (printExamResultError) {
    setNotify({
      isOpen: true,
      message: printExamResultError,
      type: "error",
    });
    dispatch({ type: PRINT_EXAM_RESULT_RESET });
  }

  // if (getExamMarkEventSuccess) {
  //   setDdlEvent(allEventsForExamMark);
  //   dispatch({ type: GET_EVENT_FOR_EXAM_MARK_RESET });
  // }

  if (studentOptionsForExamMarkSuccess) {
    setDdlStudent(studentOptionsForExamMark);
    setStudent(studentOptionsForExamMark[0]?.Key);
    dispatch({ type: GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (examResultInitialDatas) {
      setProgramValue(
        examResultInitialDatas?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setDdlClass(examResultInitialDatas?.searchFilterModel.ddlClass);
      setClassId(examResultInitialDatas?.searchFilterModel.ddlClass[0]?.Key);
      setAcademicYearDdl(
        examResultInitialDatas?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        examResultInitialDatas?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setDdlShift(examResultInitialDatas?.searchFilterModel.ddlAcademicShift);
      setShift(
        examResultInitialDatas?.searchFilterModel.ddlAcademicShift[0]?.Key
      );
      setDdlSection(examResultInitialDatas?.searchFilterModel.ddlSection);
      setSection(examResultInitialDatas?.searchFilterModel.ddlSection[0]?.Key);
      setDdlNpYear(examResultInitialDatas?.searchFilterModel.ddlnpYear);
      setNpYear(examResultInitialDatas?.searchFilterModel.npYear);
      setDate(
        examResultInitialDatas?.searchFilterModel?.StartDate?.slice(0, 10)
      );
      setDateValue(
        examResultInitialDatas?.searchFilterModel?.StartDate?.slice(0, 10)
      );
      dispatch(
        getEventForExamMarkAction(
          examResultInitialDatas?.searchFilterModel.ddlAcademicYear[0]?.Key,
          examResultInitialDatas?.searchFilterModel.ddlFacultyProgramLink[0]
            ?.Key,
          examResultInitialDatas?.searchFilterModel.ddlClass[0]?.Key
        )
      );
      dispatch(
        getStudentOptionsForExamMarkAction(
          examResultInitialDatas?.searchFilterModel.ddlAcademicYear[0]?.Key,
          examResultInitialDatas?.searchFilterModel.ddlFacultyProgramLink[0]
            ?.Key,
          examResultInitialDatas?.searchFilterModel.ddlClass[0]?.Key,
          examResultInitialDatas?.searchFilterModel.ddlSection[0]?.Key,
          examResultInitialDatas?.searchFilterModel.ddlAcademicShift[0]?.Key
        )
      );
    }
  }, [examResultInitialDatas, dispatch]);

  useEffect(() => {
    setDdlEvent([]);
    dispatch({ type: GET_EXAM_RESULT_LIST_RESET });
    dispatch(getInitialExamResultDataAction());
  }, []);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";
    temp.npYear = !npYear ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleDate = (date) => {
    if (date) {
      setDateValue(date);
      const newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
      setDate(newDate);
    }
  };

  const handleYearChange = (value) => {
    setShowDatatable(false);
    setAcaYear(value);
    setDdlEvent([]);
    setEvent("");
    if (classId) {
      dispatch(getEventForExamMarkAction(value, programValue, classId));
      dispatch(
        getStudentOptionsForExamMarkAction(
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
    setShowDatatable(false);
    setDdlEvent([]);
    setDdlStudent([]);
    setStudent("");
    setClassId(value);
    setEvent("");
    dispatch(getEventForExamMarkAction(acaYear, programValue, value));
    dispatch(
      getStudentOptionsForExamMarkAction(
        acaYear,
        programValue,
        value,
        section,
        shift
      )
    );
  };

  const handleShiftChange = (value) => {
    setShift(value);
    setShowDatatable(false);
    setDdlEvent([]);
    setEvent("");
    setDdlStudent([]);
    setStudent("");
    // if ((acaYear,programValue, classId, value)) {
    dispatch(getEventForExamMarkAction(acaYear, programValue, classId, value));
    // }
    // if((acaYear,programValue, classId, shift,section,event,value)){
    dispatch(
      getStudentOptionsForExamMarkAction(
        acaYear,
        programValue,
        classId,
        section,
        value
      )
    );
    // }
  };

  const handleSectionChange = (value) => {
    setSection(value);
    setShowDatatable(false);
    setDdlEvent([]);
    setEvent("");
    setDdlStudent([]);
    setStudent("");
    // if ((acaYear, programValue, classId, shift, value)) {
    dispatch(
      getEventForExamMarkAction(acaYear, programValue, classId, shift, value)
    );
    // }
    // if ((acaYear, programValue, classId, shift, value)) {
    dispatch(
      getStudentOptionsForExamMarkAction(
        acaYear,
        programValue,
        classId,
        value,
        shift
      )
    );
    // }
  };

  const studentHandler = (value) => {
    setShowDatatable(false);
    setStudent(value);
  };

  useEffect(() => {
    if (allEventsForExamMark) {
      setDdlEvent(allEventsForExamMark);
      setEvent(allEventsForExamMark[0]?.Key);
    }
    if (allEventsForExamMark?.length === 0) {
      setDdlStudent([]);
      setStudent("");
    }
  }, [allEventsForExamMark]);

  const eventHandler = (value) => {
    setShowDatatable(false);
    setEvent(value);
  };

  const handleLedgerSearch = () => {
    setShowAnnualLedger(false);
    if (validate()) {
      dispatch(
        getExamResultListAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student,
          date,
          npYear
        )
      );
      setShowDatatable(true);
    }
  };

  const handleBulkPrint = () => {
    setShowDatatable(false);
    setShowAnnualLedger(false);
    if (
      validate(acaYear, programValue, classId, section, shift, event, student)
    ) {
      dispatch(
        printExamResultAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student,
          date,
          npYear
        )
      );
      setShowValue(1);
    }
  };

  const handleAnnualLedgerSearch = () => {
    if (validate()) {
      dispatch(
        getExamLedgerHeaderAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student,
          date,
          npYear
        )
      );
      setShowDatatable(false);
      setShowAnnualLedger(true);
    }
  };

  const handleResultWithMarks = () => {
    if (validate()) {
      dispatch(
        printExamResultAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student,
          date,
          npYear
        )
      );
      setShowValue(2);
    }
  };

  const handleCountPrint = () => {
    if (validate()) {
      {
        dispatch(
          printExamResultCountAction(
            acaYear,
            programValue,
            classId,
            section,
            shift,
            event,
            student,
            npYear
          )
        );
      }
    }
  };

  const handlePrintFinalResult = () => {
    if (validate()) {
      dispatch(
        printFinalResultAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student,
          date,
          npYear
        )
      );
    }
  };

  useEffect(() => {
    if (printExamResultSuccess & (showValue === 1)) {
      setOpenPopup(true);
    }
    if (printExamResultSuccess & (showValue === 2)) {
      setOpenPopupResultMark(true);
    }
  }, [printExamResultSuccess, showValue]);

  useEffect(() => {
    if (printFinalResultSuccess) {
      setOpenPopupFinal(true);
    }
  }, [printFinalResultSuccess]);

  useEffect(() => {
    if (printExamResultCountSuccess) {
      setOpenPopupCount(true);
    }
  }, [printExamResultCountSuccess]);
  useEffect(() => {
    setOpenPopupCount(false);
    setOpenPopupFinal(false);
    dispatch({ type: PRINT_EXAM_RESULT_COUNT_RESET });
  }, []);
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
                onChange={(e) => handleShiftChange(e.target.value)}
                options={ddlShift}
                errors={errors.shift1}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => handleSectionChange(e.target.value)}
                options={ddlSection}
                errors={errors.section}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => eventHandler(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
                errors={errors.event}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Student"
                label="Student"
                value={student}
                onChange={(e) => studentHandler(e.target.value)}
                options={ddlStudent ? ddlStudent : test}
                errors={errors.student}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="npYear"
                label="Nepali Academic Year"
                value={npYear}
                onChange={(e) => setNpYear(e.target.value)}
                options={ddlNpYear ? ddlNpYear : test}
                errors={errors.npYear}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <DatePickerControl
                name="DOJ"
                label="Pick Exam Date"
                value={dateValue}
                onChange={(e) => handleDate(e.target.value)}
                errors={errors.date}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleLedgerSearch}
              >
                SEARCH
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkPrint}
              >
                PRINT RESULT WITH GRADES
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleResultWithMarks}
              >
                PRINT RESULT WITH MARKS
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleAnnualLedgerSearch}
              >
                ANNUAL LEDGER
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handlePrintFinalResult}
              >
                PRINT FINAL RESULT
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCountPrint}
              >
                PRINT EXAM COUNT
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {printExamResultLoading && <LoadingComp />}
        {printFinalResultLoading && <LoadingComp />}
        {printExamResultCountLoading && <LoadingComp />}
        {getExamResultListLoading ? (
          <LoadingComp />
        ) : (
          examResultList && (
            <ExamResultTableCollapse
              ledgerHeader={
                examResultList &&
                examResultList.ddlAcademicFacultySubjectLinkSubModel
              }
              student={examResultList && examResultList.dbModelLst}
              mark={examResultList && examResultList.dbMarkModelLst}
              showDataTable={showDataTable}
              result={examResultList && examResultList.dbModelResultLst}
              rank={examResultList && examResultList.dbModelRankLst}
              searchFilterModel={
                examResultList && examResultList.searchFilterModel
              }
              currentClass={ddlClass && ddlClass}
              currentSection={ddlSection && ddlSection}
              schoolName={examResultList && examResultList.SchoolShortName}
              date={dateValue && dateValue}
              year={academicYearDdl && academicYearDdl}
            />
          )
        )}
        {getExamLedgerHeaderLoading ? (
          <LoadingComp />
        ) : (
          showAnnualLedger && (
            <ExamAnnualResultTable
              ledgerData={examLedgerHeader}
              date={dateValue && dateValue}
              year={academicYearDdl && academicYearDdl}
            />
          )
        )}
      </CustomContainer>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="">
        <ExamResultModel
          headerBanners={headerBanners && headerBanners}
          examReport={printExamResult && printExamResult}
          principleSignature={principleSignature && principleSignature}
          setOpenPopup={setOpenPopup}
          date={dateValue && dateValue}
        />
      </Popup>
      <Popup
        openPopup={openPopupResultMark}
        setOpenPopup={setOpenPopupResultMark}
        title=""
      >
        <ExamResultWithMarksModel
          headerBanners={headerBanners && headerBanners}
          examReport={printExamResult && printExamResult}
          setOpenPopupResultMark={setOpenPopupResultMark}
          principleSignature={principleSignature && principleSignature}
          date={dateValue && dateValue}
        />
      </Popup>
      <Popup
        openPopup={openPopupFinal}
        setOpenPopup={setOpenPopupFinal}
        title=""
      >
        <FinalExamResult
          headerBanners={headerBanners && headerBanners}
          result={printFinalResult}
          setOpenPopupFinal={setOpenPopupFinal}
          principleSignature={principleSignature && principleSignature}
          date={dateValue && dateValue}
        />
      </Popup>
      <Popup
        openPopup={openPopupCount}
        setOpenPopup={setOpenPopupCount}
        title=""
      >
        <ExamResultCount
          headerBanners={headerBanners && headerBanners}
          result={printExamResultCount && printExamResultCount}
          setOpenPopupCount={setOpenPopupCount}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ExamResult;
