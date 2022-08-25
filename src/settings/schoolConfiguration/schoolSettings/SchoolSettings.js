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
import SchoolSettingsTableCollapse from "./SchoolSettingsTableCollapse";
import { handleSubmit } from "./SchoolSettingsForm";

import SchoolSettingsForm from "./SchoolSettingsForm";
import {
  getAllSchoolSettingsAction,
  getSingleSchoolSettingAction,
} from "./SchoolSettingsActions";
import {
  GET_ALL_SCHOOL_SETTINGS_RESET,
  GET_SINGLE_SCHOOL_SETTINGS_RESET,
  SCHOOL_SETTINGS_CREATE_RESET,
  UPDATE_SINGLE_SCHOOL_SETTINGS_RESET,
} from "./SchoolSettingsConstants";

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
  { id: "CompanyName", label: "Company Name" },
  { id: "CompanyAddress", label: "Company Address" },
  { id: "PhoneNo", label: "Phone Number" },
  { id: "EmailID", label: "Email ID" },
  { id: "WebSite", label: "WebSite" },
  { id: "actions", label: "All", disableSorting: true },
];

const SchoolSettings = () => {
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

  const { error, schoolSettings, loading } = useSelector(
    (state) => state.schoolSettings
  );

  const { singleSchoolSetting, loading: loadingEdit } = useSelector(
    (state) => state.getSingleSchoolSettings
  );

  const {
    success: createSchoolSettingSuccess,
    error: createSchoolSettingError,
  } = useSelector((state) => state.createSchoolSettings);

  const {
    success: updateSchoolSettingSuccess,
    error: updateSchoolSettingError,
  } = useSelector((state) => state.updateSingleSchoolSettings);

  if (error) {
    dispatch({ type: GET_ALL_SCHOOL_SETTINGS_RESET });
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  }

  if (createSchoolSettingError) {
    dispatch({ type: SCHOOL_SETTINGS_CREATE_RESET });
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    setOpenPopup(false);
  }

  if (updateSchoolSettingError) {
    dispatch({ type: UPDATE_SINGLE_SCHOOL_SETTINGS_RESET });
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    setOpenPopup(false);
  }

  if (createSchoolSettingSuccess) {
    dispatch(getAllSchoolSettingsAction());
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    dispatch({ type: SCHOOL_SETTINGS_CREATE_RESET });
  }

  if (updateSchoolSettingSuccess) {
    dispatch(getAllSchoolSettingsAction());
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    dispatch({ type: UPDATE_SINGLE_SCHOOL_SETTINGS_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleSchoolSettingAction(id));
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
    if (schoolSettings) {
      setTableData(schoolSettings.dbModelLstTest);
    }
  }, [dispatch, schoolSettings]);

  useEffect(() => {
    dispatch(getAllSchoolSettingsAction());
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
            x.CompanyName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_SCHOOL_SETTINGS_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search School By Company Name"
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
                  <SchoolSettingsTableCollapse
                    item={item}
                    key={item.$id}
                    updateCollegeHandler={updateCollegeHandler}
                    deleteCollegeHandler={deleteCollegeHandler}
                  />
                ))}
              </TableBody>
            </TableContainer>
            <TblPagination />{" "}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="School Settings Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <SchoolSettingsForm
              college={singleSchoolSetting && singleSchoolSetting.dbModel}
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

export default SchoolSettings;
