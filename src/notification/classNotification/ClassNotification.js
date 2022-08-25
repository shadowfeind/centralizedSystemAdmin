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
  GET_ALL_CLASS_NOTIFICATION_RESET,
  GET_BULK_CLASS_NOTIFICATION_RESET,
  GET_LIST_CLASS_NOTIFICATION_RESET,
  POST_CLASS_NOTIFICATION_RESET,
} from "./ClassNotificationConstants";
import {
  getAllClassNotificationAction,
  getBulkClassNotificationAction,
  getListClassNotificationAction,
} from "./ClassNotificationActions";
import ClassNotificationTableCollapse from "./ClassNotificationTableCollapse";
import ClassNotificationForm from "./ClassNotificationForm";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

const ClassNotification = () => {
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

  const { classNotification, error } = useSelector(
    (state) => state.getAllClassNotification
  );

  const {
    listClassNotification,
    loading,
    error: listClassNotificationError,
  } = useSelector((state) => state.getListClassNotification);

  const {
    bulkClassNotification,
    loading: loadingBulk,
    error: bulkClassNotificationError,
  } = useSelector((state) => state.getBulkClassNotification);

  const {
    success: postClassNotificationSuccess,
    error: postClassNotificationError,
  } = useSelector((state) => state.postClassNotification);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_CLASS_NOTIFICATION_RESET });
  }

  if (listClassNotificationError) {
    setNotify({
      isOpen: true,
      message: listClassNotificationError,
      type: "error",
    });
    dispatch({ type: GET_LIST_CLASS_NOTIFICATION_RESET });
  }

  if (bulkClassNotificationError) {
    setNotify({
      isOpen: true,
      message: bulkClassNotificationError,
      type: "error",
    });
    dispatch({ type: GET_BULK_CLASS_NOTIFICATION_RESET });
  }

  if (postClassNotificationError) {
    setNotify({
      isOpen: true,
      message: postClassNotificationError,
      type: "error",
    });
    dispatch({ type: POST_CLASS_NOTIFICATION_RESET });
  }

  if (postClassNotificationSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Uploaded",
      type: "success",
    });
    dispatch({ type: POST_CLASS_NOTIFICATION_RESET });
    dispatch(
      getListClassNotificationAction(
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
    dispatch({ type: "GET_LINK", payload: "/notification" });
    if (classNotification) {
      setAcademicYear(classNotification?.searchFilterModel.ddlAcademicYear);
      setAcademicYearValue(
        classNotification?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setShift(classNotification?.searchFilterModel.ddlAcademicShift);
      setShiftValue(
        classNotification?.searchFilterModel.ddlAcademicShift[0]?.Key
      );
      setProgramValue(
        classNotification?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setSection(classNotification?.searchFilterModel.ddlSection);
      setSectionValue(classNotification?.searchFilterModel.ddlSection[0]?.Key);
      setClassOpt(classNotification?.searchFilterModel.ddlClass);
      setClassOptValue(classNotification?.searchFilterModel.ddlClass[0]?.Key);
      setDate(classNotification?.searchFilterModel.currentDate?.slice(0, 10));
    }
  }, [dispatch, classNotification]);

  useEffect(() => {
    dispatch({ type: GET_LIST_CLASS_NOTIFICATION_RESET });
    dispatch(getAllClassNotificationAction());
  }, []);

  useEffect(() => {
    if (listClassNotification) {
      setTableData([...listClassNotification.dbModelClassNotification]);
    }
  }, [listClassNotification]);

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
        getBulkClassNotificationAction(
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
        getListClassNotificationAction(
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
            {listClassNotification && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item) => (
                    <ClassNotificationTableCollapse
                      item={item}
                      key={item.$id}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {listClassNotification && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Class Notification"
      >
        {loadingBulk ? (
          <LoadingComp />
        ) : (
          <>
            <ClassNotificationForm
              students={
                bulkClassNotification && bulkClassNotification.dbModelLst
              }
              SchoolShortName={
                bulkClassNotification && bulkClassNotification.SchoolShortName
              }
              classNotification={
                bulkClassNotification && bulkClassNotification.dbModel
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

export default ClassNotification;
