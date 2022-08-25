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
  GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET,
  GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET,
  GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET,
  GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET,
  POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET,
  PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET,
} from "./SuperAdminConstant";
import {
  getAllSuperAdminSmsAccessControlAction,
  getListSuperAdminSmsAccessControlAction,
  getSingleCreateSuperAdminSmsAccessControlAction,
  getSingleEditSuperAdminSmsAccessControlAction,
} from "./SuperAdminActions";
import SuperAdminForm from "./SuperAdminForm";
import SuperAdminTaableCollapse from "./SuperAdminTableCollapse";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "SchoolName", label: "School Name" },
  { id: "School", label: "School" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const SuperAdmin = () => {
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

  const { allSuperAdminSmsAccessControl, error } = useSelector(
    (state) => state.getAllSuperAdminSmsAccessControl
  );

  const {
    listSuperAdminSmsAccessControl,
    error: listSuperAdminSmsAccessControlError,
    loading,
  } = useSelector((state) => state.getListSuperAdminSmsAccessControl);

  const {
    singleCreateSuperAdminSmsAccessControl,
    success: singleCreateSuperAdminSmsAccessControlSuccess,
    error: singleCreateSuperAdminSmsAccessControlError,
  } = useSelector((state) => state.getSingleToCreateSuperAdminSmsAccessControl);

  const {
    singleEditSuperAdminSmsAccessControl,
    success: singleEditSuperAdminSmsAccessControlSuccess,
    error: singleEditSuperAdminSmsAccessControlError,
    loadingEdit,
  } = useSelector((state) => state.getSingleToEditSuperAdminSmsAccessControl);

  const {
    success: postSuperAdminSmsAccessControlSuccess,
    error: postSuperAdminSmsAccessControlError,
  } = useSelector((state) => state.postSuperAdminSmsAccessControl);

  const {
    success: putSuperAdminSmsAccessControlSuccess,
    error: putSuperAdminSmsAccessControlError,
  } = useSelector((state) => state.putSuperAdminSmsAccessControl);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET });
  }

  if (listSuperAdminSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: listSuperAdminSmsAccessControlError,
      type: "error",
    });
    dispatch({ type: GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET });
  }

  if (singleCreateSuperAdminSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: singleCreateSuperAdminSmsAccessControlError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET });
  }

  if (singleEditSuperAdminSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: singleEditSuperAdminSmsAccessControlError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET });
  }

  if (postSuperAdminSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: postSuperAdminSmsAccessControlError,
      type: "error",
    });
    dispatch({ type: POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET });
  }

  if (putSuperAdminSmsAccessControlError) {
    setNotify({
      isOpen: true,
      message: putSuperAdminSmsAccessControlError,
      type: "error",
    });
    dispatch({ type: PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET });
  }

  if (postSuperAdminSmsAccessControlSuccess) {
    setNotify({
      isOpen: true,
      message: "Super Admin Sms Access Control Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getListSuperAdminSmsAccessControlAction(company));
    dispatch({ type: POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET });
  }

  if (putSuperAdminSmsAccessControlSuccess) {
    setNotify({
      isOpen: true,
      message: "Super Admin Sms Access Control Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getListSuperAdminSmsAccessControlAction(company));
    dispatch({ type: PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/settings" });
    if (allSuperAdminSmsAccessControl) {
      setCompanyDdl(allSuperAdminSmsAccessControl.searchFilterModel.ddlCompany);
    }
  }, [dispatch, allSuperAdminSmsAccessControl]);

  useEffect(() => {
    dispatch({ type: GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET });
    dispatch(getAllSuperAdminSmsAccessControlAction());
  }, []);

  const validate = () => {
    let temp = {};
    temp.company = !company ? "This Field is Required" : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    if (listSuperAdminSmsAccessControl) {
      setTableData(listSuperAdminSmsAccessControl.dbModelLst);
    }
  }, [listSuperAdminSmsAccessControl]);

  const createHandler = () => {
    if (validate()) {
      dispatch(getSingleCreateSuperAdminSmsAccessControlAction(company));
      dispatch({
        type: GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET,
      });
      setOpenPopup(true);
    }
  };

  const updateSMSHandler = (id, company) => {
    dispatch(getSingleEditSuperAdminSmsAccessControlAction(id, company));
    setOpenPopup(true);
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(getListSuperAdminSmsAccessControlAction(company));
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
            label="Search Super Admin Sms Access Control"
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
            {listSuperAdminSmsAccessControl && (
              <TableContainer className={classes.table}>
                <TblHead />
                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <SuperAdminTaableCollapse
                      item={item}
                      key={item.$id}
                      updateSMSHandler={updateSMSHandler}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {listSuperAdminSmsAccessControl && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Super Admin SMS Access Control Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <SuperAdminForm
              smsCreate={
                singleCreateSuperAdminSmsAccessControl &&
                singleCreateSuperAdminSmsAccessControl
              }
              smsEdit={
                singleEditSuperAdminSmsAccessControl &&
                singleEditSuperAdminSmsAccessControl
              }
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

export default SuperAdmin;
