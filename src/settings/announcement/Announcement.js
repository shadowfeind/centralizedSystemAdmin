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
import AnnouncementForm from "./AnnouncementForm";
import {
  getAllAnnouncementAction,
  getFCMForAnnouncementAction,
  getListAnnouncementAction,
  getSingleAnnouncementAction,
} from "./AnnouncementAction";
import AnnouncementTableCollapse from "./AnnouncementTableCollapse";
import {
  ANNOUNCEMENT_CREATE_RESET,
  ANNOUNCEMENT_FCM_RESET,
  GET_ALL_ANNOUNCEMENT_RESET,
  GET_LIST_ANNOUNCEMENT_RESET,
  GET_SINGLE_ANNOUNCEMENT_RESET,
  UPDATE_SINGLE_ANNOUNCEMENT_RESET,
} from "./AnnouncementConstants";
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
  { id: "NewsHeading", label: "News Heading" },
  { id: "NewsDescription", label: "News Description" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const AnnouncementTest = () => {
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

  const { announcement, error, loading } = useSelector(
    (state) => state.announcement
  );

  const {
    announcementList,
    error: announcementListError,
    loading: announcementListLoading,
  } = useSelector((state) => state.getListAnnouncement);

  const { success: createAnnouncementSuccess, error: createAnnouncementError } =
    useSelector((state) => state.createAnnouncement);

  const { singleAnnouncement, error: singleAnnouncementError } = useSelector(
    (state) => state.getSingleAnnouncement
  );

  const { announcementFCM, error: announcementFCMError } = useSelector(
    (state) => state.getFCMForAnnouncement
  );

  const {
    success: updateSingleAnnouncementSuccess,
    error: updateSingleAnnouncementError,
  } = useSelector((state) => state.updateSingleAnnouncement);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ANNOUNCEMENT_RESET });
  }
  if (announcementListError) {
    setNotify({
      isOpen: true,
      message: announcementListError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ANNOUNCEMENT_RESET });
  }
  if (announcementFCMError) {
    setNotify({
      isOpen: true,
      message: announcementFCMError,
      type: "error",
    });
    dispatch({ type: ANNOUNCEMENT_FCM_RESET });
  }
  if (createAnnouncementError) {
    setNotify({
      isOpen: true,
      message: createAnnouncementError,
      type: "error",
    });
    dispatch({ type: ANNOUNCEMENT_CREATE_RESET });
  }
  if (singleAnnouncementError) {
    setNotify({
      isOpen: true,
      message: singleAnnouncementError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ANNOUNCEMENT_RESET });
  }
  if (updateSingleAnnouncementError) {
    setNotify({
      isOpen: true,
      message: updateSingleAnnouncementError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ANNOUNCEMENT_RESET });
  }

  if (createAnnouncementSuccess) {
    dispatch(getAllAnnouncementAction());
    setNotify({
      isOpen: true,
      message: "Announcement Sent Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getListAnnouncementAction(date));
    dispatch({ type: ANNOUNCEMENT_CREATE_RESET });
  }

  if (updateSingleAnnouncementSuccess) {
    dispatch(getAllAnnouncementAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ANNOUNCEMENT_RESET });
  }

  useEffect(() => {
    dispatch(getAllAnnouncementAction());
  }, []);

  useEffect(() => {
    if (announcement) {
      setDate(announcement?.searchFilterModel?.CreatedDate?.slice(0, 10));
      setTableData(announcement?.dbModelLst);
    }
  }, [dispatch, announcement]);
  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/notification" });
  }, []);

  useEffect(() => {
    if (announcementList) {
      setTableData(announcementList.dbModelLst);
    }
  }, [announcementList]);

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
    dispatch(getFCMForAnnouncementAction());
    dispatch({ type: GET_SINGLE_ANNOUNCEMENT_RESET });
    setOpenPopup(true);
  };

  const updateCollegeHandler = () => {
    dispatch(getSingleAnnouncementAction());
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
    dispatch(getListAnnouncementAction(date));
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Announcement"
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
        {announcementListLoading && <LoadingComp />}
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            <TableContainer className={classes.table}>
              <TblHead />

              <TableBody>
                {tableDataAfterPagingAndSorting().map((item) => (
                  <AnnouncementTableCollapse
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
        title="Announcement Form"
      >
        <AnnouncementForm
          announcement={announcementFCM && announcementFCM.dbModel}
          schoolName={announcementFCM && announcementFCM.SchoolShortName}
          fcmTokenList={announcementFCM && announcementFCM.fcmTokenValueLst}
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

export default AnnouncementTest;
