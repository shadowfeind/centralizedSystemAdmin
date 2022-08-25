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
import {
  getAllAcademicClassAction,
  getSingleAcademicClassAction,
} from "./AcademicClassActions";
import AcademicClassTableCollapse from "./AcademicCLassTableCollapse";
import AcademicClassForm from "./AcademicClassForm";
import {
  ACADEMIC_CLASS_CREATE_RESET,
  GET_ALL_ACADEMIC_CLASS_RESET,
  GET_SINGLE_ACADEMIC_CLASS_RESET,
  UPDATE_SINGLE_ACADEMIC_CLASS_RESET,
} from "./AcademicClassConstants";

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
  { id: "ClassName", label: "Class Name" },
  { id: "ClassLocation", label: "Class Location" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicClass = () => {
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

  const { academicClass, error, loading } = useSelector(
    (state) => state.academicClass
  );

  const {
    success: academicClassCreateSuccess,
    error: academicClassCreateError,
  } = useSelector((state) => state.createAcademicClass);

  const {
    singleAcademicClass,
    error: singleAcademicClassError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleAcademicClass);

  const {
    success: updateSingleAcademicClassSuccess,
    error: updateSingleAcademicClassError,
  } = useSelector((state) => state.updateSingleAcademicClass);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACADEMIC_CLASS_RESET });
  }
  if (academicClassCreateError) {
    setNotify({
      isOpen: true,
      message: academicClassCreateError,
      type: "error",
    });
    dispatch({ type: ACADEMIC_CLASS_CREATE_RESET });
  }
  if (singleAcademicClassError) {
    setNotify({
      isOpen: true,
      message: singleAcademicClassError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ACADEMIC_CLASS_RESET });
  }
  if (updateSingleAcademicClassError) {
    setNotify({
      isOpen: true,
      message: updateSingleAcademicClassError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_CLASS_RESET });
  }

  if (academicClassCreateSuccess) {
    dispatch(getAllAcademicClassAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ACADEMIC_CLASS_CREATE_RESET });
  }

  if (updateSingleAcademicClassSuccess) {
    dispatch(getAllAcademicClassAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_CLASS_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleAcademicClassAction(id));
    setOpenPopup(true);
  };

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };

  useEffect(() => {
    dispatch(getAllAcademicClassAction());
  }, []);

  useEffect(() => {
    if (academicClass) {
      setTableData(academicClass.dbModelLst);
    }
  }, [dispatch, academicClass]);

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
            x.ClassName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ACADEMIC_CLASS_RESET });
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Academic Class By ClassName"
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
                  <AcademicClassTableCollapse
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
        title="Academic Class Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AcademicClassForm
              academicClass={singleAcademicClass && singleAcademicClass.dbModel}
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

export default AcademicClass;
