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
  getAllSchoolBoardAction,
  getSingleSchoolBoardAction,
} from "./SchoolBoardActions";
import {
  GET_ALL_SCHOOL_BOARD_RESET,
  GET_SINGLE_SCHOOL_BOARD_RESET,
  SCHOOL_BOARD_CREATE_RESET,
  UPDATE_SINGLE_SCHOOL_BOARD_RESET,
} from "./SchoolBoardConstants";
import SchoolBoardTableCollapse from "./SchoolBoardTableCollapse";
import SchoolBoardForm from "./SchoolBoardForm";

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
  { id: "UniversityName", label: "University Name" },
  { id: "Description", label: "Description" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const SchoolBoard = () => {
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

  const { schoolBoard, error, loading } = useSelector(
    (state) => state.schoolBoard
  );

  const { success: createSchoolBoardSuccess, error: createSchoolBoardError } =
    useSelector((state) => state.createSchoolBoard);

  const {
    singleSchoolBoard,
    loading: loadingEdit,
    error: singleSchoolBoardError,
  } = useSelector((state) => state.getSingleSchoolBoard);

  const {
    success: updateSchoolBoardSuccess,
    error: updateSingleSchoolBoardError,
  } = useSelector((state) => state.updateSingleSchoolBoard);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_SCHOOL_BOARD_RESET });
  }
  if (createSchoolBoardError) {
    setNotify({
      isOpen: true,
      message: createSchoolBoardError,
      type: "error",
    });
    dispatch({ type: SCHOOL_BOARD_CREATE_RESET });
  }
  if (singleSchoolBoardError) {
    setNotify({
      isOpen: true,
      message: singleSchoolBoardError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_SCHOOL_BOARD_RESET });
  }
  if (updateSingleSchoolBoardError) {
    setNotify({
      isOpen: true,
      message: updateSingleSchoolBoardError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_SCHOOL_BOARD_RESET });
  }

  if (createSchoolBoardSuccess) {
    dispatch(getAllSchoolBoardAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: SCHOOL_BOARD_CREATE_RESET });
  }

  if (updateSchoolBoardSuccess) {
    dispatch(getAllSchoolBoardAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_SCHOOL_BOARD_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleSchoolBoardAction(id));
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
    if (!schoolBoard) {
      dispatch(getAllSchoolBoardAction());
    }
    if (schoolBoard) {
      setTableData(schoolBoard.dbModelLst);
    }
  }, [dispatch, schoolBoard]);

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
            x.UniversityName.toLowerCase().includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_SCHOOL_BOARD_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search SchoolBoard By University Name"
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
                  <SchoolBoardTableCollapse
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
        title="School Board Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <SchoolBoardForm
              schoolBoard={singleSchoolBoard && singleSchoolBoard.dbModel}
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

export default SchoolBoard;
