import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import Popup from "../../../components/Popup";
import AddIcon from "@material-ui/icons/Add";
import LoadingComp from "../../../components/LoadingComp";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  GET_ALL_HR_VALUE_RESET,
  GET_LIST_HR_VALUE_RESET,
  GET_SINGLE_TO_CREATE_HR_VALUE_RESET,
  GET_SINGLE_TO_EDIT_HR_VALUE_RESET,
  POST_HR_VALUE_RESET,
  PUT_HR_VALUE_RESET,
} from "./HrValueConstants";
import {
  getALLHrValueAction,
  getListHrValueAction,
  getSingleCreateHrValueAction,
  getSingleEditHrValueAction,
} from "./HrValueActions";
import HrValueTableCollapse from "./HrValueTableCollapse";
import HrValueForm from "./HrValueForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  // button: {
  //   position: "absolute",
  //   right: "10px",
  // },
  customInput: {
    minWidth: "200px",
  },
}));

const tableHeader = [
  { id: "SchoolName", label: "School Name" },
  { id: "FullAddress", label: "School Address" },
  { id: "TelNo", label: "Phone Number" },
  { id: "Email", label: "Email" },
  { id: "IDHRCompany", label: "Company" },
  { id: "actions", label: "All", disableSorting: true },
];

const HrValue = () => {
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
            x.SchoolName.toLowerCase().includes(e.target.value?.toLowerCase())
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

  const { allHrValue, error } = useSelector((state) => state.getAllHrValue);

  const {
    listHrValue,
    error: listHrValueError,
    loading,
  } = useSelector((state) => state.getListHrValue);

  const {
    singleCreateHrValue,
    success: singleCreateHrValueSuccess,
    error: singleCreateHrValueError,
  } = useSelector((state) => state.getSingleToCreateHrValue);

  const {
    singleEditHrValue,
    loading: loadingEdit,
    success: singleEditHrValueSuccess,
    error: singleEditHrValueError,
  } = useSelector((state) => state.getSingleToEditHrValue);

  const { success: postUploadPhotoSuccess, error: postUploadPhotoError } =
    useSelector((state) => state.postHrValue);

  const { success: putUploadPhotoSuccess, error: putUploadPhotoError } =
    useSelector((state) => state.putHrValue);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_HR_VALUE_RESET });
  }

  if (listHrValueError) {
    setNotify({
      isOpen: true,
      message: listHrValueError,
      type: "error",
    });
    dispatch({ type: GET_LIST_HR_VALUE_RESET });
  }

  if (singleCreateHrValueError) {
    setNotify({
      isOpen: true,
      message: singleCreateHrValueError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: GET_SINGLE_TO_CREATE_HR_VALUE_RESET });
  }

  if (singleEditHrValueError) {
    setNotify({
      isOpen: true,
      message: singleEditHrValueError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: GET_SINGLE_TO_EDIT_HR_VALUE_RESET });
  }

  if (postUploadPhotoSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    dispatch({ type: POST_HR_VALUE_RESET });
    dispatch(getListHrValueAction(company));
    setOpenPopup(false);
  }

  if (putUploadPhotoSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({ type: PUT_HR_VALUE_RESET });
    dispatch(getListHrValueAction(company));
    dispatch(getALLHrValueAction());
    setOpenPopup(false);
  }

  if (postUploadPhotoError) {
    setNotify({
      isOpen: true,
      message: postUploadPhotoError,
      type: "error",
    });
    dispatch({ type: POST_HR_VALUE_RESET });
  }

  if (putUploadPhotoError) {
    setNotify({
      isOpen: true,
      message: putUploadPhotoError,
      type: "error",
    });
    dispatch({ type: PUT_HR_VALUE_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/settings" });
    if (allHrValue) {
      setCompanyDdl(allHrValue?.searchFilterModel.ddlCompany);
      setCompany(allHrValue?.searchFilterModel.ddlCompany[0].Key);
    }
  }, [dispatch, allHrValue]);

  const validate = () => {
    let temp = {};
    temp.company = !company ? "This Field is Required" : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    if (listHrValue) {
      setTableData(listHrValue.dbModelLst);
    }
  }, [listHrValue]);

  useEffect(() => {
    dispatch({ type: GET_LIST_HR_VALUE_RESET });
    dispatch(getALLHrValueAction());
  }, []);

  const createHandler = () => {
    if (validate()) {
      dispatch(getSingleCreateHrValueAction(company));
      dispatch({ type: GET_SINGLE_TO_EDIT_HR_VALUE_RESET });
      setOpenPopup(true);
    }
  };

  const updateHrValueHandler = (id, company) => {
    dispatch(getSingleEditHrValueAction(id, company));
    dispatch({ type: GET_SINGLE_TO_CREATE_HR_VALUE_RESET });
    setOpenPopup(true);
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(getListHrValueAction(company));
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
            label="Search School Value By Name"
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
            {listHrValue && (
              <TableContainer className={classes.table}>
                <TblHead />
                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <HrValueTableCollapse
                      item={item}
                      key={item.$id}
                      updateHrValueHandler={updateHrValueHandler}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {listHrValue && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Hr Value Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <HrValueForm
              hrValueCreate={singleCreateHrValue && singleCreateHrValue}
              hrValueEdit={singleEditHrValue && singleEditHrValue}
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

export default HrValue;
