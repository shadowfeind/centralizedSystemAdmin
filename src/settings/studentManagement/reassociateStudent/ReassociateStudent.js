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
import SelectControl from "../../../components/controls/SelectControl";
import {
  getAllReassociateStudentsAction,
  getReassociateStudentsLevelupAction,
  getReassociateStudentsLevelupPostAction,
  getReassociateStudentsListsAction,
  getSingleEditReassociateStudentsAction,
} from "./ReassociateStudentActions";
import ReassociateStudentTableCollapse from "./ReassociateStudentTableCollapse";
import ReassociateStudentLevelUp from "./ReassociateStudentLevelUp";
import {
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_RESET,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_RESET,
  GET_REASSOCIATE_STUDENTS_LISTS_RESET,
  GET_SINGLE_TO_EDIT_REASSOCIATE_STUDENTS_RESET,
  PUT_REASSOCIATE_STUDENTS_RESET,
} from "./ReassociateStudentConstants";
import ReassociateStudentSearchEditForm from "./ReassociateStudentSearchEditForm";

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
  { id: "StudentName", label: "Student Name" },
  { id: "RollNo", label: "Roll No" },
  { id: "PUNumber", label: "Symbol Number" },
  { id: "AcademicProgramName", label: "ProgramName" },
  { id: "Email", label: "Email" },
  { id: "MobileNo", label: "Mobile No" },
  { id: "LevelStatus", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const ReassociateStudent = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupEdit, setOpenPopupEdit] = useState(false);
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
  const [academicYear, setAcademicYear] = useState([]);
  const [academicYearValue, setAcademicYearValue] = useState("");
  const [shift, setShift] = useState([]);
  const [shiftValue, setShiftValue] = useState("");
  const [program, setProgram] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [section, setSection] = useState([]);
  const [sectionValue, setSectionValue] = useState("");
  const [classOpt, setClassOpt] = useState([]);
  const [classOptValue, setClassOptValue] = useState("");
  const [formCheck, setFormCheck] = useState([]);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const classes = useStyles();
  const { allReassociateStudents } = useSelector(
    (state) => state.getAllReassociateStudents
  );

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

  const { reassociateStudentLists, loading } = useSelector(
    (state) => state.getReassociateStudentsLists
  );

  const {
    reassociateStudentLevel,
    loading: loadingLevelUp,
    error: reassociateStudentLevelError,
  } = useSelector((state) => state.getReassociateStudentsLevelup);
  const {
    singleEditReassociateStudent,
    loading: loadingEdit,
    error: singleEditReassociateStudentError,
  } = useSelector((state) => state.getSingleEditReassociateStudents);

  const { success: reassociatePostSuccess, error: reassociatePostError } =
    useSelector((state) => state.getReassociateStudentsLevelupPost);

  const { success: putReassociateSuccess, error: putReassociateError } =
    useSelector((state) => state.putReassociateStudents);

  if (singleEditReassociateStudentError) {
    setNotify({
      isOpen: true,
      message: singleEditReassociateStudentError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_REASSOCIATE_STUDENTS_RESET });
    setOpenPopup(false);
  }
  if (putReassociateError) {
    setNotify({
      isOpen: true,
      message: putReassociateError,
      type: "error",
    });
    dispatch({ type: PUT_REASSOCIATE_STUDENTS_RESET });
    setOpenPopup(false);
  }

  if (reassociateStudentLevelError) {
    setNotify({
      isOpen: true,
      message: reassociateStudentLevelError,
      type: "error",
    });
    dispatch({ type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_RESET });
    setOpenPopup(false);
  }

  if (reassociatePostError) {
    setNotify({
      isOpen: true,
      message: reassociatePostError,
      type: "error",
    });
    dispatch({ type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_RESET });
    setOpenPopup(false);
  }

  if (putReassociateSuccess) {
    setNotify({
      isOpen: true,
      message: "Updated Successfully",
      type: "success",
    });
    dispatch(
      getReassociateStudentsListsAction(
        academicYearValue,
        programValue,
        shiftValue,
        classOptValue,
        sectionValue
      )
    );
    dispatch({ type: PUT_REASSOCIATE_STUDENTS_RESET });
    setOpenPopupEdit(false);
  }

  if (reassociatePostSuccess) {
    setFormCheck([]);

    setNotify({
      isOpen: true,
      message: "Edited Succesfully",
      type: "success",
    });
    dispatch(
      getReassociateStudentsListsAction(
        academicYearValue,
        programValue,
        shiftValue,
        classOptValue,
        sectionValue
      )
    );
    dispatch({ type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_RESET });
    setOpenPopup(false);
  }
  const handleAcademicYearChange = (e) => {
    setAcademicYearValue(e.target.value);
  };
  useEffect(() => {
    if (allReassociateStudents) {
      setAcademicYear(
        allReassociateStudents?.searchFilterModel.ddlAcademicYear
      );
      setAcademicYearValue(
        allReassociateStudents?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setShift(allReassociateStudents?.searchFilterModel.ddlAcademicShift);
      setShiftValue(
        allReassociateStudents?.searchFilterModel.ddlAcademicShift[0]?.Key
      );
      setProgramValue(
        allReassociateStudents?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setSection(allReassociateStudents?.ddlSection);
      setSectionValue(allReassociateStudents?.ddlSection[0]?.Key);
      setClassOpt(allReassociateStudents?.searchFilterModel.ddlClass);
      setClassOptValue(
        allReassociateStudents?.searchFilterModel.ddlClass[0]?.Key
      );
    }
  }, [allReassociateStudents]);

  useEffect(() => {
    dispatch({ type: GET_REASSOCIATE_STUDENTS_LISTS_RESET });
    dispatch(getAllReassociateStudentsAction());
  }, []);

  useEffect(() => {
    if (reassociateStudentLists) {
      setTableData(reassociateStudentLists.dbModelLst);
    }
  }, [reassociateStudentLists]);

  const validate = () => {
    let temp = {};
    temp.academicYearValue = !academicYearValue ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.shiftValue = !shiftValue ? "This feild is required" : "";
    temp.classOptValue = !classOptValue ? "This feild is required" : "";
    temp.sectionValue = !sectionValue ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(
        getReassociateStudentsListsAction(
          academicYearValue,
          programValue,
          shiftValue,
          classOptValue,
          sectionValue
        )
      );
    }
  };
  const handleLevelup = () => {
    if (validate()) {
      dispatch(
        getReassociateStudentsLevelupAction(
          academicYearValue,
          programValue,
          shiftValue,
          classOptValue,
          sectionValue
        )
      );
      setOpenPopup(true);
    }
  };

  const formCheckSubmitHandler = () => {
    dispatch(
      getReassociateStudentsLevelupPostAction(
        formCheck,
        reassociateStudentLevel.searchFilterModel,
        reassociateStudentLevel.searchFilterModel.idAcademicYear,
        reassociateStudentLevel.searchFilterModel.idNextAcademicYear
      )
    );
    setOpenPopup(false);
  };

  const updateFormHandler = (IDStudentFacultyLevel) => {
    dispatch(
      getSingleEditReassociateStudentsAction(
        IDStudentFacultyLevel,
        reassociateStudentLists.searchFilterModel.idAcademicYear,
        reassociateStudentLists.searchFilterModel.idFacultyProgramLink,
        reassociateStudentLists.searchFilterModel.idClass,
        reassociateStudentLists.searchFilterModel.idShift,
        reassociateStudentLists.searchFilterModel.classSection
      )
    );
    setOpenPopupEdit(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={2}>
              <SelectControl
                name="academicYear"
                label="Academic Year"
                value={academicYearValue}
                onChange={(e) => handleAcademicYearChange(e)}
                options={academicYear}
                errors={errors.academicYearValue}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="ddlFacultyProgramLink"
                label="Program / Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={program}
                errors={errors.programValue}
              />
            </Grid> */}
            <Grid item xs={2}>
              <SelectControl
                name="ddlClass"
                label="Class"
                value={classOptValue}
                onChange={(e) => setClassOptValue(e.target.value)}
                options={classOpt}
                errors={errors.classOptValue}
              />
            </Grid>

            <Grid item xs={2}>
              <SelectControl
                name="ddlSection"
                label="Section"
                value={sectionValue}
                onChange={(e) => setSectionValue(e.target.value)}
                options={section}
                errors={errors.sectionValue}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlAcademicShift"
                label="Shift"
                value={shiftValue}
                onChange={(e) => setShiftValue(e.target.value)}
                options={shift}
                errors={errors.shiftValue}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleLevelup}
              >
                LEVEL UP
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={listSearchHandler}
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
            label="Search Relocate Student by Student Name"
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
            {reassociateStudentLists && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <ReassociateStudentTableCollapse
                      item={item}
                      key={item.$id}
                      updateFormHandler={updateFormHandler}
                      // deleteCollegeHandler={deleteCollegeHandler}
                    />
                  ))}
                  :<h2></h2>
                </TableBody>
              </TableContainer>
            )}
            {reassociateStudentLists && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Next Class"
      >
        {loadingLevelUp ? (
          <LoadingComp />
        ) : (
          <>
            <ReassociateStudentLevelUp
              dbModelLst={
                reassociateStudentLevel && reassociateStudentLevel?.dbModelLst
              }
              ddlSection={
                reassociateStudentLevel && reassociateStudentLevel?.ddlSection
              }
              ddlLevelStatus={
                reassociateStudentLevel &&
                reassociateStudentLevel?.ddlLevelStatus
              }
              ddlAcademicYear={
                reassociateStudentLevel &&
                reassociateStudentLevel?.ddlAcademicYear
              }
              ddlAcademicYearNext={
                reassociateStudentLevel &&
                reassociateStudentLevel?.ddlAcademicYearNext
              }
              ddlClass={
                reassociateStudentLevel && reassociateStudentLevel?.ddlClass
              }
              nextClass={
                reassociateStudentLevel &&
                reassociateStudentLevel.searchFilterModel?.nextClass
              }
              idAcademicYear={
                reassociateStudentLevel &&
                reassociateStudentLevel?.ddlAcademicYear
              }
              idAcademicYearValue={
                reassociateStudentLevel &&
                reassociateStudentLevel?.searchFilterModel?.idAcademicYear
              }
              idNextAcademicYearValue={
                reassociateStudentLevel &&
                reassociateStudentLevel?.searchFilterModel?.idNextAcademicYear
              }
              noNextYearError={
                reassociateStudentLevel && reassociateStudentLevel?.Message
              }
              setOpenPopup={setOpenPopup}
              setFormCheck={setFormCheck}
              formCheck={formCheck}
              formCheckSubmitHandler={formCheckSubmitHandler}
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openPopupEdit}
        setOpenPopup={setOpenPopupEdit}
        title="Edit Reassociate Students"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <ReassociateStudentSearchEditForm
              reassociateForm={
                singleEditReassociateStudent && singleEditReassociateStudent
              }
              setOpenPopupEdit={setOpenPopupEdit}
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

export default ReassociateStudent;
