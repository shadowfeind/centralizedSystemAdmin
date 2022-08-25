import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import Popup from "../../../components/Popup";
import LoadingComp from "../../../components/LoadingComp";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import {
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_RESET,
  ACADEMIC_YEAR_CALENDAR_CREATE_RESET,
  ACADEMIC_YEAR_CALENDAR_SEARCH_RESET,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_RESET,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET,
} from "./AcademicYearCalendarConstant";
import AcademicYearCalendarTableCollapse from "./AcademicYearCalendarTableCollapse";
import {
  academicYearCalendarSearchAction,
  createAcademicYearCalendarAction,
  getAcademicYearCalendarProgramAction,
  getAllAcademicYearCalendarAction,
  getSingleAcademicYearCalendarAction,
} from "./AcademicYearCalendarActions";
import SelectControl from "../../../components/controls/SelectControl";
import AcademicYearCalendarForm from "./AcademicYearCalendarForm";

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

const tableHeader = [
  { id: "EventName", label: "Event Name" },
  { id: "EventType", label: "Event Type" },
  { id: "EventStatus", label: "Event Status" },
  { id: "FromDate", label: "From Date" },
  { id: "ToDate", label: "To Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicYearCalendar = () => {
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
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const dispatch = useDispatch();

  const { academicYearCalendar, error } = useSelector(
    (state) => state.academicYearCalendar
  );

  const { academicYearCalendarProgram, loading } = useSelector(
    (state) => state.getAcademicYearCalendarProgram
  );

  const { success: academicYearCreateSuccess, error: academicYearCreateError } =
    useSelector((state) => state.createAcademicYearCalendarPost);

  const { academicSearch } = useSelector(
    (state) => state.academicYearCalendarSearch
  );

  const { singleAcademicYearCalendar, loading: loadingEdit } = useSelector(
    (state) => state.getSingleAcademicYearCalendar
  );

  const {
    success: updateSingleAcademicYearCalendarSuccess,
    error: updateSingleAcademicYearCalendarError,
  } = useSelector((state) => state.updateSingleAcademicYearCalendar);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACADEMIC_YEAR_CALENDAR_RESET });
  }
  if (academicYearCreateError) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: ACADEMIC_YEAR_CALENDAR_CREATE_POST_RESET });
  }
  if (updateSingleAcademicYearCalendarError) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET });
  }

  if (academicYearCreateSuccess) {
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ACADEMIC_YEAR_CALENDAR_CREATE_POST_RESET });
    dispatch(academicYearCalendarSearchAction(acaYear, programValue, classId));
  }

  if (updateSingleAcademicYearCalendarSuccess) {
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET });
    dispatch(academicYearCalendarSearchAction(acaYear, programValue, classId));
  }

  const updateAcademicYear = (id) => {
    if (academicSearch) {
      dispatch(
        getSingleAcademicYearCalendarAction(
          id,
          academicSearch.searchFilterModel.idAcademicYear,
          academicSearch.searchFilterModel.idFacultyProgramLink,
          academicSearch.searchFilterModel.level
        )
      );
      setOpenPopup(true);
    }
  };

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };

  useEffect(() => {
    if (academicYearCalendar) {
      setProgramValue(
        academicYearCalendar?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setDdlClass(academicYearCalendar?.searchFilterModel.ddlClass);
      setClassId(academicYearCalendar?.searchFilterModel.ddlClass[0]?.Key);
      setAcademicYearDdl(
        academicYearCalendar?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        academicYearCalendar?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
    }
  }, [dispatch, academicYearCalendar]);

  useEffect(() => {
    dispatch({ type: ACADEMIC_YEAR_CALENDAR_SEARCH_RESET });
    dispatch(getAllAcademicYearCalendarAction());
  }, []);

  useEffect(() => {
    if (academicSearch) {
      setTableData(academicSearch.dbModelLst);
    }
  }, [academicSearch]);

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.EventName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const handleSelectChange = (value) => {
    dispatch(getAcademicYearCalendarProgramAction(value));
    setAcaYear(value);
  };

  useEffect(() => {
    if (academicYearCalendarProgram) {
      setProgramDdl([...academicYearCalendarProgram.ddlFacultyProgramLink]);
    }
  }, [academicYearCalendarProgram]);

  const handleCreate = () => {
    if (validate()) {
      dispatch(
        createAcademicYearCalendarAction(acaYear, programValue, classId)
      );
      dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET });
      setOpenPopup(true);
    }
  };

  const handleAcademicYearCalendarSearch = () => {
    if (validate()) {
      dispatch(
        academicYearCalendarSearchAction(acaYear, programValue, classId)
      );
    }
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Sex"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => handleSelectChange(e.target.value)}
                options={academicYearDdl}
                errors={errors.acaYear}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="Sex"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={programDdl}
                errors={errors.programValue}
              />
            </Grid> */}
            <Grid item xs={3}>
              <SelectControl
                name="Sex"
                label="Classes"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={6}>
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
                onClick={handleAcademicYearCalendarSearch}
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
            label="Search Academic Year Calender By EventName"
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
            {academicSearch && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <AcademicYearCalendarTableCollapse
                      item={item}
                      key={item.$id}
                      updateAcademicYear={updateAcademicYear}
                      deleteCollegeHandler={deleteCollegeHandler}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}

            {academicSearch && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Create Academic Year Calendar"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AcademicYearCalendarForm
              singleAcademicYearCalendar={
                singleAcademicYearCalendar && singleAcademicYearCalendar
              }
              setOpenPopup={setOpenPopup}
              classId={classId}
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

export default AcademicYearCalendar;
