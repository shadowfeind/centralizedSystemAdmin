import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

import {
  getAllAcademicGradingAction,
  getSingleAcademicGradingAction,
  getSingleAcademicGradingforEditAction,
} from "./AcademicGradingActions";
import AcademicGradingTableCollapse from "./AcademicGradingTableCollapse";

import {
  CREATE_ACADEMIC_GRADING_RESET,
  GET_SINGLE_ACADEMIC_GRADING_RESET,
  GET_SINGLE_ACADEMIC_GRADING_EDIT_RESET,
  UPDATE_SINGLE_ACADEMIC_GADING_RESET,
  GET_ALL_ACADEMIC_GRADING_RESET,
} from "./AcademicGradingConstants";
import AcademicGradingForm from "./AcademicGradingForm";

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
  { id: "LetterGrade", label: "Grade" },
  { id: "HonorPoint", label: "Honor Point" },
  { id: "GradeComment", label: "Comment" },
  { id: "Created_On", label: "Created_On" },
  { id: "Updated_On", label: "Updated_On" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicGrading = () => {
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

  const { academicGrading, error } = useSelector(
    (state) => state.academicGrading
  );

  const {
    academicGradingCreate: singleAcademicGradingCreate,
    error: singleAcademicGradingCreateError,
  } = useSelector((state) => state.getSingleAcademicGrading);

  const {
    academicGradingEdit: singleAcademicGrading,
    error: singleAcademicGradingError,
  } = useSelector((state) => state.getSingleAcademicGradingforEdit);

  const {
    success: createAcademicGradingSuccess,
    error: createAcademicGradingError,
  } = useSelector((state) => state.createAcademicGrading);

  const {
    success: updateSingleAcademicGradingSuccess,
    error: updateSingleAcademicGradingError,
  } = useSelector((state) => state.updateSingleAcademicGrading);

  if (createAcademicGradingSuccess) {
    // alert("sent")
    dispatch(getAllAcademicGradingAction());
    setNotify({
      isOpen: true,
      message: "Academic Grading Created Successfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: CREATE_ACADEMIC_GRADING_RESET });
  }

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACADEMIC_GRADING_RESET });
  }

  if (createAcademicGradingError) {
    setNotify({
      isOpen: true,
      message: createAcademicGradingError,
      type: "error",
    });
    dispatch({ type: CREATE_ACADEMIC_GRADING_RESET });
  }

  if (updateSingleAcademicGradingSuccess) {
    dispatch(getAllAcademicGradingAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_GADING_RESET });
  }

  if (updateSingleAcademicGradingError) {
    setNotify({
      isOpen: true,
      message: updateSingleAcademicGradingError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_GADING_RESET });
  }

  if (singleAcademicGradingError) {
    setNotify({
      isOpen: true,
      message: singleAcademicGradingError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ACADEMIC_GRADING_EDIT_RESET });
  }

  if (singleAcademicGradingCreateError) {
    setNotify({
      isOpen: true,
      message: singleAcademicGradingCreateError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ACADEMIC_GRADING_RESET });
  }

  const addHandler = () => {
    // dispatch(getSingleAcademicGradingAction(program));
    dispatch({ type: GET_SINGLE_ACADEMIC_GRADING_EDIT_RESET });
    setOpenPopup(true);
  };

  const updateCollegeHandler = (id, program) => {
    dispatch(getSingleAcademicGradingforEditAction(id, program));
    setOpenPopup(true);
  };

  const deleteCollegeHandler = (id, program) => {};

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (!academicGrading) {
      dispatch(getAllAcademicGradingAction());
    }
    if (academicGrading) {
      setTableData(academicGrading.dbModelLst);
    }
  }, [dispatch, academicGrading]);

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
            x.LetterGrade?.toLowerCase()?.includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Academic Grading"
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
        <TableContainer className={classes.table}>
          <TblHead />

          <TableBody>
            {tableDataAfterPagingAndSorting()?.map((item) => (
              <AcademicGradingTableCollapse
                key={item.$id}
                item={item}
                updateCollegeHandler={updateCollegeHandler}
                deleteCollegeHandler={deleteCollegeHandler}
              />
            ))}
          </TableBody>
        </TableContainer>
        <TblPagination />
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Academic Grading"
      >
        <AcademicGradingForm
          academicGradingEdit={
            singleAcademicGrading && singleAcademicGrading.dbModel
          }
          academicGradingCreate={
            singleAcademicGradingCreate && singleAcademicGradingCreate.dbModel
          }
          setOpenPopup={setOpenPopup}
        />
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default AcademicGrading;
