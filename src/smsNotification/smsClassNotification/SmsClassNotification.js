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
import LoadingComp from "../../components/LoadingComp";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import SelectControl from "../../components/controls/SelectControl";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import SmsClassNotificationForm from "./SmsClassNotificationForm";
import SmsClassNotificationTableCollapse from "./SmsClassNotificationTableCollapse";
import {
  getAllSmsClassNotificationAction,
  getBulkSmsClassNotificationAction,
  getListSmsClassNotificationAction,
} from "./SmsClassNotificationActions";
import {
  GET_ALL_SMS_CLASS_NOTIFICATION_RESET,
  GET_BULK_SMS_CLASS_NOTIFICATION_RESET,
  GET_LIST_SMS_CLASS_NOTIFICATION_RESET,
  POST_SMS_CLASS_NOTIFICATION_RESET,
} from "./SmsClassNotificationConstants";

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
  { id: "FullName", label: "Message Sent To" },
  { id: "Messages", label: "Messages" },
  { id: "PostedDate", label: "Posted Date" },
  { id: "Action", label: "Action", disableSorting: true },
];

const SmsClassNotification = () => {
  const [academicYear, setAcademicYear] = useState([]);
  const [academicYearValue, setAcademicYearValue] = useState("");
  const [shift, setShift] = useState([]);
  const [shiftValue, setShiftValue] = useState("");
  const [program, setProgram] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [section, setSection] = useState([]);
  const [sectionValue, setSectionValue] = useState("");
  const [classOpt, setClassOpt] = useState([]);
  const [classOptValue, setClassOptValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState();
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

  const { smsClassNotification, error } = useSelector(
    (state) => state.getAllSmsClassNotification
  );

  const {
    listSmsClassNotification,
    loading,
    error: listSmsClassNotificationError,
  } = useSelector((state) => state.getListSmsClassNotification);

  const {
    bulkSmsClassNotification,
    loading: loadingBulk,
    error: bulkSmsClassNotificationError,
  } = useSelector((state) => state.getBulkSmsClassNotification);

  const {
    success: postSmsClassNotificationSuccess,
    error: postSmsClassNotificationError,
  } = useSelector((state) => state.postSmsClassNotification);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_SMS_CLASS_NOTIFICATION_RESET });
  }

  if (listSmsClassNotificationError) {
    setNotify({
      isOpen: true,
      message: listSmsClassNotificationError,
      type: "error",
    });
    dispatch({ type: GET_LIST_SMS_CLASS_NOTIFICATION_RESET });
  }

  if (bulkSmsClassNotificationError) {
    setNotify({
      isOpen: true,
      message: bulkSmsClassNotificationError,
      type: "error",
    });
    dispatch({ type: GET_BULK_SMS_CLASS_NOTIFICATION_RESET });
  }

  if (postSmsClassNotificationError) {
    setNotify({
      isOpen: true,
      message: postSmsClassNotificationError,
      type: "error",
    });
    dispatch({ type: POST_SMS_CLASS_NOTIFICATION_RESET });
  }

  if (postSmsClassNotificationSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Uploaded",
      type: "success",
    });
    dispatch({ type: POST_SMS_CLASS_NOTIFICATION_RESET });
    dispatch(
      getListSmsClassNotificationAction(
        academicYearValue,
        programValue,
        classOptValue,
        shiftValue,
        sectionValue,
        date
      )
    );
    setOpenPopup(false);
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/sms-notification" });
    if (smsClassNotification) {
      setAcademicYear(smsClassNotification?.searchFilterModel.ddlAcademicYear);
      setAcademicYearValue(
        smsClassNotification?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setShift(smsClassNotification?.searchFilterModel.ddlAcademicShift);
      setShiftValue(
        smsClassNotification?.searchFilterModel.ddlAcademicShift[0]?.Key
      );
      setProgramValue(
        smsClassNotification?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setSection(smsClassNotification?.searchFilterModel.ddlSection);
      setSectionValue(
        smsClassNotification?.searchFilterModel.ddlSection[0]?.Key
      );
      setClassOpt(smsClassNotification?.searchFilterModel.ddlClass);
      setClassOptValue(
        smsClassNotification?.searchFilterModel.ddlClass[0]?.Key
      );
      setDate(
        smsClassNotification?.searchFilterModel.currentDate?.slice(0, 10)
      );
    }
  }, [dispatch, smsClassNotification]);

  useEffect(() => {
    dispatch({ type: GET_LIST_SMS_CLASS_NOTIFICATION_RESET });
    dispatch(getAllSmsClassNotificationAction());
  }, []);

  useEffect(() => {
    if (listSmsClassNotification) {
      setTableData([...listSmsClassNotification.dbModelClassNotification]);
    }
  }, [listSmsClassNotification]);

  const validate = () => {
    let temp = {};
    temp.academicYearValue = !academicYearValue ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.shiftValue = !shiftValue ? "This feild is required" : "";
    temp.classOptValue = !classOptValue ? "This feild is required" : "";
    temp.sectionValue = !sectionValue ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  // const handleSearch = (e) => {
  //   setFilterFn({
  //     fn: (item) => {
  //       if (e.target.value === "") {
  //         return item;
  //       } else {
  //         return item.filter((x) =>
  //           x.FullName.toLowerCase().includes(e.target.value)
  //         );
  //       }
  //     },
  //   });
  // };

  const handleMessage = () => {
    if (validate()) {
      dispatch(
        getBulkSmsClassNotificationAction(
          academicYearValue,
          programValue,
          classOptValue,
          shiftValue,
          sectionValue
        )
      );
      setOpenPopup(true);
    }
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(
        getListSmsClassNotificationAction(
          academicYearValue,
          programValue,
          classOptValue,
          shiftValue,
          sectionValue,
          date
        )
      );
    }
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="academicYear"
                label="Academic Year"
                value={academicYearValue}
                onChange={(e) => setAcademicYearValue(e.target.value)}
                options={academicYear}
                errors={errors.academicYearValue}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="ddlFacultyProgramLink"
                label="Program / Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={program}
                errors={errors.programValue}
              />
            </Grid> */}
            <Grid item xs={3}>
              <SelectControl
                name="ddlClass"
                label="Class"
                value={classOptValue}
                onChange={(e) => setClassOptValue(e.target.value)}
                options={classOpt}
                errors={errors.classOptValue}
              />
            </Grid>

            <Grid item xs={3}>
              <SelectControl
                name="ddlSection"
                label="Section"
                value={sectionValue}
                onChange={(e) => setSectionValue(e.target.value)}
                options={section}
                errors={errors.sectionValue}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="ddlAcademicShift"
                label="Shift"
                value={shiftValue}
                onChange={(e) => setShiftValue(e.target.value)}
                options={shift}
                errors={errors.shiftValue}
              />
            </Grid>

            <Grid item xs={3}>
              <div style={{ marginTop: "10px" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    format="dd-MM-yyyy"
                    name="CurrentYear"
                    label="Current Year"
                    value={date}
                    onChange={(e) => {
                      const newDate = new Date(e);
                      setDate(newDate.toLocaleDateString()?.slice(0, 10));
                    }}
                    style={{ width: "80%" }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "20px 0 0 20px" }}
                onClick={handleMessage}
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "20px 0 0 20px" }}
                onClick={listSearchHandler}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {listSmsClassNotification && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <SmsClassNotificationTableCollapse
                      item={item}
                      key={item.$id}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {listSmsClassNotification && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="SMS Class Notification"
      >
        {loadingBulk ? (
          <LoadingComp />
        ) : (
          <>
            <SmsClassNotificationForm
              students={
                bulkSmsClassNotification && bulkSmsClassNotification.dbModelLst
              }
              SchoolShortName={
                bulkSmsClassNotification &&
                bulkSmsClassNotification.SchoolShortName
              }
              smsClassNotification={
                bulkSmsClassNotification && bulkSmsClassNotification.dbModel
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

export default SmsClassNotification;
