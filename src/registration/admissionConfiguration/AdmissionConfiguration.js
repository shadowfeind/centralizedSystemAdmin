import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import Popup from "../../components/Popup";
import LoadingComp from "../../components/LoadingComp";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  CREATE_SINGLE_ADMISSION_CONFIG_RESET,
  GET_ADMISSION_CONFIG_INITIAL_DATA_RESET,
  GET_ADMISSION_CONFIG_LIST_DATA_RESET,
  GET_CREATE_SINGLE_ADMISSION_CONFIG_RESET,
  GET_SINGLE_ADMISSION_CONFIG_RESET,
  UPDATE_SINGLE_ADMISSION_CONFIG_RESET,
} from "./AdmissionConfigurationConstants";
import {
  getAdmissionConfigInitialDataAction,
  getAdmissionConfigListDataAction,
  getCreateSingleAdmissionConfigAction,
  getSingleAdmissionConfigAction,
} from "./AdmissionConfigurationActions";
import AdmissionConfigurationTableCollapse from "./AdmissionConfigurationTableCollapse";
import AdmissionConfigurationForm from "./AdmissionConfigurationForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
  customInput: {
    minWidth: "200px",
  },
}));

const tableHeader = [
  { id: "AdmissionStartDate", label: "Admission Start Date" },
  { id: "AdmissionEndDate", label: "Admission End Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AdmissionConfiguration = () => {
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [acaYear, setAcaYear] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState([]);
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
            x.AdmissionStartDate.toLowerCase().includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  const {
    getAdmissionConfigInitialData,
    error: getAdmissionConfigInitialDataError,
  } = useSelector((state) => state.getAdmissionConfigInitialData);

  const {
    getAdmissionConfigListData,
    loading,
    error: getAdmissionConfigListDataError,
  } = useSelector((state) => state.getAdmissionConfigListData);

  const { singleAdmissionConfig, loading: loadingEdit } = useSelector(
    (state) => state.getSingleAdmissionConfig
  );

  const {
    success: updateSingleAdmissionConfigSuccess,
    error: updateSingleAdmissionConfigError,
  } = useSelector((state) => state.updateSingleAdmissionConfig);

  const {
    createSingleAdmissionConfigData,
    error: createSingleAdmissionConfigDataError,
  } = useSelector((state) => state.getCreateSingleAdmissionConfig);

  const {
    success: createSingleAdmissionConfigSuccess,
    error: createSingleAdmissionConfigError,
  } = useSelector((state) => state.createSingleAdmissionConfig);

  if (getAdmissionConfigInitialDataError) {
    setNotify({
      isOpen: true,
      message: getAdmissionConfigInitialDataError,
      type: "error",
    });
    dispatch({ type: GET_ADMISSION_CONFIG_INITIAL_DATA_RESET });
  }
  if (getAdmissionConfigListDataError) {
    setNotify({
      isOpen: true,
      message: getAdmissionConfigListDataError,
      type: "error",
    });
    dispatch({ type: GET_ADMISSION_CONFIG_LIST_DATA_RESET });
  }
  if (updateSingleAdmissionConfigError) {
    setNotify({
      isOpen: true,
      message: updateSingleAdmissionConfigError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ADMISSION_CONFIG_RESET });
    setOpenPopup(false);
  }
  if (updateSingleAdmissionConfigSuccess) {
    setNotify({
      isOpen: true,
      message: "Update Succesfully",
      type: "success",
    });
    dispatch({ type: UPDATE_SINGLE_ADMISSION_CONFIG_RESET });
    if (getAdmissionConfigListData) {
      dispatch(
        getAdmissionConfigListDataAction(
          getAdmissionConfigListData.searchFilterModel.idAcademicYear,
          getAdmissionConfigListData.searchFilterModel.idFacultyProgramLink
        )
      );
    }

    setOpenPopup(false);
  }
  if (createSingleAdmissionConfigDataError) {
    setNotify({
      isOpen: true,
      message: createSingleAdmissionConfigDataError,
      type: "error",
    });
    dispatch({ type: GET_CREATE_SINGLE_ADMISSION_CONFIG_RESET });
    setOpenPopup(false);
  }

  if (createSingleAdmissionConfigSuccess) {
    setNotify({
      isOpen: true,
      message: "Created Successfully",
      type: "success",
    });
    dispatch({ type: CREATE_SINGLE_ADMISSION_CONFIG_RESET });
    dispatch(getAdmissionConfigListDataAction(acaYear, programValue));
    setOpenPopup(false);
  }

  if (createSingleAdmissionConfigError) {
    setNotify({
      isOpen: true,
      message: createSingleAdmissionConfigError,
      type: "error",
    });
    dispatch({ type: CREATE_SINGLE_ADMISSION_CONFIG_RESET });
    setOpenPopup(false);
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "registration" });
    if (getAdmissionConfigInitialData) {
      setAcademicYearDdl(
        getAdmissionConfigInitialData?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        getAdmissionConfigInitialData?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setProgramValue(
        getAdmissionConfigInitialData?.searchFilterModel
          .ddlFacultyProgramLink[0]?.Key
      );
    }
  }, [getAdmissionConfigInitialData, dispatch]);

  useEffect(() => {
    dispatch({ type: GET_ADMISSION_CONFIG_LIST_DATA_RESET });
    dispatch(getAdmissionConfigInitialDataAction());
  }, []);

  useEffect(() => {
    if (getAdmissionConfigListData) {
      setTableData(getAdmissionConfigListData.dbModelLst);
    }
  }, [getAdmissionConfigListData]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(getAdmissionConfigListDataAction(acaYear, programValue));
    }
  };

  const updateAdmissionConfig = (id, year, program) => {
    dispatch({ type: GET_CREATE_SINGLE_ADMISSION_CONFIG_RESET });
    dispatch(getSingleAdmissionConfigAction(id, year, program));
    setOpenPopup(true);
  };

  const handleCreateClick = () => {
    if (validate()) {
      dispatch(getCreateSingleAdmissionConfigAction(acaYear, programValue));
      setOpenPopup(true);
      dispatch({ type: GET_SINGLE_ADMISSION_CONFIG_RESET });
    }
  };

  const onChangeHandler = (year) => {
    setAcaYear(year);
    dispatch(getAdmissionConfigListDataAction(year, programValue));
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="academic year"
                label="Academic Year"
                onChange={(e) => onChangeHandler(e.target.value)}
                options={academicYearDdl}
                value={acaYear}
                errors={errors.acaYear}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="program"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={programDdl}
                errors={errors.programValue}
              />
            </Grid> */}

            <Grid item xs={3}>
              {getAdmissionConfigListData?.dbModelLst?.length === 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: "10px 0 0 10px" }}
                  onClick={handleCreateClick}
                >
                  CREATE
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={listSearchHandler}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Admission Configuration By AdmissionStartDate"
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
            {getAdmissionConfigListData && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item) => (
                    <AdmissionConfigurationTableCollapse
                      item={item}
                      key={item.$id}
                      updateAdmissionConfig={updateAdmissionConfig}
                      year={
                        getAdmissionConfigListData &&
                        getAdmissionConfigListData.searchFilterModel
                          .idAcademicYear
                      }
                      program={
                        getAdmissionConfigListData &&
                        getAdmissionConfigListData.searchFilterModel
                          .idFacultyProgramLink
                      }
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {getAdmissionConfigListData && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Counter Configuration Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AdmissionConfigurationForm
              updateAcademicConfig={
                singleAdmissionConfig && singleAdmissionConfig
              }
              createAcademicConfig={
                createSingleAdmissionConfigData &&
                createSingleAdmissionConfigData
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

export default AdmissionConfiguration;
