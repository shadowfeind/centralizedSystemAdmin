import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
  getActiveStudentsForAdmitCardDataAction,
  getInitialStudentRegistrationDataAction,
  printStudentsAdmitCardDataAction,
  searchStudentsForAdmitCardDataAction,
} from "./PrintAdminCardActions";
import { getEventAction } from "../examMarkEntry/ExamMarkEntryActions";
import { GET_EVENT_RESET } from "../examMarkEntry/ExamMarkEntryConstants";
import {
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_RESET,
} from "./PrintAdminCardConstants";
import PrintAdminCardTableCollapse from "./PrintAdminCardTableCollapse";
import DatePickerControl from "../../components/controls/DatePickerControl";
import PrintAdminCardPrint from "./PrintAdminCardPrint";
import { useReactToPrint } from "react-to-print";
import "./customPrint.css";
import {
  getHeaderBannerAction,
  getPrincipleSignatureAction,
} from "../../dashboard/DashboardActions";
import {
  GET_HEADER_BANNER_RESET,
  GET_PRINCIPLE_SIGNATURE_RESET,
} from "../../dashboard/DashboardConstants";

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
  { id: "StudentFullName", label: "Full Name" },
  { id: "RollNo", label: "Roll No" },
  { id: "UniversityRegistrationNumber", label: "Symbol No." },
  { id: "AcademicProgramName", label: "Program/Faculty" },
  { id: "Section", label: "Section" },
  { id: "EventName", label: "Event Name" },
  { id: "Status", label: "Status" },
];
/*
 * same api as ExamMarkEntry to get Events
 */
const PrintAdminCard = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [ddlStudent, setDdlStudent] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [event, setEvent] = useState("");
  const [student, setStudent] = useState(0);
  const [date, setDate] = useState();
  const [enddate, setEndDate] = useState();
  const [dateValue, setDateValue] = useState();
  const [enddateValue, setEndDateValue] = useState();
  const [errors, setErrors] = useState({});
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

  const { admitCardInitialData } = useSelector(
    (state) => state.getInitialAdmitCardData
  );

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const { searchStudentsForAdmitCard, loading } = useSelector(
    (state) => state.searchStudentsForAdmitCardData
  );

  const {
    activeStudentsForAdmitCard,
    success: activeStudentsForAdmitCardSuccess,
  } = useSelector((state) => state.getActiveStudentsForAdmitCardData);

  const { printStudentsAdmitCard, loading: loadingBulk } = useSelector(
    (state) => state.printStudentsAdmitCardData
  );

  // if (getEventSuccess) {
  //   setDdlEvent(allEvents);
  //   dispatch({ type: GET_EVENT_RESET });
  // }

  // if (activeStudentsForAdmitCardSuccess) {
  //   setDdlStudent(activeStudentsForAdmitCard);
  //   dispatch({ type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET });
  // }

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

  if (getPrincipleSignatureError) {
    dispatch({ type: GET_PRINCIPLE_SIGNATURE_RESET });
    setNotify({
      isOpen: true,
      message: getPrincipleSignatureError,
      type: "error",
    });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (admitCardInitialData) {
      setProgramValue(
        admitCardInitialData?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setDdlClass(admitCardInitialData?.searchFilterModel.ddlClass);
      setClassId(admitCardInitialData?.searchFilterModel.ddlClass[0]?.Key);
      setAcademicYearDdl(
        admitCardInitialData?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        admitCardInitialData?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setDdlShift(admitCardInitialData?.searchFilterModel.ddlAcademicShift);
      setShift(
        admitCardInitialData?.searchFilterModel.ddlAcademicShift[0]?.Key
      );
      setDdlSection(admitCardInitialData?.searchFilterModel.ddlSection);
      setSection(admitCardInitialData?.searchFilterModel.ddlSection[0]?.Key);
      setDateValue(
        admitCardInitialData?.searchFilterModel?.StartDate?.slice(0, 10)
      );
      setEndDateValue(
        admitCardInitialData?.searchFilterModel?.EndDate?.slice(0, 10)
      );
      dispatch(
        getEventAction(
          admitCardInitialData?.searchFilterModel.ddlAcademicYear[0]?.Key,
          admitCardInitialData?.searchFilterModel.ddlFacultyProgramLink[0]?.Key,
          admitCardInitialData?.searchFilterModel.ddlClass[0]?.Key
        )
      );
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          admitCardInitialData?.searchFilterModel.ddlAcademicYear[0]?.Key,
          admitCardInitialData?.searchFilterModel.ddlFacultyProgramLink[0]?.Key,
          admitCardInitialData?.searchFilterModel.ddlClass[0]?.Key,
          admitCardInitialData?.searchFilterModel.ddlSection[0]?.Key,
          admitCardInitialData?.searchFilterModel.ddlAcademicShift[0]?.Key
        )
      );
    }
  }, [admitCardInitialData, dispatch]);

  useEffect(() => {
    setDdlEvent([]);
    dispatch({ type: SEARCH_STUDENTS_FOR_ADMIT_CARD_RESET });
    dispatch(getInitialStudentRegistrationDataAction());
  }, []);

  useEffect(() => {
    if (searchStudentsForAdmitCard) {
      setTableData(searchStudentsForAdmitCard.dbModelLst);
    }
  }, [searchStudentsForAdmitCard]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";
    // temp.student = !student ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleShift = (value) => {
    setShift(value);
    setDdlStudent([]);
    setStudent("");
    setEvent("");
    setDdlEvent([]);
    if (shift) {
      dispatch(getEventAction(acaYear, programValue, classId, shift, value));
    }
    if ((acaYear, programValue, classId, section)) {
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

  const handleSection = (value) => {
    setSection(value);
    setEvent("");
    setDdlEvent([]);
    setDdlStudent([]);
    setStudent("");
    dispatch(getEventAction(acaYear, programValue, classId, shift, value));
    dispatch(
      getActiveStudentsForAdmitCardDataAction(
        acaYear,
        programValue,
        classId,
        value,
        shift
      )
    );
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    setDdlStudent([]);
    setStudent("");
    if (classId) {
      dispatch(getEventAction(value, programValue, classId));
    }

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
    if (event) {
      setEvent("");
    }
    setDdlEvent([]);
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    setDdlEvent([]);
    setDdlStudent([]);
    setStudent("");
    if (acaYear) {
      dispatch(getEventAction(acaYear, programValue, value));
    }

    if ((acaYear, programValue, shift)) {
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
    if (event) {
      setEvent("");
    }
  };

  const handleStudentSearch = () => {
    if (validate()) {
      dispatch(
        searchStudentsForAdmitCardDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student
        )
      );
    }
  };

  const handleDate = (date) => {
    if (date) {
      setDateValue(date);
      const newDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
      setDate(newDate);
    }
  };

  const handleEndDate = (date) => {
    if (date) {
      setEndDateValue(date);
      const newEndDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
      setEndDate(newEndDate);
    }
  };

  const handleBulkPrint = () => {
    if (validate()) {
      dispatch(
        printStudentsAdmitCardDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student,
          date,
          
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

  useEffect(() => {
    if (activeStudentsForAdmitCardSuccess) {
      setDdlStudent(activeStudentsForAdmitCard);
      setStudent(activeStudentsForAdmitCard[0]?.Key);
    }
  }, [activeStudentsForAdmitCard]);

  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });

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
                options={ddlSection ? ddlSection : test}
                errors={errors.section}
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
                errors={errors.event}
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  name="DOJ"
                  label="Pick Exam Date"
                  value={dateValue}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    console.log(newDate.toLocaleDateString()?.slice(0, 10));
                    handleDate(newDate.toLocaleDateString()?.slice(0, 10));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  name="DOJ"
                  label="Pick Exam End Date"
                  value={enddateValue}
                  onChange={(e) => {
                    const newEndDate = new Date(e);
                    console.log(newEndDate.toLocaleDateString()?.slice(0, 10));
                    handleEndDate(newEndDate.toLocaleDateString()?.slice(0, 10));
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
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Student Admit Card By FullName"
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
            {searchStudentsForAdmitCard && (
              <TableContainer className={classes.table}>
                <TblHead />
                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item) => (
                    <PrintAdminCardTableCollapse
                      item={item}
                      key={item.$id}
                      section={
                        searchStudentsForAdmitCard?.searchFilterModel.ddlSection
                      }
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}

            {searchStudentsForAdmitCard && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        {loadingBulk ? (
          <LoadingComp />
        ) : (
          <>
            <PrintAdminCardPrint
              students={
                printStudentsAdmitCard && printStudentsAdmitCard.dbModelLst
              }
              imagePath={
                printStudentsAdmitCard && printStudentsAdmitCard.ImagePathLst
              }
              classname={
                printStudentsAdmitCard && printStudentsAdmitCard.ClassName
              }
              section={
                printStudentsAdmitCard && printStudentsAdmitCard.SectionName
              }
              examDate={
                dateValue
              }

              examEndDate={
                enddateValue
              }
              principleSignature={principleSignature && principleSignature}
              print={printPdf}
              componentRef={componentRef}
              headerBanners={headerBanners && headerBanners}
              // year={
              //   printStudentsAdmitCard && printStudentsAdmitCard.idAcademicYear
              // }
              year={acaYear}
              // yearDdl={
              //   printStudentsAdmitCard && printStudentsAdmitCard.ddlAcademicYear
              // }
              yearDdl={academicYearDdl}
              dateValue={dateValue}
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

export default PrintAdminCard;
