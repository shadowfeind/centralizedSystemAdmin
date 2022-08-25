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
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PositionForm from "./PositionForm";
import LoadingComp from "../../../components/LoadingComp";

import {
  deletePositionAction,
  getAllPositionAction,
  getSinglePositionAction,
} from "./PositionActions";
import PositionTableCollapse from "./PositionTableCollapse";
import {
  GET_SINGLE_POSITION_RESET,
  POSITION_CREATE_RESET,
  UPDATE_SINGLE_POSITION_RESET,
  GET_ALL_POSITION_RESET,
  DELETE_POSITION_RESET,
} from "./PositionConstatns";
import PositionDeleteForm from "./PositionDeleteForm";

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
  { id: "PositionHead", label: "Position Head" },
  { id: "PositionDescription", label: "Position Description" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "All", disableSorting: true },
];

const Position = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
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

  const { position, error, loading } = useSelector((state) => state.position);

  const { success: createPositionSuccess, error: createPositionError } =
    useSelector((state) => state.createPosition);

  const {
    position: singlePosition,
    error: singlePositionError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSinglePosition);

  const {
    success: updateSinglePositionSuccess,
    error: updateSinglePositionError,
  } = useSelector((state) => state.updateSinglePosition);

  const { success: deletePositionSuccess, error: deletePositionError } =
    useSelector((state) => state.deletePosition);

  if (error) {
    dispatch({ type: GET_ALL_POSITION_RESET });
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  }

  if (createPositionSuccess) {
    dispatch(getAllPositionAction());
    setNotify({
      isOpen: true,
      message: "Position Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: POSITION_CREATE_RESET });
  }

  if (createPositionError) {
    setNotify({
      isOpen: true,
      message: createPositionError,
      type: "error",
    });
    dispatch({ type: POSITION_CREATE_RESET });
  }

  if (deletePositionError) {
    setNotify({
      isOpen: true,
      message: deletePositionError,
      type: "error",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_POSITION_RESET });
  }

  if (singlePositionError) {
    setNotify({
      isOpen: true,
      message: singlePositionError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_POSITION_RESET });
  }

  if (updateSinglePositionSuccess) {
    dispatch(getAllPositionAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_POSITION_RESET });
  }

  if (deletePositionSuccess) {
    dispatch(getAllPositionAction());
    setNotify({
      isOpen: true,
      message: "Deleted Succesfully",
      type: "success",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_POSITION_RESET });
  }

  if (updateSinglePositionError) {
    setNotify({
      isOpen: true,
      message: updateSinglePositionError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_POSITION_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSinglePositionAction(id));
    setOpenPopup(true);
  };

  const deleteCollegeHandler = (id) => {
    dispatch(getSinglePositionAction(id));
    setOpenDeletePopup(true);
  };

  useEffect(() => {
    if (position) {
      setTableData(position.hrPositionModelLst);
    }
  }, [dispatch, position]);

  useEffect(() => {
    dispatch(getAllPositionAction());
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
            x.PositionHead.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_POSITION_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Position By Position Head"
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
                  <PositionTableCollapse
                    item={item}
                    key={item.$id}
                    updateCollegeHandler={updateCollegeHandler}
                    deleteCollegeHandler={deleteCollegeHandler}
                    setOpenPopup={setOpenPopup}
                    setOpenDeletePopup={setOpenDeletePopup}
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
        title="Position Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <PositionForm
              position={singlePosition && singlePosition.dbModel}
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openDeletePopup}
        setOpenPopup={setOpenDeletePopup}
        title="Position Delete Form"
      >
        <PositionDeleteForm
          positionDelete={singlePosition && singlePosition.dbModel}
          setOpenDeletePopup={setOpenDeletePopup}
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

export default Position;
