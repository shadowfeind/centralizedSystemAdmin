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
  getAcademicProgramOptionAction,
  getAllAcademicProgramAction,
  getSingleAcademicProgramAction,
} from "./AcademicProgramActions";
import {
  ACADEMIC_PROGRAM_CREATE_RESET,
  GET_ACADEMIC_PROGRAM_OPTION_RESET,
  GET_ALL_ACADEMIC_PROGRAM_RESET,
  GET_SINGLE_ACADEMIC_PROGRAM_RESET,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_RESET,
} from "./AcademicProgramConstants";
import AcademicProgramTableCollapse from "./AcademicProgramTableCollapse";
import AcademicProgramForm from "./AcademicProgramForm";

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
  { id: "AcademicProgramName", label: "Academic Program Name" },
  { id: "Description", label: "Description" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicProgram = () => {
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

  const { academicProgram, error, loading } = useSelector(
    (state) => state.academicProgram
  );

  const {
    success: createAcademicProgramSuccess,
    error: createAcademicProgramError,
  } = useSelector((state) => state.createAcademicProgram);

  const {
    singleAcademicProgram,
    loading: loadingEdit,
    error: singleAcademicProgramError,
  } = useSelector((state) => state.getSingleAcademicProgram);

  const {
    success: updateSingleAcademicProgramSuccess,
    error: updateSingleAcademicProgramErrpr,
  } = useSelector((state) => state.updateSingleAcademicProgram);
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACADEMIC_PROGRAM_RESET });
  }
  if (createAcademicProgramError) {
    setNotify({
      isOpen: true,
      message: createAcademicProgramError,
      type: "error",
    });
    dispatch({ type: ACADEMIC_PROGRAM_CREATE_RESET });
  }
  if (singleAcademicProgramError) {
    setNotify({
      isOpen: true,
      message: singleAcademicProgramError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ACADEMIC_PROGRAM_RESET });
  }
  if (updateSingleAcademicProgramErrpr) {
    setNotify({
      isOpen: true,
      message: updateSingleAcademicProgramErrpr,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_PROGRAM_RESET });
  }

  if (createAcademicProgramSuccess) {
    dispatch(getAllAcademicProgramAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ACADEMIC_PROGRAM_CREATE_RESET });
  }

  if (updateSingleAcademicProgramSuccess) {
    dispatch(getAllAcademicProgramAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_PROGRAM_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleAcademicProgramAction(id));
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
    if (academicProgram) {
      setTableData(academicProgram.dbModelLst);
    }
  }, [dispatch, academicProgram]);

  useEffect(() => {
    dispatch(getAllAcademicProgramAction());
    dispatch(getAcademicProgramOptionAction());
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
            x.AcademicProgramName.toLowerCase().includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ACADEMIC_PROGRAM_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Academic Program By Academic Program Name"
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
                  <AcademicProgramTableCollapse
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
        title="Academic Program Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AcademicProgramForm
              academicProgram={
                singleAcademicProgram && singleAcademicProgram.dbModel
              }
              selected={singleAcademicProgram && singleAcademicProgram.selected}
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

export default AcademicProgram;
