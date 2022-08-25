import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  getInitialRoleForPermissionAction,
  getListPermissionByRoleAction,
} from "./PermissionByRoleActions";
import {
  GET_INITIAL_ROLE_FOR_PERMISSION_RESET,
  GET_LIST_PERMISSION_BY_ROLE_RESET,
} from "./PermissionByRoleConstants";

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
  { id: "EventName", label: "Event Name" },
  { id: "EventType", label: "Event Type" },
  { id: "EventStatus", label: "Event Status" },
  { id: "FromDate", label: "From Date" },
  { id: "ToDate", label: "To Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const PermissionByRole = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [ddlRole, setDdlRole] = useState([]);
  const [role, setRole] = useState(2);
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
            x.EventName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { initialRoleForPermission, error } = useSelector(
    (state) => state.getInitialRoleForPermission
  );

  const { listPermissionByRole, error: listPermissionByRoleError } =
    useSelector((state) => state.getlistPermissionByRole);

  if (listPermissionByRoleError) {
    setNotify({
      isOpen: true,
      message: listPermissionByRoleError,
      type: "error",
    });
    dispatch({ type: GET_LIST_PERMISSION_BY_ROLE_RESET });
  }
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_INITIAL_ROLE_FOR_PERMISSION_RESET });
  }

  useEffect(() => {
    if (!initialRoleForPermission) {
      dispatch(getInitialRoleForPermissionAction());
    }
    if (initialRoleForPermission) {
      setDdlRole([...initialRoleForPermission.ddlRole]);
    }
  }, [dispatch, initialRoleForPermission]);

  useEffect(() => {
    if (listPermissionByRole) {
      setTableData([...listPermissionByRole]);
    }
  }, [listPermissionByRole]);

  const handleRoleListSearch = () => {
    if (initialRoleForPermission) {
      dispatch(
        getListPermissionByRoleAction(
          initialRoleForPermission.IDHRCompany,
          role
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
                name="ddlRole"
                label="Role"
                value={role}
                // onChange={(e) => handleSelectChange(e.target.value)}
                options={ddlRole}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                // onClick={handleCreate}
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleRoleListSearch}
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
            label="Search Role"
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
        {listPermissionByRole && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <AcademicYearCalendarTableCollapse
                  item={item}
                  key={item.$id}
                  updateAcademicYear={updateAcademicYear}
                  deleteCollegeHandler={deleteCollegeHandler}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}

        {listPermissionByRole && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Create Academic Year Calendar"
      >
        {/* <AcademicYearCalendarForm
      singleAcademicYearCalendar={
        singleAcademicYearCalendar && singleAcademicYearCalendar
      }
      setOpenPopup={setOpenPopup}
      classId={classId}
    /> */}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default PermissionByRole;
