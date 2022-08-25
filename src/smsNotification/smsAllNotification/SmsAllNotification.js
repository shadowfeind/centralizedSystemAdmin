import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import LoadingComp from "../../components/LoadingComp";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import SmsNotificationTableCollapse from "./SmsAllNotificationTableCollapse";
import SmsAllNotificationForm from "./SmsAllNotificationForm";
import {
  GET_ALL_SMS_ANNOUNCEMENT_RESET,
  GET_LIST_SMS_ANNOUNCEMENT_RESET,
  GET_SINGLE_SMS_ANNOUNCEMENT_RESET,
  SMS_ANNOUNCEMENT_CREATE_RESET,
  SMS_ANNOUNCEMENT_FCM_RESET,
  UPDATE_SINGLE_SMS_ANNOUNCEMENT_RESET,
} from "./SmsAllNotificationConstants";
import {
  getAllSmsAnnouncementAction,
  getFCMForSmsAnnouncementAction,
  getListSmsAnnouncementAction,
  getSingleSmsAnnouncementAction,
} from "./SmsAllNotificationActions";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "25%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "NewsHeading", label: "News Heading" },
  { id: "NewsDescription", label: "News Description" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const SmsAllNotification = () => {
  const [date, setDate] = useState();
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

  const { smsAnnouncement, error, loading } = useSelector(
    (state) => state.getAllSmsAnnouncement
  );

  const {
    smsAnnouncementList,
    error: smsAnnouncementListError,
    loading: smsAnnouncementListLoading,
  } = useSelector((state) => state.getListSmsAnnouncement);

  const {
    success: createSmsAnnouncementSuccess,
    error: createSmsAnnouncementError,
  } = useSelector((state) => state.createSmsAnnouncement);

  const { singleSmsAnnouncement, error: singleSmsAnnouncementError } =
    useSelector((state) => state.getSingleSmsAnnouncement);

  const { smsAnnouncementFCM, error: smsAnnouncementFCMError } = useSelector(
    (state) => state.getFCMForSmsAnnouncement
  );

  const {
    success: updateSingleSmsAnnouncementSuccess,
    error: updateSingleSmsAnnouncementError,
  } = useSelector((state) => state.updateSingleSmsAnnouncement);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_SMS_ANNOUNCEMENT_RESET });
  }
  if (smsAnnouncementListError) {
    setNotify({
      isOpen: true,
      message: smsAnnouncementListError,
      type: "error",
    });
    dispatch({ type: GET_LIST_SMS_ANNOUNCEMENT_RESET });
  }
  if (smsAnnouncementFCMError) {
    setNotify({
      isOpen: true,
      message: smsAnnouncementFCMError,
      type: "error",
    });
    dispatch({ type: SMS_ANNOUNCEMENT_FCM_RESET });
  }
  if (createSmsAnnouncementError) {
    setNotify({
      isOpen: true,
      message: createSmsAnnouncementError,
      type: "error",
    });
    dispatch({ type: SMS_ANNOUNCEMENT_CREATE_RESET });
  }
  if (singleSmsAnnouncementError) {
    setNotify({
      isOpen: true,
      message: singleSmsAnnouncementError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_SMS_ANNOUNCEMENT_RESET });
  }
  if (updateSingleSmsAnnouncementError) {
    setNotify({
      isOpen: true,
      message: updateSingleSmsAnnouncementError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_SMS_ANNOUNCEMENT_RESET });
  }

  if (createSmsAnnouncementSuccess) {
    dispatch(getAllSmsAnnouncementAction());
    setNotify({
      isOpen: true,
      message: "Announcement Sent Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getListSmsAnnouncementAction(date));
    dispatch({ type: SMS_ANNOUNCEMENT_CREATE_RESET });
  }

  if (updateSingleSmsAnnouncementSuccess) {
    dispatch(getAllSmsAnnouncementAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_SMS_ANNOUNCEMENT_RESET });
  }

  useEffect(() => {
    dispatch(getAllSmsAnnouncementAction());
  }, []);

  useEffect(() => {
    if (smsAnnouncement) {
      setDate(smsAnnouncement?.searchFilterModel?.CreatedDate?.slice(0, 10));
      setTableData(smsAnnouncement?.dbModelLst);
    }
  }, [dispatch, smsAnnouncement]);
  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/sms-notification" });
  }, []);

  useEffect(() => {
    if (smsAnnouncementList) {
      setTableData(smsAnnouncementList.dbModelLst);
    }
  }, [smsAnnouncementList]);

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
            x.NewsHeading.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch(getFCMForSmsAnnouncementAction());
    dispatch({ type: GET_SINGLE_SMS_ANNOUNCEMENT_RESET });
    setOpenPopup(true);
  };

  const updateCollegeHandler = () => {
    dispatch(getSingleSmsAnnouncementAction());
    setOpenPopup(true);
  };

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };

  const listSearchHandler = () => {
    dispatch(getListSmsAnnouncementAction(date));
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search All Notification"
            InputProps={{
              startAdornment: (
                <InputAdornment announcement="start">
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
            onClick={listSearchHandler}
            style={{ marginLeft: "12px" }}
          >
            Search By Date
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addHandler}
            style={{ marginLeft: "12px" }}
          >
            Create{" "}
          </Button>
        </Toolbar>
        {smsAnnouncementListLoading && <LoadingComp />}
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            <TableContainer className={classes.table}>
              <TblHead />

              <TableBody>
                {tableDataAfterPagingAndSorting().map((item) => (
                  <SmsNotificationTableCollapse
                    item={item}
                    key={item.$id}
                    updateCollegeHandler={updateCollegeHandler}
                    deleteCollegeHandler={deleteCollegeHandler}
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
        title="All Notification Form"
      >
        <SmsAllNotificationForm
          smsAnnouncement={smsAnnouncementFCM && smsAnnouncementFCM.dbModel}
          schoolName={smsAnnouncementFCM && smsAnnouncementFCM.SchoolShortName}
          fcmTokenList={
            smsAnnouncementFCM && smsAnnouncementFCM.fcmTokenValueLst
          }
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

export default SmsAllNotification;
