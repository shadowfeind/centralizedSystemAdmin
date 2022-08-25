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
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import Popup from "../../components/Popup";
import LoadingComp from "../../components/LoadingComp";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  getAllSchoolValueAction,
  getBulkExamApprovalBlankDataAction,
  getBulkExamApprovalSearchDataAction,
  getExamApprovalScheduleHeaderAction,
  getExamApprovalSearchDataAction,
  getInitialExamApprovalDataAction,
} from "./ExamMarkApprovalActions";
import {
  getEventAction,
  getEventScheduleAction,
  getExamEntryBulkAction,
} from "../examMarkEntry/ExamMarkEntryActions";
import {
  GET_EVENT_RESET,
  GET_EXAM_SCHEDULE_HEADER_RESET,
} from "../examMarkEntry/ExamMarkEntryConstants";
import ExamMarkApprovalTableCollapse from "./ExamMarkApprovalTableCollapse";
import ExamMarkApprovalBulk from "./ExamMarkApprovalBulk";
import {
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_RESET,
  GET_ALL_SCHOOL_VALUE_RESET,
  GET_EXAM_APPROVAL_SCHEULE_HEADER_RESET,
  POST_BULK_EXAM_APPROVAL_RESET,
} from "./ExamMarkApprovalConstants";
import ExamMarkApprovalBulkBlank from "./ExamMarkApprovalBulkBlank";
import ExamMarkApprovalBlankForm from "./ExamMarkApprovalBlankForm";

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
  { id: "FullName", label: "Student Name" },
  { id: "SubjectName", label: "Subject" },
  { id: "FullMark", label: "Full Marks(TH)" },
  { id: "FullMarkPractical", label: "Full Marks(PR)" },
  { id: "ObtainedMark", label: "ObtainedMark(TH)" },
  { id: "ObtainedMarkPractical", label: "ObtainedMark(PR)" },
  // { id: "Divsion", label: "Division" },
  { id: "Updated_On", label: "Updated On" },
  { id: "Status", label: "Status" },
];

/*
 * get event name , exam schedule and getBulk has same api
 * as exam mark entry so i have used same reducers and actions
 */

const ExamMarkApproval = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [ddlSchedule, setDdlSchedule] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [event, setEvent] = useState("");
  const [schedule, setSchedule] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openBulkPopup, setOpenBulkPopup] = useState(false);
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
            x.FullName?.toLowerCase()?.includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { examApprovalInitialDatas } = useSelector(
    (state) => state.getInitialExamApprovalData
  );

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const { allSchedule, success: getScheduleSuccess } = useSelector(
    (state) => state.getEventSchedule
  );

  const { scheduleHeader, error: scheduleHeaderError } = useSelector(
    (state) => state.getExamApprovalScheduleHeader
  );

  const { searchData, loading } = useSelector(
    (state) => state.getExamApprovalSearchData
  );

  const { bulkData, loading: loadingBulk } = useSelector(
    (state) => state.getBulkExamApprovalSearchData
  );

  const { bulkBlankData } = useSelector(
    (state) => state.getBulkExamApprovalBlankData
  );

  const {
    success: postBulkExamApprovalSuccess,
    error: postBulkExamApprovalError,
  } = useSelector((state) => state.postBulkExamApproval);

  const { schoolValue, error: schoolValueError } = useSelector(
    (state) => state.getAllSchoolValue
  );

  if (schoolValueError) {
    setNotify({
      isOpen: true,
      message: schoolValueError,
      type: "error",
    });
    dispatch({ type: GET_ALL_SCHOOL_VALUE_RESET });
    setOpenPopup(false);
  }
  // if (getEventSuccess) {
  //   setDdlEvent(allEvents);
  //   dispatch({ type: GET_EVENT_RESET });
  // }

  // if (scheduleHeader) {
  //   setDdlSchedule(scheduleHeader);
  //   dispatch({ type: GET_EXAM_APPROVAL_SCHEULE_HEADER_RESET });
  // }
  if (postBulkExamApprovalSuccess) {
    setNotify({
      isOpen: true,
      message: "Succesfully Edited",
      type: "success",
    });
    dispatch({ type: POST_BULK_EXAM_APPROVAL_RESET });
    dispatch(
      getExamApprovalSearchDataAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event,
        schedule
      )
    );
    setOpenPopup(false);
  }
  if (postBulkExamApprovalError) {
    setNotify({
      isOpen: true,
      message: postBulkExamApprovalError,
      type: "error",
    });
    dispatch({ type: POST_BULK_EXAM_APPROVAL_RESET });
    setOpenPopup(false);
  }

  // const handleProgramValue = (value) => {
  //   setProgramValue(value);
  //   if ((acaYear, value, classId, shift)) {
  //     dispatch(
  //       getExamApprovalScheduleHeaderAction(value, acaYear, classId, shift)
  //     );
  //   }
  // };

  const handleClassIdChange = (value) => {
    setClassId(value);
    setDdlEvent([]);
    setEvent("");
    setSchedule("");
    setDdlSchedule([]);
    dispatch(getEventAction(acaYear, programValue, value, shift));
  };

  const handleShift = (value) => {
    setShift(value);
    setDdlSchedule([]);
    setSchedule("");
    setEvent("");
    setDdlEvent([]);
    dispatch(
      getEventAction(acaYear, programValue, classId, shift, section, value)
    );
    if ((acaYear, programValue, classId, section)) {
      dispatch(
        getExamApprovalScheduleHeaderAction(
          acaYear,
          programValue,
          classId,
          shift,
          section,
          event,
          value
        )
      );
    }
  };

  const handleSection = (value) => {
    setSection(value);
    setDdlSchedule([]);
    setSchedule("");
    setEvent("");
    setDdlEvent([]);
    if (section) {
      dispatch(getEventAction(acaYear, programValue, classId, shift, value));
    }
    if ((acaYear, programValue, classId, shift)) {
      dispatch(
        getExamApprovalScheduleHeaderAction(
          acaYear,
          programValue,
          classId,
          shift,
          value
        )
      );
    }
  };
  const handleYearChange = (value) => {
    setAcaYear(value);
    if (classId) {
      dispatch(getEventAction(value, programValue, classId, shift));
    }
    if (event) {
      setEvent("");
    }
    setDdlEvent([]);
    setSchedule("");
    setDdlSchedule([]);
  };

  const handleSchedule = (value) => {
    setSchedule(value);
  };

  const eventHandler = (value) => {
    setEvent(value);
    dispatch(
      getExamApprovalScheduleHeaderAction(
        acaYear,
        programValue,
        classId,
        section,
        value
      )
    );
    if (schedule) {
      setSchedule("");
    }
    setDdlSchedule([]);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (examApprovalInitialDatas) {
      setProgramValue(
        examApprovalInitialDatas?.searchFilterModel.ddlFacultyProgramLink[0]
          ?.Key
      );
      setDdlClass(examApprovalInitialDatas?.searchFilterModel.ddlClass);
      setClassId(examApprovalInitialDatas?.searchFilterModel.ddlClass[0]?.Key);
      setAcademicYearDdl(
        examApprovalInitialDatas?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        examApprovalInitialDatas?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setDdlShift(examApprovalInitialDatas?.searchFilterModel.ddlAcademicShift);
      setShift(
        examApprovalInitialDatas?.searchFilterModel.ddlAcademicShift[0]?.Key
      );
      setDdlSection(examApprovalInitialDatas?.searchFilterModel.ddlSection);
      setSection(
        examApprovalInitialDatas?.searchFilterModel.ddlSection[0]?.Key
      );
      dispatch(
        getEventAction(
          examApprovalInitialDatas?.searchFilterModel.ddlAcademicYear[0]?.Key,
          examApprovalInitialDatas?.searchFilterModel.ddlFacultyProgramLink[0]
            ?.Key,
          examApprovalInitialDatas?.searchFilterModel.ddlClass[0]?.Key,
          examApprovalInitialDatas?.searchFilterModel.ddlAcademicShift[0]?.Key
        )
      );
    }
  }, [examApprovalInitialDatas, dispatch]);

  useEffect(() => {
    setDdlEvent([]);
    dispatch({ type: GET_ALL_EXAM_APPROVAL_SEARCHDATA_RESET });
    dispatch(getInitialExamApprovalDataAction());
  }, []);

  useEffect(() => {
    if (allEvents) {
      setDdlEvent(allEvents);
      setEvent(allEvents[0]?.Key);
      dispatch(
        getExamApprovalScheduleHeaderAction(
          acaYear,
          programValue,
          classId,
          section,
          allEvents[0]?.Key
        )
      );
    }
  }, [allEvents]);

  useEffect(() => {
    if (scheduleHeader) {
      setDdlSchedule(scheduleHeader);
      setSchedule(scheduleHeader[0]?.Key);
    }
  }, [scheduleHeader]);

  useEffect(() => {
    dispatch(getAllSchoolValueAction());
  }, []);

  useEffect(() => {
    if (searchData) {
      setTableData(searchData.dbModelLsts);
    }
  }, [searchData]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";
    temp.schedule = !schedule ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleExamApprovalSearch = () => {
    if (validate()) {
      dispatch(
        getExamApprovalSearchDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          schedule
        )
      );
    }
  };

  const handleBulkEdit = () => {
    if (validate()) {
      dispatch(
        getBulkExamApprovalSearchDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          schedule
        )
      );
      setOpenPopup(true);
    }
  };

  const handleBulkBlankData = () => {
    if (validate()) {
      dispatch(
        getBulkExamApprovalBlankDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          schedule
        )
      );

      setOpenBulkPopup(true);
    }
  };

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
                name="ExamScheduleHeader"
                label="Exam Schedule Header"
                value={schedule}
                onChange={(e) => handleSchedule(e.target.value)}
                options={ddlSchedule ? ddlSchedule : test}
                errors={errors.schedule}
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
                onClick={handleBulkBlankData}
              >
                PRINT BLANK
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleExamApprovalSearch}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Exam Mark Entry/Update By Student Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {searchData && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item) => (
                    <ExamMarkApprovalTableCollapse item={item} key={item.$id} />
                  ))}
                </TableBody>
              </TableContainer>
            )}

            {searchData && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Exam Marks Entry/Update"
      >
        {loadingBulk ? (
          <LoadingComp />
        ) : (
          <>
            <ExamMarkApprovalBulk
              subjectName={bulkData && bulkData?.dbModelLsts}
              statusData={
                bulkData && bulkData?.searchFilterModel.ddlStudentExamStatus
              }
              search={bulkData && bulkData?.searchFilterModel}
              bulkData={bulkData && bulkData?.dbModelLsts}
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openBulkPopup}
        setOpenPopup={setOpenBulkPopup}
        title="Bulk Print"
      >
        <ExamMarkApprovalBlankForm
          year={acaYear && acaYear}
          yearDdl={
            examApprovalInitialDatas &&
            examApprovalInitialDatas?.searchFilterModel?.ddlAcademicYear
          }
          address={schoolValue && schoolValue?.FullAddress}
          schoolValue={schoolValue && schoolValue?.SchoolName}
          blankData={bulkBlankData && bulkBlankData}
          setOpenPopup={setOpenBulkPopup}
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

export default ExamMarkApproval;
