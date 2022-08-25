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
  getBulkLevelTestDataAction,
  getInitialLevelTestDataAction,
} from "./LevelTestActions";
import { getEventAction } from "../examMarkEntry/ExamMarkEntryActions";
import { GET_EVENT_RESET } from "../examMarkEntry/ExamMarkEntryConstants";
import {
  GET_BULK_LEVEL_TEST_DATA_RESET,
  POST_BULK_LEVEL_TEST_DATA_RESET,
} from "./LevelTestConstants";
import LevelTestBulkEdit from "./LevelTestBulkEdit";

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
  { id: "SubjectName", label: "Subject" },
  { id: "FullMark", label: "Full Marks(TH)" },
  { id: "FullMarkPractical", label: "Full Marks(PR)" },
  { id: "FullMarkPreTerm", label: "Full Marks(Pre Term)" },
  { id: "ObtainedMark", label: "ObtainedMark(TH)" },
  { id: "ObtainedMarkPractical", label: "ObtainedMark(PR)" },
  { id: "ObtainedMarkPreTerm", label: "ObtainedMark(Pre Term)" },
];

/*
 * get event name  has same api
 * as exam mark entry so i have used same reducers and actions
 */

const LevelTest = () => {
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
            x.EventName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { levelTestInitialDatas } = useSelector(
    (state) => state.getInitialLevelTestData
  );

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const {
    bulkDatas,
    loading,
    error: getbulkDatasError,
  } = useSelector((state) => state.getBulkLevelTestData);

  const {
    success: postBulkLevelTestDataSuccess,
    error: postBulkLevelTestDataError,
  } = useSelector((state) => state.postBulkLevelTestData);

  // if (getEventSuccess) {
  //   setDdlEvent(allEvents);
  //   dispatch({ type: GET_EVENT_RESET });
  // }

  if (getbulkDatasError) {
    setNotify({
      isOpen: true,
      message: getbulkDatasError,
      type: "error",
    });
    dispatch({ type: GET_BULK_LEVEL_TEST_DATA_RESET });
  }
  if (postBulkLevelTestDataError) {
    setNotify({
      isOpen: true,
      message: postBulkLevelTestDataError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: POST_BULK_LEVEL_TEST_DATA_RESET });
  }
  if (postBulkLevelTestDataSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Edited",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: POST_BULK_LEVEL_TEST_DATA_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    dispatch(getInitialLevelTestDataAction());
    setDdlEvent([]);
  }, []);

  useEffect(() => {
    if (levelTestInitialDatas) {
      setProgramValue(
        levelTestInitialDatas?.searchFilterModel.ddlFacultyProgramLink[0].Key
      );
      setDdlClass(levelTestInitialDatas?.searchFilterModel.ddlClass);
      setClassId(levelTestInitialDatas?.searchFilterModel.ddlClass[0].Key);
      setAcademicYearDdl(
        levelTestInitialDatas?.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(levelTestInitialDatas?.searchFilterModel.ddlAcademicShift);
      setShift(
        levelTestInitialDatas?.searchFilterModel.ddlAcademicShift[0].Key
      );
      setDdlSection(levelTestInitialDatas?.searchFilterModel.ddlSection);
      setSection(levelTestInitialDatas?.searchFilterModel.ddlSection[0].Key);
    }
  }, [levelTestInitialDatas, dispatch]);

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

  const handleShiftChange = (value) => {
    setShift(value);
    setDdlEvent([]);
    setEvent("");
    // if ((acaYear,programValue, classId, value)) {
    dispatch(getEventAction(acaYear, programValue, classId, value));
  };
  // }

  const handleSectionChange = (value) => {
    setSection(value);
    setDdlEvent([]);
    setEvent("");
    if ((acaYear, programValue, classId, shift, value)) {
      dispatch(getEventAction(acaYear, programValue, classId, shift, value));
    }
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    setDdlEvent([]);
    if (classId) {
      dispatch(getEventAction(value, programValue, classId, shift));
    }
    if (event) {
      setEvent("");
    }
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    setDdlEvent([]);
    dispatch(getEventAction(acaYear, programValue, value, shift));
  };

  const handleBulkEdit = () => {
    if (validate()) {
      dispatch(
        getBulkLevelTestDataAction(
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
                onChange={(e) => setEvent(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
                errors={errors.event}
              />
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkEdit}
              >
                BULK EDIT
              </Button>
              {/* <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleExamApprovalSearch}
              >
                SEARCH
              </Button> */}
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search ECA"
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
        {/* {searchData && (
      <TableContainer className={classes.table}>
        <TblHead />

        <TableBody>
          {tableDataAfterPagingAndSorting().map((item) => (
            <ExamMarkApprovalTableCollapse item={item} key={item.$id} />
          ))}
        </TableBody>
      </TableContainer>
    )}

    {searchData && <TblPagination />} */}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            <LevelTestBulkEdit
              search={bulkDatas && bulkDatas.searchFilterModel}
              bulkData={bulkDatas && bulkDatas.dbModelLst}
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

export default LevelTest;
