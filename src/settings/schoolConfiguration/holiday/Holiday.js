import React, { useEffect, useState } from "react";
import {
  Button,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
  Card,
} from "@material-ui/core";
import {
  Calendar,
  momentLocalizer,
  dateFnsLocalizer,
} from "react-big-calendar";
import useCustomTable from "../../../customHooks/useCustomTable";
import moment, { months } from "moment";
import AddIcon from "@material-ui/icons/Add";
import LoadingComp from "../../../components/LoadingComp";
import Popup from "../../../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { getAllHolidayAction, getSingleHolidayAction } from "./HolidayActions";
import { format, parse, startOfWeek, getDay } from "date-fns";

import HolidayForm from "./HolidayForm";
import {
  GET_ALL_HOLIDAY_RESET,
  GET_SINGLE_HOLIDAY_RESET,
  HOLIDAY_CREATE_RESET,
  UPDATE_SINGLE_HOLIDAY_RESET,
} from "./HolidayConstants";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DateToIso from "../../../components/DateToIso";
import HolidayTableCollapse from "./HolidayTableCollapse";
const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
  cardStyle: {
    margin: "10px",
    padding: "13px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #d4d4d4",
  },
}));

const tableHeader = [
  { id: "HolidayName", label: "Event Name" },
  { id: "Description", label: "Event Description" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const localizer = momentLocalizer(moment);
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
// });

const Holiday = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [startDate, setStartDate] = useState("2022-03-11");
  const [endDate, setEndDate] = useState("2022-03-13");

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
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

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    holiday,
    error,
    loading,
    loading: table,
  } = useSelector((state) => state.holiday);

  const { success: createHolidaySuccess, error: createHolidayError } =
    useSelector((state) => state.createHoliday);

  const { singleHoliday } = useSelector((state) => state.getSingleHoliday);

  const { success: updateSingleHolidaySuccess } = useSelector(
    (state) => state.updateSingleHoliday
  );
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_HOLIDAY_RESET });
  }
  if (createHolidayError) {
    setNotify({
      isOpen: true,
      message: createHolidayError,
      type: "error",
    });
    dispatch({ type: HOLIDAY_CREATE_RESET });
  }

  if (createHolidaySuccess) {
    dispatch(getAllHolidayAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: HOLIDAY_CREATE_RESET });
  }

  if (updateSingleHolidaySuccess) {
    dispatch(getAllHolidayAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_HOLIDAY_RESET });
  }

  useEffect(() => {
    if (holiday) {
      setTableData(holiday.att_HRHolidayModelLst);
    }
  }, [holiday]);

  const updateCollegeHandler = (id) => {
    dispatch(getSingleHolidayAction(id));
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
    dispatch(getAllHolidayAction());
  }, []);

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_HOLIDAY_RESET });
    setOpenPopup(true);
  };
  const handleCalendarSelect = ({ start, end }) => {
    setStartDate(DateToIso(start));
    setEndDate(DateToIso(end));
    setOpenPopup(true);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <div
            style={{
              margin: "10px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "5px 5px 5px #d4d4d4",
            }}
          >
            <Toolbar>
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
                <Calendar
                  localizer={localizer}
                  events={holiday && holiday.att_HRHolidayModelLst}
                  startAccessor="FromDate"
                  endAccessor="ToDate"
                  titleAccessor="HolidayName"
                  views={months}
                  selectable
                  onSelectSlot={handleCalendarSelect}
                  style={{ height: "60vh" }}
                />
              </>
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.cardStyle}>
            <h5 style={{ textAlign: "center" }}>All Events</h5>
            {loading ? (
              <LoadingComp />
            ) : (
              <>
                <TableContainer className={classes.table}>
                  <TblHead />

                  <TableBody>
                    {tableDataAfterPagingAndSorting().map((item) => (
                      <HolidayTableCollapse
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
          </Card>
        </Grid>
      </Grid>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Holiday Form"
      >
        <HolidayForm
          holiday={singleHoliday && singleHoliday.hrHolidayModel}
          startDate={startDate}
          endDate={endDate}
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

export default Holiday;
