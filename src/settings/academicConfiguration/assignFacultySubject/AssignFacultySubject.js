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
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import LoadingComp from "../../../components/LoadingComp";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import { getAcademicYearCalendarProgramAction } from "../academicYearCalendar/AcademicYearCalendarActions";
import {
  AcademicFacultyCreateAction,
  getALLAssignFacultySubject,
  getAssignFacultySubjectOptionAction,
  getListAssignFacultySubject,
  getAssignFacultySubjectEditAction,
  getAssignFacultySubjectGenerateAction,
} from "./AssignFacultySubjectActions";
import AssignFacultySubjectTableCollepse from "./AssignFacultySubjectTableCollapse";
import AssignFacultySubjectFormCreate from "./AssignFacultySubjectFormCreate";
import {
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_RESET,
  ASSIGN_FACULTY_SUBJECT_GENERATE_RESET,
  ASSIGN_FACULTY_SUBJECT_GET_RESET,
  ASSIGN_FACULTY_SUBJECT_POST_RESET,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_RESET,
} from "./AssignFacultySubjectConstants";
import AssignFacultySubjectFormEdit from "./AssignFacultySubjectFormEdit";

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
  { id: "SubjectName", label: "Subject Name" },
  { id: "SubjectCode", label: "Subject Code" },
  { id: "IsOptional", label: "Optional" },
  { id: "IsCompulsory", label: "Compulsory" },
  { id: "IsTheoritical", label: "Theoritical" },
  { id: "IsPractical", label: "Practical" },
  { id: "IsActive", label: "Active" },
  { id: "CreditHour", label: "Credit Hour" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AssignFacultySubject = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupForm, setOpenPopupForm] = useState(false);
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
  const [formCheck, setFormCheck] = useState([]);
  const [errors, setErrors] = useState({});
  const [createErrors, setCreateErrors] = useState({});
  const [generateErrors, setGenerateErrors] = useState({});

  const classes = useStyles();

  const dispatch = useDispatch();

  const { allAcademicSubjects } = useSelector(
    (state) => state.getAllAssignFacultySubject
  );

  const { academicYearCalendarProgram } = useSelector(
    (state) => state.getAcademicYearCalendarProgram
  );

  const { academicSubjectsList, loading } = useSelector(
    (state) => state.getListAssignFacultySubject
  );

  const { academicSubjects, loading: loadingCreate } = useSelector(
    (state) => state.getAssignFacultySubjectOption
  );

  const { success: facultySubjectSuccess, error: facultySubjectError } =
    useSelector((state) => state.assignFacultySubjectPost);

  const { singleFacultySubject, loading: loadingEdit } = useSelector(
    (state) => state.assignFacultySubjectEdit
  );

  const { success: singleFacultyEditSuccess } = useSelector(
    (state) => state.assignFacultySubjectEditPost
  );

  const {
    assignFacSubGenerate,
    loading: loadingGenerate,
    error: assignFacSubGenerateError,
  } = useSelector((state) => state.assignFacultySubjectGenerate);

  if (singleFacultyEditSuccess) {
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    dispatch({ type: ASSIGN_FACULTY_SUBJECT_EDIT_POST_RESET });
    dispatch(getListAssignFacultySubject(acaYear, programValue, classId));
  }
  if (assignFacSubGenerateError) {
    setNotify({
      isOpen: true,
      message: assignFacSubGenerateError,
      type: "error",
    });
    dispatch({ type: ASSIGN_FACULTY_SUBJECT_GENERATE_RESET });
  }

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };

  useEffect(() => {
    if (allAcademicSubjects) {
      // setTableData(academicYearCalendar.dbModelLst);
      setProgramValue(
        allAcademicSubjects?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setDdlClass(allAcademicSubjects?.searchFilterModel.ddlClass);
      setClassId(allAcademicSubjects?.searchFilterModel.ddlClass[0]?.Key);
      setAcademicYearDdl(
        allAcademicSubjects?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        allAcademicSubjects?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
    }
  }, [dispatch, allAcademicSubjects]);

  useEffect(() => {
    dispatch({ type: GET_LIST_ASSIGN_FACULTY_SUBJECT_RESET });
    dispatch(getALLAssignFacultySubject());
  }, []);

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
            x.SubjectName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const updateFacultySubjectHandler = (id) => {
    dispatch(
      getAssignFacultySubjectEditAction(id, acaYear, programValue, classId)
    );
    setOpenPopupForm(true);
  };

  const handleSelectChange = (value) => {
    dispatch(getAcademicYearCalendarProgramAction(value));
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(getListAssignFacultySubject(acaYear, programValue, classId));
    }
  };

  useEffect(() => {
    if (academicYearCalendarProgram) {
      setProgramDdl([...academicYearCalendarProgram.ddlFacultyProgramLink]);
    }
  }, [academicYearCalendarProgram]);
  useEffect(() => {
    if (academicSubjectsList) {
      setTableData(academicSubjectsList.dbModelLst);
    }
  }, [academicSubjectsList]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const validateCreate = () => {
    let temp = {};
    temp.formCheck =
      formCheck?.length < 1 ? "Please Select Atleast One Option" : "";

    setCreateErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const validateGenerate = () => {
    let temp = {};
    temp.formCheck =
      formCheck?.length < 1 ? "Please Select Atleast One Option" : "";

    setGenerateErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleAcademicYearChange = (e) => {
    handleSelectChange(e.target.value);
    setAcaYear(e.target.value);
  };

  const handleCreateClick = () => {
    if (validate()) {
      dispatch(
        getAssignFacultySubjectOptionAction(acaYear, programValue, classId)
      );
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_GENERATE_RESET });
      setOpenPopup(true);
    }
  };

  const formCheckSubmitHandler = () => {
    // if (validateTable()) {
    if (assignFacSubGenerate) {
      if (validateCreate()) {
        dispatch(
          AcademicFacultyCreateAction(
            assignFacSubGenerate.idYearFacultyProgramLink,
            assignFacSubGenerate.level,
            formCheck
          )
        );
      }
    } else {
      if (validateGenerate()) {
        dispatch(
          AcademicFacultyCreateAction(
            academicSubjects.idYearFacultyProgramLink,
            academicSubjects.level,
            formCheck
          )
        );
      }
    }
    // }
  };

  if (facultySubjectSuccess) {
    setFormCheck([]);
    dispatch({ type: ASSIGN_FACULTY_SUBJECT_POST_RESET });
    dispatch(getListAssignFacultySubject(acaYear, programValue, classId));
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
  }
  if (facultySubjectError) {
    setFormCheck([]);
    dispatch({ type: ASSIGN_FACULTY_SUBJECT_POST_RESET });
    setNotify({
      isOpen: true,
      message: facultySubjectError,
      type: "error",
    });
  }

  const generateHandler = () => {
    if (validate()) {
      dispatch(
        getAssignFacultySubjectGenerateAction(acaYear, programValue, classId)
      );
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_GET_RESET });
      setOpenPopup(true);
    }
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={4}>
              <SelectControl
                name="academic year"
                label="Academic Year"
                onChange={(e) => handleAcademicYearChange(e)}
                options={academicYearDdl}
                value={acaYear}
                errors={errors.acaYear}
              />
            </Grid>
            {/* <Grid item xs={4}>
              <SelectControl
                name="program"
                label="Program/Faculty"
                value={programValue}
                // onChange={(e) => handleProgramChange(e)}
                onChange={(e) => setProgramValue(e.target.value)}
                options={programDdl}
                errors={errors.programValue}
              />
            </Grid> */}
            <Grid item xs={4}>
              <SelectControl
                name="classes"
                label="Classes"
                onChange={(e) => setClassId(e.target.value)}
                options={ddlClass}
                value={classId}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreateClick}
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={generateHandler}
              >
                GENERATE
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
            label="Search Assign Faculty by SubjectCode"
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
            {academicSubjectsList && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <AssignFacultySubjectTableCollepse
                      item={item}
                      key={item.$id}
                      updateFacultySubjectHandler={updateFacultySubjectHandler}
                      deleteCollegeHandler={deleteCollegeHandler}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {academicSubjectsList && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add Assign Faculty Subject"
      >
        {loadingCreate ? (
          <LoadingComp />
        ) : (
          <>
            {loadingGenerate ? (
              <LoadingComp />
            ) : (
              <>
                <AssignFacultySubjectFormCreate
                  subjectOptions={
                    academicSubjects && academicSubjects.ddlSubjectModelLst
                  }
                  assignFacSubGenerate={
                    assignFacSubGenerate &&
                    assignFacSubGenerate.ddlSubjectFromClassSubject
                  }
                  setFormCheck={setFormCheck}
                  formCheck={formCheck}
                  formCheckSubmitHandler={formCheckSubmitHandler}
                  setOpenPopup={setOpenPopup}
                  createErrors={createErrors}
                  generateErrors={generateErrors}
                />
              </>
            )}
          </>
        )}
      </Popup>
      <Popup
        openPopup={openPopupForm}
        setOpenPopup={setOpenPopupForm}
        title="Edit Assign Faculty Subject"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AssignFacultySubjectFormEdit
              singleFacultySubject={
                singleFacultySubject && singleFacultySubject.model
              }
              dbModel={singleFacultySubject && singleFacultySubject.dbModel}
              idYearFacultyProgramLink={
                singleFacultySubject &&
                singleFacultySubject.idYearFacultyProgramLink
              }
              level={singleFacultySubject && singleFacultySubject.level}
              setOpenPopupForm={setOpenPopupForm}
              errors={errors}
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

export default AssignFacultySubject;
