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
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  DELETE_EXAM_SCHEDULE_RESET,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_RESET,
  GET_EVENT_FOR_EXAM_SCHEDULE_RESET,
  GET_EXAM_SCHEDULE_LIST_RESET,
  GET_GENERATE_EXAM_SCHEDULE_RESET,
  GET_SINGLE_EXAM_SCHEDULE_CREATE_RESET,
  GET_SINGLE_EXAM_SCHEDULE_EDIT_RESET,
  POST_GENERATE_EXAM_SCHEDULE_RESET,
  POST_SINGLE_EXAM_SCHEDULE_CREATE_RESET,
  SINGLE_EXAM_SCHEDULE_EDIT_RESET,
} from "./ExamScheduleConstants";
import {
  getAllExamScheduleInitialDataAction,
  getEventForExamScheduleAction,
  getExamScheduleListAction,
  getGenerateExamScheduleCreateAction,
  getSingleExamScheduleCreateAction,
  getSingleExamScheduleEditAction,
} from "./ExamScheduleActions";
import ExamScheduleTableCollapse from "./ExamScheduleTableCollapse";
import ExamScheduleForm from "./ExamScheduleForm";
import ExamScheduleDeleteForm from "./ExamScheduleDeleteForm";
import ExamScheduleGenerateForm from "./ExamScheduleGenerateForm";

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
  { id: "EventName", label: "Event Name" },
  { id: "ExamType", label: "Type" },
  { id: "DisplayName", label: "Display Name" },
  { id: "ExamScheduleFromDate", label: "From Date" },
  { id: "ExamScheduleToDate", label: "To Date" },
  { id: "FullMark", label: "FullMarks" },
  { id: "FullMarkPractical", label: "FullMarks(PT/UT)" },
  { id: "PassMark", label: "PassMark" },
  { id: "SubjectOrder", label: "Subject Order" },
  { id: "Actions", label: "Actions", disableSorting: true },
];

const ExamSchedule = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [event, setEvent] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [generatePopUp, setGeneratePopUp] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
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
            x.EventName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { examScheduleInitialData, error: examScheduleInitialDataError } =
    useSelector((state) => state.getAllExamScheduleInitialData);
  const { singleExamScheduleCreate, error: singleExamScheduleCreateError } =
    useSelector((state) => state.getSingleExamScheduleCreate);
  const { eventExamSchedule, error: eventExamScheduleError } = useSelector(
    (state) => state.getEventForExamSchedule
  );

  const { examScheduleList } = useSelector(
    (state) => state.getExamScheduleList
  );
  const {
    success: postSingleExamScheduleCreateSuccess,
    error: postSingleExamScheduleCreateError,
  } = useSelector((state) => state.postSingleExamScheduleCreate);

  const { singleExamScheduleEdit, error: singleExamScheduleEditError } =
    useSelector((state) => state.getSingleExamScheduleEdit);

  const {
    success: singleExamScheduleEditSuccess,
    error: putSingleExamScheduleEditError,
  } = useSelector((state) => state.singleExamScheduleEdit);

  const { success: deleteExamScheduleSuccess, error: deleteExamScheduleError } =
    useSelector((state) => state.deleteExamSchedule);

  const {
    getToGenerateExamScheduleCreate,
    error: getToGenerateExamScheduleCreateError,
  } = useSelector((state) => state.getToGenerateExamScheduleCreate);

  const {
    success: postGenerateExamScheduleCreateSuccess,
    error: postGenerateExamScheduleCreateError,
    eventName: postGenerateExamScheduleCreateEventName,
  } = useSelector((state) => state.postGenerateExamScheduleCreate);

  if (postGenerateExamScheduleCreateSuccess) {
    setNotify({
      isOpen: true,
      message: "Posted Successfully",
      type: "success",
    });
    setGeneratePopUp(false);
    setEvent(postGenerateExamScheduleCreateEventName);
    dispatch(
      getExamScheduleListAction(
        acaYear,
        programValue,
        classId,
        postGenerateExamScheduleCreateEventName
      )
    );
    dispatch({ type: POST_GENERATE_EXAM_SCHEDULE_RESET });
  }

  if (postGenerateExamScheduleCreateError) {
    setNotify({
      isOpen: true,
      message: postGenerateExamScheduleCreateError,
      type: "error",
    });
    dispatch({ type: POST_GENERATE_EXAM_SCHEDULE_RESET });
  }

  if (getToGenerateExamScheduleCreateError) {
    setNotify({
      isOpen: true,
      message: getToGenerateExamScheduleCreateError,
      type: "error",
    });
    dispatch({ type: GET_GENERATE_EXAM_SCHEDULE_RESET });
  }
  if (singleExamScheduleCreateError) {
    setNotify({
      isOpen: true,
      message: singleExamScheduleCreateError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_EXAM_SCHEDULE_CREATE_RESET });
  }
  if (putSingleExamScheduleEditError) {
    setNotify({
      isOpen: true,
      message: putSingleExamScheduleEditError,
      type: "error",
    });
    dispatch({ type: SINGLE_EXAM_SCHEDULE_EDIT_RESET });
  }
  if (singleExamScheduleEditSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({ type: SINGLE_EXAM_SCHEDULE_EDIT_RESET });
    setOpenPopup(false);
    dispatch(
      getExamScheduleListAction(
        examScheduleList.searchFilterModel.idAcademicYear,
        examScheduleList.searchFilterModel.idFacultyProgramLink,
        examScheduleList.searchFilterModel.level,
        examScheduleList.searchFilterModel.idAcademicYearCalendar
      )
    );
  }
  if (singleExamScheduleEditError) {
    setNotify({
      isOpen: true,
      message: singleExamScheduleEditError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_EXAM_SCHEDULE_EDIT_RESET });
  }
  if (postSingleExamScheduleCreateError) {
    setNotify({
      isOpen: true,
      message: postSingleExamScheduleCreateError,
      type: "error",
    });
    dispatch({ type: POST_SINGLE_EXAM_SCHEDULE_CREATE_RESET });
  }
  if (postSingleExamScheduleCreateSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    dispatch({ type: POST_SINGLE_EXAM_SCHEDULE_CREATE_RESET });
    setOpenPopup(false);
    dispatch(getExamScheduleListAction(acaYear, programValue, classId, event));
  }
  if (examScheduleInitialDataError) {
    setNotify({
      isOpen: true,
      message: examScheduleInitialDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_RESET });
  }

  if (deleteExamScheduleError) {
    setNotify({
      isOpen: true,
      message: deleteExamScheduleError,
      type: "error",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_EXAM_SCHEDULE_RESET });
  }

  if (deleteExamScheduleSuccess) {
    dispatch(getExamScheduleListAction(acaYear, programValue, classId, event));
    setNotify({
      isOpen: true,
      message: "Deleted Succesfully",
      type: "success",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_EXAM_SCHEDULE_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (examScheduleInitialData) {
      setProgramValue(
        examScheduleInitialData?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setDdlClass(examScheduleInitialData?.searchFilterModel.ddlClass);
      setClassId(examScheduleInitialData?.searchFilterModel.ddlClass[0]?.Key);
      setAcademicYearDdl(
        examScheduleInitialData?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        examScheduleInitialData?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      dispatch(
        getEventForExamScheduleAction(
          examScheduleInitialData?.searchFilterModel.ddlAcademicYear[0]?.Key,
          examScheduleInitialData?.searchFilterModel.ddlFacultyProgramLink[0]
            ?.Key,
          examScheduleInitialData?.searchFilterModel.ddlClass[0]?.Key
        )
      );
    }
  }, [examScheduleInitialData, dispatch]);

  useEffect(() => {
    setDdlEvent([]);
    dispatch({ type: GET_EXAM_SCHEDULE_LIST_RESET });
    dispatch(getAllExamScheduleInitialDataAction());
  }, []);

  useEffect(() => {
    if (examScheduleList) {
      setTableData(examScheduleList.dbModelLst);
    }
  }, [examScheduleList]);

  useEffect(() => {
    if (eventExamSchedule) {
      setDdlEvent(eventExamSchedule);
      setEvent(eventExamSchedule[0]?.Key);
    }
  }, [eventExamSchedule]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    setDdlEvent([]);
    dispatch(getEventForExamScheduleAction(acaYear, programValue, value));
    setEvent("");
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    if (classId) {
      dispatch(getEventForExamScheduleAction(value, programValue, classId));
    }
    setEvent("");
    setDdlEvent([]);
  };

  const handleExamScheduleSearch = () => {
    if (validate()) {
      dispatch(
        getExamScheduleListAction(acaYear, programValue, classId, event)
      );
    }
  };
  const handleCreate = () => {
    if (validate()) {
      dispatch(
        getSingleExamScheduleCreateAction(acaYear, programValue, classId, event)
      );
      dispatch({ type: GET_SINGLE_EXAM_SCHEDULE_EDIT_RESET });
      setOpenPopup(true);
    }
  };
  const handleGenerate = () => {
    if (validate()) {
      dispatch(
        getGenerateExamScheduleCreateAction(
          acaYear,
          programValue,
          classId,
          event
        )
      );
      setGeneratePopUp(true);
    }
  };

  const updateCollegeHandler = (id) => {
    dispatch(
      getSingleExamScheduleEditAction(
        id,
        examScheduleList.searchFilterModel.idAcademicYear,
        examScheduleList.searchFilterModel.idFacultyProgramLink,
        examScheduleList.searchFilterModel.level,
        examScheduleList.searchFilterModel.idAcademicYearCalendar
      )
    );
    setOpenPopup(true);
  };
  const deleteCollegeHandler = (id) => {
    dispatch(
      getSingleExamScheduleEditAction(
        id,
        examScheduleList.searchFilterModel.idAcademicYear,
        examScheduleList.searchFilterModel.idFacultyProgramLink,
        examScheduleList.searchFilterModel.level,
        examScheduleList.searchFilterModel.idAcademicYearCalendar
      )
    );
    setOpenDeletePopup(true);
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
                onChange={(e) => setProgramValue(e.target.value)}
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
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
                errors={errors.event}
              />
            </Grid>

            <Grid item xs={9}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreate}
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleExamScheduleSearch}
              >
                SEARCH
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleGenerate}
              >
                GENERATE
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Full/Pass Marks By EventName"
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
        {examScheduleList && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting()?.map((item) => (
                <ExamScheduleTableCollapse
                  item={item}
                  key={item.$id}
                  subjects={examScheduleList.ddlSubject}
                  updateCollegeHandler={updateCollegeHandler}
                  deleteCollegeHandler={deleteCollegeHandler}
                  setOpenPopup={setOpenPopup}
                  setOpenDeletePopup={setOpenDeletePopup}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}

        {examScheduleList && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Exam Schedule Form"
      >
        <ExamScheduleForm
          examScheduleCreate={
            singleExamScheduleCreate && singleExamScheduleCreate
          }
          examScheduleEdit={singleExamScheduleEdit && singleExamScheduleEdit}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Popup
        openPopup={openDeletePopup}
        setOpenPopup={setOpenDeletePopup}
        title="Exam Schedule Delete Form"
      >
        <ExamScheduleDeleteForm
          examScheduleDelete={singleExamScheduleEdit && singleExamScheduleEdit}
          setOpenDeletePopup={setOpenDeletePopup}
        />
      </Popup>
      <Popup
        openPopup={generatePopUp}
        setOpenPopup={setGeneratePopUp}
        title="List Exam Generate"
      >
        <ExamScheduleGenerateForm
          generate={
            getToGenerateExamScheduleCreate && getToGenerateExamScheduleCreate
          }
          programValue={programValue}
          eventName={ddlEvent && ddlEvent}
          events={event}
          acaYear={acaYear}
          classValue={classId}
          setGeneratePopUp={setGeneratePopUp}
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

export default ExamSchedule;
