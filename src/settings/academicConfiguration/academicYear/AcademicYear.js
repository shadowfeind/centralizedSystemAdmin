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
import Popup from "../../../components/Popup";
import LoadingComp from "../../../components/LoadingComp";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import {
  getAcademicYearOptionAction,
  getAllAcademicYearAction,
  getSingleAcademicYearAction,
} from "./AcademicYearActions";
import {
  ACADEMIC_YEAR_CREATE_RESET,
  GET_ALL_ACADEMIC_YEAR_RESET,
  GET_SINGLE_ACADEMIC_YEAR_RESET,
  UPDATE_SINGLE_ACADEMIC_YEAR_RESET,
} from "./AcademicYearConstant";
import AcademicYearTableCollapse from "./AcademicYearTableCollapse";
import AcademicYearForm from "./AcademicYearForm";

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
  { id: "AcademicYearName", label: "Academic Year Name" },
  { id: "AcademicYearCode", label: "Academic Year Code" },
  { id: "StartDate", label: "Start Date" },
  { id: "EndDate", label: "End Date" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicYear = () => {
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

  const { academicYear, error, loading } = useSelector(
    (state) => state.academicYear
  );

  const { success: createAcademicYearSuccess, error: createAcademicYearError } =
    useSelector((state) => state.createAcademicYear);

  const {
    singleAcademicYear,
    loading: loadingEdit,
    error: singleAcademicYearError,
  } = useSelector((state) => state.getSingleAcademicYear);

  const { success: updateSingleAcademicYearSuccess } = useSelector(
    (state) => state.updateSingleAcademicYear
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACADEMIC_YEAR_RESET });
  }
  if (createAcademicYearError) {
    setNotify({
      isOpen: true,
      message: createAcademicYearError,
      type: "error",
    });
    dispatch({ type: ACADEMIC_YEAR_CREATE_RESET });
  }
  if (singleAcademicYearError) {
    setNotify({
      isOpen: true,
      message: singleAcademicYearError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_RESET });
  }

  if (createAcademicYearSuccess) {
    dispatch(getAllAcademicYearAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ACADEMIC_YEAR_CREATE_RESET });
  }

  if (updateSingleAcademicYearSuccess) {
    dispatch(getAllAcademicYearAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_YEAR_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleAcademicYearAction(id));
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
    if (academicYear) {
      setTableData(academicYear.dbModelLst);
    }
  }, [dispatch, academicYear]);

  useEffect(() => {
    dispatch(getAllAcademicYearAction());
    dispatch(getAcademicYearOptionAction());
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
            x.AcademicYearName.toLowerCase().includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Academic Year By Academic Year Name"
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
                  <AcademicYearTableCollapse
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
        title="Academic Year Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AcademicYearForm
              academicYear={singleAcademicYear && singleAcademicYear.dbModel}
              selected={singleAcademicYear && singleAcademicYear.selected}
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

export default AcademicYear;
