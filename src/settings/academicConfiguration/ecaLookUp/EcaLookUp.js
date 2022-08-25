import React, { useState, useEffect } from "react";
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
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  GET_ALL_ECA_LOOK_UP_RESET,
  GET_LIST_ECA_LOOK_UP_RESET,
  GET_SINGLE_CREATE_ECA_LOOK_UP_RESET,
  GET_SINGLE_EDIT_ECA_LOOK_UP_RESET,
  POST_ECA_LOOK_UP_RESET,
  PUT_ECA_LOOK_UP_RESET,
} from "./EcaLookUpConstants";
import {
  getAllEcaLookUpAction,
  getListEcaLookUpAction,
  getSingleCreateEcaLookUpAction,
  getSingleEditEcaLookUpAction,
} from "./EcaLookUpActions";
import EcaLookUpTableCollapse from "./EcaLookUpTableCollapse";
import EcaLookUpForm from "./EcaLookUpForm";

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
  { id: "ECAName", label: "ECA Name" },
  { id: "ECADescription", label: "ECA Description" },
  // { id: "IDHRCompany", label: "Company" },
  { id: "Created_On", label: "Created_On" },
  { id: "Updated_On", label: "Updated_On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const EcaLookUp = () => {
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

  const classes = useStyles();

  const dispatch = useDispatch();

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
            x.ECAName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { allEcaLookUp, error } = useSelector((state) => state.getAllEcaLookUp);

  const { error: listEcaLookUpError } = useSelector(
    (state) => state.getListEcaLookUp
  );

  const {
    singleCreateEcaLookUp,
    success: singleCreateEcaLookUpSuccess,
    error: singleCreateEcaLookUpError,
  } = useSelector((state) => state.getSingleCreateEcaLookUp);

  const {
    singleEditEcaLookUp,
    success: singleEditEcaLookUpSuccess,
    error: singleEditEcaLookUpError,
  } = useSelector((state) => state.getSingleEditEcaLookUp);

  const { success: postEcaLookUpSuccess, error: postEcaLookUpError } =
    useSelector((state) => state.postEcaLookUp);

  const { success: putEcaLookUpSuccess, error: putEcaLookUpError } =
    useSelector((state) => state.putEcaLookUp);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ECA_LOOK_UP_RESET });
  }

  if (listEcaLookUpError) {
    setNotify({
      isOpen: true,
      message: listEcaLookUpError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ECA_LOOK_UP_RESET });
  }

  if (singleCreateEcaLookUpError) {
    setNotify({
      isOpen: true,
      message: singleCreateEcaLookUpError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: GET_SINGLE_CREATE_ECA_LOOK_UP_RESET });
  }

  if (singleEditEcaLookUpError) {
    setNotify({
      isOpen: true,
      message: singleEditEcaLookUpError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: GET_SINGLE_EDIT_ECA_LOOK_UP_RESET });
  }

  if (putEcaLookUpError) {
    setNotify({
      isOpen: true,
      message: putEcaLookUpError,
      type: "error",
    });
    dispatch({ type: PUT_ECA_LOOK_UP_RESET });
    setOpenPopup(false);
  }

  if (postEcaLookUpError) {
    setNotify({
      isOpen: true,
      message: postEcaLookUpError,
      type: "error",
    });
    dispatch({ type: POST_ECA_LOOK_UP_RESET });
    setOpenPopup(false);
  }

  if (putEcaLookUpSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch(getAllEcaLookUpAction());
    dispatch({ type: PUT_ECA_LOOK_UP_RESET });
    setOpenPopup(false);
  }

  if (postEcaLookUpSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({ type: POST_ECA_LOOK_UP_RESET });
    dispatch(getAllEcaLookUpAction());
    setOpenPopup(false);
  }

  useEffect(() => {
    if (allEcaLookUp) {
      setTableData(allEcaLookUp.dbModelLst);
    }
  }, [dispatch, allEcaLookUp]);

  const createHandler = () => {
    dispatch(getSingleCreateEcaLookUpAction());
    dispatch({ type: GET_SINGLE_EDIT_ECA_LOOK_UP_RESET });
    setOpenPopup(true);
  };

  const updateEcaHandler = (id) => {
    dispatch(getSingleEditEcaLookUpAction(id));
    dispatch({ type: GET_SINGLE_CREATE_ECA_LOOK_UP_RESET });
    setOpenPopup(true);
  };

  useEffect(() => {
    if (singleCreateEcaLookUpSuccess) {
      setOpenPopup(true);
    }
  }, [singleCreateEcaLookUpSuccess]);

  useEffect(() => {
    if (singleEditEcaLookUpSuccess) {
      setOpenPopup(true);
    }
  }, [singleEditEcaLookUpSuccess]);

  useEffect(() => {
    dispatch(getAllEcaLookUpAction());
  }, []);

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search ECA LookUp By ECA Name"
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
            onClick={createHandler}
          >
            Create{" "}
          </Button>
        </Toolbar>
        <TableContainer className={classes.table}>
          <TblHead />
          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <EcaLookUpTableCollapse
                item={item}
                key={item.$id}
                updateEcaHandler={updateEcaHandler}
                setOpenPopup={setOpenPopup}
              />
            ))}
          </TableBody>
        </TableContainer>
        <TblPagination />
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="ECA LookUp Form"
      >
        <EcaLookUpForm
          ecaLookUp={singleEditEcaLookUp && singleEditEcaLookUp}
          ecaCreate={singleCreateEcaLookUp && singleCreateEcaLookUp}
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

export default EcaLookUp;
