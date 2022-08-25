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
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import LoadingComp from "../../components/LoadingComp";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  getAllGenerateAction,
  getAllGeneratePublishAction,
  getGenerateResultAction,
} from "./GeneratePublishResultActions";
import {
  GET_ALL_GENERATE_PUBLISH_RESET,
  GET_ALL_GENERATE_PUBLISH_RESULT_RESET,
  GET_ALL_GENERATE_RESET,
} from "./GeneratePublishResultConstants";
import { getEventAction } from "../examMarkEntry/ExamMarkEntryActions";
import { GET_EVENT_RESET } from "../examMarkEntry/ExamMarkEntryConstants";
import GeneratePublishResultTableCollapse from "./GeneratePublishResultTableCollapse";

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
  { id: "StudentName", label: "Full Name" },
  { id: "TotalMark", label: "Full Mark" },
  { id: "TotalPassMark", label: "Pass Mark" },
  { id: "TotalObtainedMark", label: "Obtained Mark" },
  { id: "TotalAvgObtainedMark", label: "Avg" },
  { id: "SecuredDivision", label: "Division" },
  { id: "DivisionComment", label: "Comment" },
  { id: "Status", label: "Status" },
];

const GeneratePublishResult = () => {
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
            x.StudentName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { allGeneratePublish, error: allGeneratePublishError } = useSelector(
    (state) => state.getAllGeneratePublish
  );

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const { allGenerate, loading } = useSelector((state) => state.getAllGenerate);

  const { allGeneratePublishResult, success: allGeneratePublishResultSuccess } =
    useSelector((state) => state.getAllGeneratePublishResult);

  // if (getEventSuccess) {
  //   setDdlEvent(allEvents);
  //   dispatch({ type: GET_EVENT_RESET });
  // }

  if (allGeneratePublishResult) {
    setNotify({
      isOpen: true,
      message: "Generated Succesfully",
      type: "success",
    });
    dispatch(
      getAllGenerateAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event
      )
    );
    dispatch({ type: GET_ALL_GENERATE_PUBLISH_RESULT_RESET });
    setOpenPopup(false);
  }

  if (allGeneratePublishError) {
    setNotify({
      isOpen: true,
      message: allGeneratePublishError,
      type: "error",
    });
    dispatch({ type: GET_ALL_GENERATE_PUBLISH_RESET });
  }

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

  const handleSection = (value) => {
    setSection(value);
    setDdlEvent([]);
    setEvent("");
    dispatch(getEventAction(acaYear, programValue, classId, shift, value));
  };

  const handleShiftChange = (value) => {
    setShift(value);
    setDdlEvent([]);
    setEvent("");
    dispatch(getEventAction(acaYear, programValue, classId, value));
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    setDdlEvent([]);
    setEvent("");
    dispatch(getEventAction(acaYear, programValue, value, shift));
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (allGeneratePublish) {
      setProgramValue(
        allGeneratePublish?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setDdlClass(allGeneratePublish?.searchFilterModel.ddlClass);
      setClassId(allGeneratePublish?.searchFilterModel.ddlClass[0]?.Key);
      setAcademicYearDdl(allGeneratePublish?.searchFilterModel.ddlAcademicYear);
      setAcaYear(allGeneratePublish?.searchFilterModel.ddlAcademicYear[0]?.Key);
      setDdlShift(allGeneratePublish?.searchFilterModel.ddlAcademicShift);
      setShift(allGeneratePublish?.searchFilterModel.ddlAcademicShift[0]?.Key);
      setDdlSection(allGeneratePublish?.searchFilterModel.ddlSection);
      setSection(allGeneratePublish?.searchFilterModel.ddlSection[0].Key);
      dispatch(
        getEventAction(
          allGeneratePublish?.searchFilterModel.ddlAcademicYear[0]?.Key,
          allGeneratePublish?.searchFilterModel.ddlFacultyProgramLink[0].Key,
          allGeneratePublish?.searchFilterModel.ddlClass[0].Key,
          allGeneratePublish?.searchFilterModel.ddlAcademicShift[0].Key
        )
      );
    }
  }, [allGeneratePublish, dispatch]);

  useEffect(() => {
    setDdlEvent([]);
    dispatch({ type: GET_ALL_GENERATE_RESET });
    dispatch({ type: GET_ALL_GENERATE_PUBLISH_RESULT_RESET });
    dispatch(getAllGeneratePublishAction());
  }, []);

  useEffect(() => {
    if (allGenerate) {
      setTableData(allGenerate.dbModelLst);
    }
    if (allGeneratePublishResult) {
      setTableData(allGeneratePublishResult.dbModelLst);
    }
  }, [allGenerate, allGeneratePublishResult]);

  //get event from exam mark entry
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

  const handleGeneralSearch = () => {
    if (validate()) {
      dispatch({ type: GET_ALL_GENERATE_PUBLISH_RESULT_RESET });
      dispatch(
        getAllGenerateAction(
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

  const handleGeneralPublishResult = () => {
    if (validate()) {
      dispatch({ type: GET_ALL_GENERATE_RESET });
      dispatch(
        getGenerateResultAction(
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
                onChange={(e) => setEvent(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
                errors={errors.event}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleGeneralSearch}
              >
                SEARCH
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleGeneralPublishResult}
              >
                GENERATE PUBLISH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Generated Result By FullName"
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
            {allGenerate && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item) => (
                    <GeneratePublishResultTableCollapse
                      item={item}
                      key={item.$id}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}

            {allGenerate && <TblPagination />}
          </>
        )}
      </CustomContainer>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default GeneratePublishResult;
