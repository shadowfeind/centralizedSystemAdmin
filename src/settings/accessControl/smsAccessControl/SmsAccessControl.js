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
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import LoadingComp from "../../../components/LoadingComp";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import {
  GET_ALL_SMS_ACCESS_CONTROL_RESET,
  GET_LIST_SMS_ACCESS_CONTROL_RESET,
  GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_RESET,
  GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_RESET,
  POST_SMS_ACCESS_CONTROL_RESET,
  PUT_SMS_ACCESS_CONTROL_RESET,
} from "./SmsAccessControlConstants";
import {
  getAllSmsAccessControlAction,
  getListSmsAccessControlAction,
  getSingleCreateSmsAccessControlAction,
  getSingleEditSmsAccessControlAction,
} from "./SmsAccessControlActions";
import SmsAccessControlTableCollapse from "./SmsAccessControlTableCollapse";
import SmsAccessControlForm from "./SmsAccessControlForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "SMSHeader", label: "SMS Header" },
  { id: "School", label: "School" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const SmsAccessControl = () => {
  const [tableData, setTableData] = useState([]);
  const [company, setCompany] = useState("");
  const [companyDdl, setCompanyDdl] = useState([]);
  const [errors, setErrors] = useState({});
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

  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.SMSHeader.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const { allSmsAccessControl, error } = useSelector(
    (state) => state.getAllSmsAccessControl
  );

  const {
    listSmsAccessControl,
    error: listSmsAccessControlError,
    loading,
  } = useSelector((state) => state.getListSmsAccessControl);

  const {
    singleCreateSmsAccessControl,
    success: singleCreateSmsAccessControlSuccess,
    error: singleCreateSmsAccessControlError,
  } = useSelector((state) => state.getSingleToCreateSmsAccessControl);

  const {
    singleEditSmsAccessControl,
    success: singleEditSmsAccessControlSuccess,
    error: singleEditSmsAccessControlError,
    loadingEdit,
  } = useSelector((state) => state.getSingleToEditSmsAccessControl);

  const {
    success: postSmsAccessControlSuccess,
    error: postSmsAccessControlError,
  } = useSelector((state) => state.postSmsAccessControl);

  const {
    success: putSmsAccessControlSuccess,
    error: putSmsAccessControlError,
  } = useSelector((state) => state.putSmsAccessControl);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_SMS_ACCESS_CONTROL_RESET });
  }

  if (listSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: listSmsAccessControlError,
      type: "error",
    });
    dispatch({ type: GET_LIST_SMS_ACCESS_CONTROL_RESET });
  }

  if (singleCreateSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: singleCreateSmsAccessControlError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_RESET });
  }

  if (singleEditSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: singleEditSmsAccessControlError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_RESET });
  }

  if (postSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: postSmsAccessControlError,
      type: "error",
    });
    dispatch({ type: POST_SMS_ACCESS_CONTROL_RESET });
  }

  if (putSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: putSmsAccessControlError,
      type: "error",
    });
    dispatch({ type: PUT_SMS_ACCESS_CONTROL_RESET });
  }

  if (postSmsAccessControlSuccess) {
    setNotify({
      isOpen: true,
      message: "Sms Access Control Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getListSmsAccessControlAction(company));
    dispatch({ type: POST_SMS_ACCESS_CONTROL_RESET });
  }

  if (putSmsAccessControlSuccess) {
    setNotify({
      isOpen: true,
      message: "Sms Access Control Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getListSmsAccessControlAction(company));
    dispatch({ type: PUT_SMS_ACCESS_CONTROL_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/settings" });
    if (allSmsAccessControl) {
      setCompanyDdl(allSmsAccessControl?.searchFilterModel.ddlCompany);
      setCompany(allSmsAccessControl?.searchFilterModel.ddlCompany[0].Key);
    }
  }, [dispatch, allSmsAccessControl]);

  useEffect(() => {
    dispatch({ type: GET_LIST_SMS_ACCESS_CONTROL_RESET });
    dispatch(getAllSmsAccessControlAction());
  }, []);

  const validate = () => {
    let temp = {};
    temp.company = !company ? "This Field is Required" : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    if (listSmsAccessControl) {
      setTableData(listSmsAccessControl.dbModelLst);
    }
  }, [listSmsAccessControl]);

  const createHandler = () => {
    if (validate()) {
      dispatch(getSingleCreateSmsAccessControlAction(company));
      dispatch({ type: GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_RESET });
      setOpenPopup(true);
    }
  };

  const updateSMSHandler = (id, company) => {
    dispatch(getSingleEditSmsAccessControlAction(id, company));
    setOpenPopup(true);
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(getListSmsAccessControlAction(company));
    }
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="company"
                label="School List"
                onChange={(e) => setCompany(e.target.value)}
                options={companyDdl}
                value={company}
                errors={errors.company}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={listSearchHandler}
              >
                SEARCH
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                style={{ margin: "10px 0 0 10px" }}
                className={classes.button}
                onClick={createHandler}
              >
                Create{" "}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Sms Access Control By SMS Header"
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
            {listSmsAccessControl && (
              <TableContainer className={classes.table}>
                <TblHead />
                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <SmsAccessControlTableCollapse
                      item={item}
                      key={item.$id}
                      updateSMSHandler={updateSMSHandler}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {listSmsAccessControl && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="SMS Access Control Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <SmsAccessControlForm
              smsCreate={
                singleCreateSmsAccessControl && singleCreateSmsAccessControl
              }
              smsEdit={singleEditSmsAccessControl && singleEditSmsAccessControl}
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

export default SmsAccessControl;
