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
  GET_ALL_TEACHER_NOTIFICATION_RESET,
  GET_LIST_TEACHER_NOTIFICATION_RESET,
  GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_RESET,
  POST_TEACHER_NOTIFICATION_RESET,
} from "./TeacherNotificationConstants";
import {
  getAllTeacherNotificationAction,
  getListTeacherNotificationAction,
  getSingleCreateTeacherNotificationAction,
} from "./TeacherNotificationActions";
import TeacherNotificationTableCollapse from "./TeacherNotificationTableCollapse";
import TeacherNotificationForm from "./TeacherNotificationForm";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

const TeacherNotification = () => {
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

  const { allTeacherNotification, error } = useSelector(
    (state) => state.getAllTeacherNotification
  );

  const {
    listTeacherNotification,
    loading,
    error: listTeacherNotificationError,
  } = useSelector((state) => state.getListTeacherNotification);

  const {
    singleCreateTeacherNotification,
    error: singleCreateTeacherNotificationError,
  } = useSelector((state) => state.getSingleCreateTeacherNotification);

  const {
    success: postTeacherNotification,
    error: postTeacherNotificationError,
  } = useSelector((state) => state.postTeacherNotification);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_TEACHER_NOTIFICATION_RESET });
  }

  if (listTeacherNotificationError) {
    setNotify({
      isOpen: true,
      message: listTeacherNotificationError,
      type: "error",
    });
    dispatch({ type: GET_LIST_TEACHER_NOTIFICATION_RESET });
  }

  if (singleCreateTeacherNotificationError) {
    setNotify({
      isOpen: true,
      message: singleCreateTeacherNotificationError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_RESET });
  }

  if (postTeacherNotificationError) {
    setNotify({
      isOpen: true,
      message: postTeacherNotificationError,
      type: "error",
    });
    dispatch({ type: POST_TEACHER_NOTIFICATION_RESET });
    setOpenPopup(false);
  }
  if (postTeacherNotification) {
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    dispatch({ type: POST_TEACHER_NOTIFICATION_RESET });
    dispatch(getListTeacherNotificationAction(date));
    setOpenPopup(false);
  }

  useEffect(() => {
    dispatch(getAllTeacherNotificationAction());
  }, []);

  useEffect(() => {
    if (allTeacherNotification) {
      setDate(
        allTeacherNotification?.searchFilterModel?.CreatedDate?.slice(0, 10)
      );
      setTableData(allTeacherNotification?.teacherNotificationAllModelLst);
    }
  }, [allTeacherNotification]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/notification" });
    if (listTeacherNotification) {
      setTableData(listTeacherNotification.teacherNotificationAllModelLst);
    }
  }, [dispatch, listTeacherNotification]);

  const listSearchHandler = () => {
    dispatch(getListTeacherNotificationAction(date));
  };

  const createHandler = () => {
    dispatch(getSingleCreateTeacherNotificationAction());
    dispatch({ type: GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_RESET });
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
                {tableDataAfterPagingAndSorting()?.map((item) => (
                  <TeacherNotificationTableCollapse
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
        title="Teacher Notification"
      >
        <TeacherNotificationForm
          setOpenPopup={setOpenPopup}
          fcmTokenList={
            singleCreateTeacherNotification &&
            singleCreateTeacherNotification.fcmTokenValueLst
          }
          SchoolShortName={
            singleCreateTeacherNotification &&
            singleCreateTeacherNotification.SchoolShortName
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

export default TeacherNotification;
