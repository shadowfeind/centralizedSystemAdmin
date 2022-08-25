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
  GET_BULK_EDIT_ECA_DATA_RESET,
  GET_LIST_ECA_DATA_RESET,
  POST_BULK_ECA_DATA_RESET,
} from "./EcaDataConstants";
import {
  getAllEcaDataAction,
  getBulkEditEcaDataAction,
  getListEcaDataAction,
} from "./EcaDataActions";
import { GET_EVENT_RESET } from "../examMarkEntry/ExamMarkEntryConstants";
import { getEventAction } from "../examMarkEntry/ExamMarkEntryActions";
import EcaDataBulkEdit from "./EcaDataBulkEdit";
import EcaDataTableCollapse from "./EcaDataTableCollapse";

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

const EcaData = () => {
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
  const [showTableData, setShowTableData] = useState(false);
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

  const { TableContainer, TblPagination, tableDataAfterPagingAndSorting } =
    useCustomTable(tableData, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.EventName?.toLowerCase()?.includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { allEcaData } = useSelector((state) => state.getAllEcaData);

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const { bulkEditData, error: bulkEditDataError } = useSelector(
    (state) => state.getBulkEditEcaData
  );

  const { listEcaData, error: listEcaDataError } = useSelector(
    (state) => state.getListEcaData
  );

  const {
    success: postBulkEditEcaDataSuccess,
    error: postBulkEditEcaDataError,
  } = useSelector((state) => state.postBulkEditEcaData);

  // if (getEventSuccess) {
  //   setDdlEvent(allEvents);
  //   dispatch({ type: GET_EVENT_RESET });
  // }

  if (listEcaDataError) {
    setNotify({
      isOpen: true,
      message: listEcaDataError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ECA_DATA_RESET });
  }

  if (bulkEditDataError) {
    setNotify({
      isOpen: true,
      message: bulkEditDataError,
      type: "error",
    });
    dispatch({ type: GET_BULK_EDIT_ECA_DATA_RESET });
  }

  if (postBulkEditEcaDataError) {
    setNotify({
      isOpen: true,
      message: postBulkEditEcaDataError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: POST_BULK_ECA_DATA_RESET });
  }

  if (postBulkEditEcaDataSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Edited",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(
      getBulkEditEcaDataAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event
      )
    );
    setShowTableData(true);
    dispatch({ type: POST_BULK_ECA_DATA_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    dispatch(getAllEcaDataAction());
    setDdlEvent([]);
  }, []);
  useEffect(() => {
    if (allEcaData) {
      setAcademicYearDdl(allEcaData.searchFilterModel.ddlAcademicYear);
      setAcaYear(allEcaData.searchFilterModel.ddlAcademicYear[0]?.Key);

      setProgramValue(
        allEcaData?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );

      setDdlClass(allEcaData.searchFilterModel.ddlClass);
      setClassId(allEcaData.searchFilterModel.ddlClass[0]?.Key);
      setDdlShift(allEcaData.searchFilterModel.ddlAcademicShift);
      setShift(allEcaData.searchFilterModel.ddlAcademicShift[0]?.Key);
      setDdlSection(allEcaData.searchFilterModel.ddlSection);
      setSection(allEcaData.searchFilterModel.ddlSection[0]?.Key);
      dispatch(
        getEventAction(
          allEcaData.searchFilterModel.ddlAcademicYear[0]?.Key,
          allEcaData.searchFilterModel.ddlFacultyProgramLink[0]?.Key,
          allEcaData.searchFilterModel.ddlClass[0]?.Key,
          allEcaData.searchFilterModel.ddlAcademicShift[0]?.Key
        )
      );
    }
  }, [allEcaData, dispatch]);

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

  useEffect(() => {
    if (listEcaData) {
      setTableData(listEcaData.dbModelLst);
    }
  }, [listEcaData]);

  const handleShiftChange = (value) => {
    setShift(value);
    setDdlEvent([]);
    setEvent("");
    if ((acaYear, programValue, classId, value)) {
      dispatch(getEventAction(acaYear, programValue, classId, value));
    }
  };

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
    if (classId) {
      dispatch(getEventAction(value, programValue, classId, shift));
    }
    if (event) {
      setEvent("");
    }
    setDdlEvent([]);
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    setDdlEvent([]);
    setEvent("");
    dispatch(getEventAction(acaYear, programValue, value, shift));
  };

  const handleEcaSearch = () => {
    if (validate()) {
      dispatch(
        getBulkEditEcaDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event
        )
      );
      setShowTableData(true);
    }
  };

  const handleBulkEdit = () => {
    if (validate()) {
      dispatch(
        getBulkEditEcaDataAction(
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
                style={{ margin: "15px 0 0 15px" }}
                onClick={handleBulkEdit}
              >
                BULKEDIT
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "15px 0 0 15px" }}
                onClick={handleEcaSearch}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "40px" }}></div>
        {/* {listEcaData && (
          <TableContainer className={classes.table}>

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => ( */}
        {showTableData && (
          <EcaDataTableCollapse
            bulkDatas={bulkEditData && bulkEditData.dbModelLst}
            academicSubjects={
              bulkEditData && bulkEditData.ddlAcademicFacultyECASubModel
            }
            ecas={bulkEditData && bulkEditData.ecaData}
            searchs={bulkEditData && bulkEditData.searchFilterModel}
          />
        )}
        {/* ))}
            </TableBody>
          </TableContainer>
        )}
        {listEcaData && <TblPagination />} */}
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="Bulk Edit"
        >
          <EcaDataBulkEdit
            bulkData={bulkEditData && bulkEditData.dbModelLst}
            academicSubject={
              bulkEditData && bulkEditData.ddlAcademicFacultyECASubModel
            }
            eca={bulkEditData && bulkEditData.ecaData}
            search={bulkEditData && bulkEditData.searchFilterModel}
            setOpenPopup={setOpenPopup}
          />
        </Popup>
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default EcaData;
