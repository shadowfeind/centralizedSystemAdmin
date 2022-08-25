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
  checkAcademicYearForStudentAction,
  getCreateSingleStudentRegistrationDataAction,
  getInitialStudentRegistrationDataAction,
  getSingleStudentRegistrationDataAction,
  getStudentRegistrationDataAction,
} from "./StudentRegistrationActions";
import StudentRegistrationTableCollapse from "./StudentRegistrationTableCollapse";
import StudentRegistrationForm from "./StudentRegistrationForm";
import {
  CREATE_SINGLE_STUDENT_REGISTRATION_RESET,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_RESET,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_RESET,
  GET_STUDENT_REGISTRATION_DATA_RESET,
  SINGLE_STUDENT_REGISTRATION_EDIT_RESET,
} from "./StudentRegistrationConstants";

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
  { id: "RegistrationKey", label: "Reg Key" },
  { id: "FirstName", label: "Student Name" },
  { id: "MobileNo", label: "Contact No" },
  { id: "EmailAddress", label: "Email ID" },
  { id: "Status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const StudentRegistration = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  const [errors, setErrors] = useState([]);
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

  const dispatch = useDispatch();
  const classes = useStyles();

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
            x.FirstName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { studentRegistrationInitialData } = useSelector(
    (state) => state.getInitialStudentRegistrationData
  );

  const { studentRegistration, loading } = useSelector(
    (state) => state.getStudentRegistrationData
  );

  const { singleStudentRegistration, loading: loadingEdit } = useSelector(
    (state) => state.getSingleStudentRegistrationData
  );

  const { data: checkAcademicYearForStudentData } = useSelector(
    (state) => state.checkAcademicYearForStudent
  );

  const { success: editSuccess } = useSelector(
    (state) => state.singleStudentRegistrationEdit
  );

  const { success: createSingleStudentRegistrationSuccess } = useSelector(
    (state) => state.createSingleStudentRegistration
  );

  const { getCreateSingleStudentData, error: getCreateSingleStudentDataError } =
    useSelector((state) => state.getCreateSingleStudentRegistrationData);

  if (getCreateSingleStudentDataError) {
    setNotify({
      isOpen: true,
      message: getCreateSingleStudentDataError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_RESET });
  }

  if (editSuccess) {
    dispatch({ type: SINGLE_STUDENT_REGISTRATION_EDIT_RESET });
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getStudentRegistrationDataAction(acaYear, programValue, classId));
  }

  if (createSingleStudentRegistrationSuccess) {
    dispatch({ type: CREATE_SINGLE_STUDENT_REGISTRATION_RESET });
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getStudentRegistrationDataAction(acaYear, programValue, classId));
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "registration" });
    if (studentRegistrationInitialData) {
      setAcademicYearDdl(
        studentRegistrationInitialData?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        studentRegistrationInitialData?.searchFilterModel.ddlAcademicYear[0]
          ?.Key
      );
      setProgramValue(
        studentRegistrationInitialData?.searchFilterModel
          .ddlFacultyProgramLink[0]?.Key
      );
      setDdlClass(studentRegistrationInitialData?.searchFilterModel.ddlClass);
      setClassId(
        studentRegistrationInitialData?.searchFilterModel.ddlClass[0]?.Key
      );
      dispatch(
        checkAcademicYearForStudentAction(
          studentRegistrationInitialData?.searchFilterModel.ddlAcademicYear[0]
            ?.Key,
          studentRegistrationInitialData?.searchFilterModel
            .ddlFacultyProgramLink[0]?.Key
        )
      );
    }
  }, [dispatch, studentRegistrationInitialData]);

  useEffect(() => {
    dispatch({ type: GET_STUDENT_REGISTRATION_DATA_RESET });
    dispatch(getInitialStudentRegistrationDataAction());
  }, []);

  useEffect(() => {
    if (studentRegistration) {
      setTableData(studentRegistration.dbModelLst);
    }
  }, [studentRegistration]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleStudentSearch = () => {
    if (validate()) {
      dispatch(
        getStudentRegistrationDataAction(acaYear, programValue, classId)
      );
    }
  };

  const handleCreate = () => {
    if (validate()) {
      dispatch(getCreateSingleStudentRegistrationDataAction());
      setOpenPopup(true);
      dispatch({ type: GET_SINGLE_STUDENT_REGISTRATION_DATA_RESET });
    }
  };

  const onChangeHandler = (year) => {
    setAcaYear(year);
    dispatch(checkAcademicYearForStudentAction(year, programValue));
  };
  // if(checkAcademicYearForStudentData){
  //   console.log(checkAcademicYearForStudentData.data);
  // }

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
                onChange={(e) => onChangeHandler(e.target.value)}
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
                onChange={(e) => setClassId(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleStudentSearch}
              >
                SEARCH
              </Button>
              {checkAcademicYearForStudentData &&
                checkAcademicYearForStudentData === "Date exists !!!" && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ margin: "10px 0 0 10px" }}
                    onClick={handleCreate}
                  >
                    CREATE
                  </Button>
                )}
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Student Registration By FullName"
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
            {studentRegistration && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item, index) => (
                    <StudentRegistrationTableCollapse
                      index={index}
                      item={item}
                      key={item.$id}
                      year={
                        studentRegistration &&
                        studentRegistration.searchFilterModel.idAcademicYear
                      }
                      program={
                        studentRegistration &&
                        studentRegistration.searchFilterModel
                          .idFacultyProgramLink
                      }
                      classId={
                        studentRegistration &&
                        studentRegistration.searchFilterModel.idClass
                      }
                      selectedIndex={selectedIndex}
                      singleStudent={
                        singleStudentRegistration &&
                        singleStudentRegistration.dbModel
                      }
                      studentImage={
                        singleStudentRegistration &&
                        singleStudentRegistration?.FullPath
                      }
                      setSelectedIndex={setSelectedIndex}
                      setOpenPopup={setOpenPopup}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}

            {studentRegistration && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Student Registration Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <StudentRegistrationForm
              acaYear={acaYear && acaYear}
              classId={classId && classId}
              singleStudent={
                singleStudentRegistration && singleStudentRegistration
              }
              getCreateSingleStudentData={getCreateSingleStudentData}
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

export default StudentRegistration;
