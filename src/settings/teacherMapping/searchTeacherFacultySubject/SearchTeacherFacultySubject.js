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
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_RESET,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET,
  GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET,
  PUT_SEARCH_TEACHER_FAC_SUB_DATA_RESET,
} from "./SearchTeacherFacultySubjectConstants";
import {
  getAllSearchTeacherFacSubInitialDataAction,
  getAllSearchTeacherFacSubListDataAction,
  getSingleEditSearchTeacherFacSubListDataAction,
} from "./SearchTeacherFacultySubjectActions";
import SearchTeacherFacultySubjectTableCollapse from "./SearchTeacherFacultySubjectTableCollapse";
import SearchTeacherFacultySubjectForm from "./SearchTeacherFacultySubjectForm";

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
  { id: "TeacherName", label: "Teacher Name" },
  { id: "IDYearFacultyLink", label: "Academic Year" },
  { id: "Level", label: "Class" },
  { id: "SubjectName", label: "Subject" },
  { id: "Section", label: "Section" },
  { id: "IDAcademicShift", label: "Academic Shift" },
  { id: "Created_On", label: "Created On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const SearchTeacherFacultySubject = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [classId, setClassId] = useState("");
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

  const { admitCardInitialData } = useSelector(
    (state) => state.getInitialAdmitCardData
  );

  const [creationAccountSection, setCreationAccountSection] = useState([]);
  const [creationAccountSectionValue, setCreationAccountSectionValue] =
    useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { searchTeacherFacInitData, error } = useSelector(
    (state) => state.getAllSearchTeacherFacSubInitialData
  );

  const {
    singleEditSearchTeacherFacListData,
    loading: loadingEdit,
    error: singleEditSearchTeacherFacListDataError,
  } = useSelector((state) => state.getSingleEditSearchTeacherFacSubListData);

  const {
    searchTeacherFacListData,
    loading,
    error: searchTeacherFacListDataError,
  } = useSelector((state) => state.getAllSearchTeacherFacSubListData);

  const {
    success: putSearchTeacherFacSubtDataSuccess,
    error: putSearchTeacherFacSubtDataError,
  } = useSelector((state) => state.putSearchTeacherFacSubtData);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_RESET });
  }

  if (putSearchTeacherFacSubtDataError) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: PUT_SEARCH_TEACHER_FAC_SUB_DATA_RESET });
  }

  if (putSearchTeacherFacSubtDataSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully updated",
      type: "success",
    });
    dispatch({ type: PUT_SEARCH_TEACHER_FAC_SUB_DATA_RESET });
    setOpenPopup(false);
    dispatch(
      getAllSearchTeacherFacSubListDataAction(creationAccountSectionValue)
    );
  }

  if (singleEditSearchTeacherFacListDataError) {
    setNotify({
      isOpen: true,
      message: singleEditSearchTeacherFacListDataError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET });
  }

  if (searchTeacherFacListDataError) {
    setNotify({
      isOpen: true,
      message: searchTeacherFacListDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET });
  }

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  useEffect(() => {
    if (searchTeacherFacInitData) {
      setCreationAccountSection(
        searchTeacherFacInitData?.searchFilterModel?.ddlTeacher
      );
      setCreationAccountSectionValue(
        searchTeacherFacInitData?.searchFilterModel?.ddlTeacher[0]?.Key
      );
    }
  }, [searchTeacherFacInitData]);

  useEffect(() => {
    dispatch({ type: GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET });
    dispatch(getAllSearchTeacherFacSubInitialDataAction());
  }, []);

  useEffect(() => {
    if (searchTeacherFacListData) {
      setTableData(searchTeacherFacListData?.dbModelLst);
    }
  }, [searchTeacherFacListData]);
  const validate = () => {
    let temp = {};
    temp.creationAccountSectionValue = !creationAccountSectionValue
      ? "This feild is required"
      : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const test = [{ Key: "", Value: "" }];

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(
        getAllSearchTeacherFacSubListDataAction(creationAccountSectionValue)
      );
    }
  };

  const updateCollegeHandler = (
    id,
    year,
    classId,
    section,
    shift,
    idTeacher
  ) => {
    dispatch(
      getSingleEditSearchTeacherFacSubListDataAction(
        id,
        year,
        classId,
        section,
        shift,
        idTeacher
      )
    );
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={4}>
              <SelectControl
                name="creationAccountSection"
                label="Search Teacher Faculty Subject"
                value={creationAccountSectionValue}
                onChange={(e) => setCreationAccountSectionValue(e.target.value)}
                options={creationAccountSection ? creationAccountSection : test}
                errors={errors.creationAccountSectionValue}
              />
            </Grid>
            <Grid item xs={4}>
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
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {searchTeacherFacListData && (
              <TableContainer className={classes.table}>
                <TblHead />
                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item) => (
                    <SearchTeacherFacultySubjectTableCollapse
                      item={item}
                      key={item.$id}
                      year={
                        searchTeacherFacListData?.searchFilterModel
                          ?.ddlAcademicYear
                      }
                      subject={searchTeacherFacListData?.ddlFacultySubject}
                      classId={
                        searchTeacherFacListData?.searchFilterModel?.ddlClass
                      }
                      section={
                        searchTeacherFacListData?.searchFilterModel?.ddlSection
                      }
                      shift={
                        searchTeacherFacListData?.searchFilterModel
                          ?.ddlAcademicShift
                      }
                      updateCollegeHandler={updateCollegeHandler}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {searchTeacherFacListData && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Edit Single Teacher Class Subject"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <SearchTeacherFacultySubjectForm
              datas={
                singleEditSearchTeacherFacListData &&
                singleEditSearchTeacherFacListData
              }
              searchFilterModel={
                singleEditSearchTeacherFacListData &&
                singleEditSearchTeacherFacListData?.searchFilterModel
              }
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default SearchTeacherFacultySubject;
