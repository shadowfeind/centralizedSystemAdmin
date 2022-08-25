import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom";
import InputControl from "../../components/controls/InputControl";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import LoadingComp from "../../components/LoadingComp";
import Popup from "../../components/Popup";
import useCustomTable from "../../customHooks/useCustomTable";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import AddIcon from "@material-ui/icons/Add";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  getAllSmsTeacherNotificationAction,
  getListSmsTeacherNotificationAction,
  getSingleCreateSmsTeacherNotificationAction,
} from "./SmsTeacherNotificationActions";
import {
  GET_ALL_SMS_TEACHER_NOTIFICATION_RESET,
  GET_LIST_SMS_TEACHER_NOTIFICATION_RESET,
  GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_RESET,
  POST_SMS_TEACHER_NOTIFICATION_RESET,
} from "./SmsTeacherNotificationConstants";
import SmsTeacherNotificationTableCollapse from "./SmsTeacherNotificationTableCollapse";
import SmsTeacherNotificationForm from "./SmsTeacherNotificationForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "25%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "ReceiverID", label: "Message Sent To" },
  { id: "MessageHeading", label: "Heading" },
  { id: "MessageDescription", label: "Description" },
  { id: "PostedDate", label: "Posted Date" },
  { id: "Action", label: "Action", disableSorting: true },
];

const SmsTeacherNotification = () => {
  // const [errors, setErrors] = useState({});
  const [date, setDate] = useState();
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

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
            x.MessageHeading.toLowerCase().includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  // const validate = () => {
  //   let temp = {};
  //   temp.date = !date ? "This feild is required" : "";

  //   setErrors({ ...temp });
  //   return Object.values(temp).every((x) => x === "");
  // };

  const dispatch = useDispatch();
  const classes = useStyles();

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

  const { allSmsTeacherNotification, error } = useSelector(
    (state) => state.getAllSmsTeacherNotification
  );

  const {
    listSmsTeacherNotification,
    loading,
    error: listSmsTeacherNotificationError,
  } = useSelector((state) => state.getListSmsTeacherNotification);

  const {
    singleCreateSmsTeacherNotification,
    error: singleCreateSmsTeacherNotificationError,
  } = useSelector((state) => state.getSingleCreateSmsTeacherNotification);

  const {
    success: postSmsTeacherNotification,
    error: postSmsTeacherNotificationError,
  } = useSelector((state) => state.postSmsTeacherNotification);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_SMS_TEACHER_NOTIFICATION_RESET });
  }

  if (listSmsTeacherNotificationError) {
    setNotify({
      isOpen: true,
      message: listSmsTeacherNotificationError,
      type: "error",
    });
    dispatch({ type: GET_LIST_SMS_TEACHER_NOTIFICATION_RESET });
  }

  if (singleCreateSmsTeacherNotificationError) {
    setNotify({
      isOpen: true,
      message: singleCreateSmsTeacherNotificationError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_RESET });
  }

  if (postSmsTeacherNotificationError) {
    setNotify({
      isOpen: true,
      message: postSmsTeacherNotificationError,
      type: "error",
    });
    dispatch({ type: POST_SMS_TEACHER_NOTIFICATION_RESET });
    setOpenPopup(false);
  }
  if (postSmsTeacherNotification) {
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    dispatch({ type: POST_SMS_TEACHER_NOTIFICATION_RESET });
    dispatch(getListSmsTeacherNotificationAction(date));
    setOpenPopup(false);
  }

  useEffect(() => {
    dispatch(getAllSmsTeacherNotificationAction());
  }, []);

  useEffect(() => {
    if (allSmsTeacherNotification) {
      setDate(
        allSmsTeacherNotification?.searchFilterModel?.CreatedDate?.slice(0, 10)
      );
      setTableData(allSmsTeacherNotification?.teacherNotificationAllModelLst);
    }
  }, [allSmsTeacherNotification]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/sms-notification" });
    if (listSmsTeacherNotification) {
      setTableData(listSmsTeacherNotification.teacherNotificationAllModelLst);
    }
  }, [dispatch, listSmsTeacherNotification]);

  const listSearchHandler = () => {
    dispatch(getListSmsTeacherNotificationAction(date));
  };

  const createHandler = () => {
    dispatch(getSingleCreateSmsTeacherNotificationAction());
    dispatch({ type: GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_RESET });
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Teacher Notification"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <div style={{ marginLeft: "12px" }}>
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
                  setDate(newDate.toLocaleDateString().slice(0, 10));
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={listSearchHandler}
            style={{ marginLeft: "12px" }}
          >
            Search By Date
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={createHandler}
            style={{ marginLeft: "12px" }}
          >
            Create{" "}
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
                  <SmsTeacherNotificationTableCollapse
                    item={item}
                    key={item.$id}
                    setOpenPopup={setOpenPopup}
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
        title="SMS Teacher Notification"
      >
        <SmsTeacherNotificationForm
          setOpenPopup={setOpenPopup}
          fcmTokenList={
            singleCreateSmsTeacherNotification &&
            singleCreateSmsTeacherNotification.fcmTokenValueLst
          }
          SchoolShortName={
            singleCreateSmsTeacherNotification &&
            singleCreateSmsTeacherNotification.SchoolShortName
          }
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

export default SmsTeacherNotification;
