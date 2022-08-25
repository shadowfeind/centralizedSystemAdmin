import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import LoadingComp from "../../../components/LoadingComp";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import AcademicSubjectForm from "./AcademicSubjectForm";

import {
  getAllAcademicSubjectAction,
  getSingleAcademicSubjectAction,
} from "./AcademicSubjectActions";

import AcademicSubjectTableCollepse from "./AcademicSubjectTableCollepse";
import {
  GET_SINGLE_ACADEMIC_SUBJECT_RESET,
  ACADEMIC_SUBJECT_CREATE_RESET,
  UPDATE_SINGLE_ACADEMIC_SUBJECT_RESET,
  GET_ALL_ACADEMIC_SUBJECT_RESET,
} from "./AcademicSubjectConstants";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const tableHeader = [
  { id: "SubjectName", label: "Subject Name" },
  { id: "SubjectCode", label: "Subject Code" },
  { id: "IsCompulsory", label: "Compulsory" },
  { id: "IsOptional", label: "Optional" },
  { id: "IsPractical", label: "Practical" },
  { id: "IsTheoritical", label: "Theoritical" },
  { id: "IsShowInLedger", label: "ShowInLedger" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicSubject = () => {
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

  const classes = useStyles();

  const dispatch = useDispatch();

  const { error, academicSubject, loading } = useSelector(
    (state) => state.academicSubject
  );

  const {
    academicSubject: singleAcademicSubject,
    loading: loadingEdit,
    error: getSingleAcademicSubjectError,
  } = useSelector((state) => state.getSingleAcademicSubject);

  const {
    success: createAcademicSubjectSuccess,
    error: createAcademicSubjectError,
  } = useSelector((state) => state.createAcademicSubject);

  const {
    success: updateSingleAcademicSubjectSuccess,
    error: updateSingleAcademicSubjectError,
  } = useSelector((state) => state.updateSingleAcademicSubject);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACADEMIC_SUBJECT_RESET });
  }

  if (createAcademicSubjectError) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: ACADEMIC_SUBJECT_CREATE_RESET });
  }

  if (getSingleAcademicSubjectError) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ACADEMIC_SUBJECT_RESET });
  }

  if (updateSingleAcademicSubjectError) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_SUBJECT_RESET });
  }

  if (createAcademicSubjectSuccess) {
    dispatch(getAllAcademicSubjectAction());
    setNotify({
      isOpen: true,
      message: "Academic Subject Created Successfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ACADEMIC_SUBJECT_CREATE_RESET });
  }

  if (updateSingleAcademicSubjectSuccess) {
    dispatch(getAllAcademicSubjectAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_SUBJECT_RESET });
  }

  useEffect(() => {
    if (academicSubject) {
      setTableData(academicSubject.dbModelLst);
    }
  }, [dispatch, academicSubject]);

  useEffect(() => {
    dispatch(getAllAcademicSubjectAction());
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
            x.SubjectCode.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ACADEMIC_SUBJECT_RESET });
    setOpenPopup(true);
  };

  const updateCollegeHandler = (id) => {
    dispatch(getSingleAcademicSubjectAction(id));
    setOpenPopup(true);
  };
  const deleteCollegeHandler = () => {};

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Academic Subject By Subject Code"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.button}
            onClick={addHandler}
          >
            Add{" "}
          </Button>
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            <TableContainer className={classes.table}>
              <TblHead />

              <TableBody>
                {tableDataAfterPagingAndSorting().map((item) => (
                  <AcademicSubjectTableCollepse
                    item={item}
                    key={item.$id}
                    updateCollegeHandler={updateCollegeHandler}
                    deleteCollegeHandler={deleteCollegeHandler}
                  />
                ))}
              </TableBody>
            </TableContainer>
            <TblPagination />
          </>
        )}
      </CustomContainer>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Academic Subject"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AcademicSubjectForm
              academicSubject={
                singleAcademicSubject && singleAcademicSubject.dbModel
              }
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

export default AcademicSubject;
