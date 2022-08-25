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
import {
  getAllEmployeeAction,
  getAllEmployeeCreateAction,
  getSingleEmployeeAction,
} from "./EmployeeActions";
import EmployeeTableCollapse from "./EmployeeTableCollpase";
import EmployeeForm from "./EmployeeForm";
import {
  EMPLOYEE_CREATE_RESET,
  GET_ALL_EMPLOYEE_CREATE_RESET,
  GET_ALL_EMPLOYEE_RESET,
  GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_RESET,
  GET_SINGLE_EMPLOYEE_RESET,
  RESETPASSWORD_FOR_SINGLE_EMPLOYEE_RESET,
  UPDATE_SINGLE_EMPLOYEE_RESET,
} from "./EmployeeConstants";
import EmployeeReset from "./EmployeeReset";

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
  { id: "LoginName", label: "Login Name" },
  { id: "FullName", label: "Full Name" },
  { id: "Category", label: "Category" },
  { id: "EmailID", label: "Email Id" },
  { id: "MobileNumber", label: "Mobile Number" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Employee = () => {
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
  const [selectedIndex, setSelectedIndex] = useState("");
  const [openResetPopup, setOpenResetPopup] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const { employee, error, loading } = useSelector((state) => state.employee);

  const { success: employeeCreateSuccess, error: employeeCreateError } =
    useSelector((state) => state.createEmployee);

  const {
    singleEmployee,
    error: singleEmployeeError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEmployee);

  const {
    success: resetPasswordForSingleEmployeeSuccess,
    error: resetPasswordForSingleEmployeeError,
  } = useSelector((state) => state.resetPasswordForSingleEmployee);

  const {
    success: updateSingleEmployeeSuccess,
    error: updateSingleEmployeeError,
  } = useSelector((state) => state.updateSingleEmployee);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_EMPLOYEE_RESET });
  }
  if (employeeCreateError) {
    setNotify({
      isOpen: true,
      message: employeeCreateError,
      type: "error",
    });
    dispatch({ type: EMPLOYEE_CREATE_RESET });
  }
  if (singleEmployeeError) {
    setNotify({
      isOpen: true,
      message: singleEmployeeError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_EMPLOYEE_RESET });
  }
  if (updateSingleEmployeeError) {
    setNotify({
      isOpen: true,
      message: updateSingleEmployeeError,
      type: "error",
    });
    dispatch({ type: GET_ALL_EMPLOYEE_CREATE_RESET });
  }

  if (employeeCreateSuccess) {
    dispatch(getAllEmployeeAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: EMPLOYEE_CREATE_RESET });
  }

  if (updateSingleEmployeeSuccess) {
    dispatch(getAllEmployeeAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_RESET });
  }
  if (resetPasswordForSingleEmployeeSuccess) {
    dispatch(getAllEmployeeAction());
    setNotify({
      isOpen: true,
      message: "Password Reset Successfully",
      type: "success",
    });
    setOpenResetPopup(false);
    dispatch({ type: RESETPASSWORD_FOR_SINGLE_EMPLOYEE_RESET });
  }
  if (resetPasswordForSingleEmployeeError) {
    setNotify({
      isOpen: true,
      message: resetPasswordForSingleEmployeeError,
      type: "error",
    });
    setOpenResetPopup(false);
    dispatch({ type: RESETPASSWORD_FOR_SINGLE_EMPLOYEE_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleEmployeeAction(id));
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
    if (!employee) {
      dispatch(getAllEmployeeAction());
    }
    if (employee) {
      setTableData(employee.hrEmployeeModelLst);
    }
  }, [dispatch, employee]);

  useEffect(() => {
    dispatch(getAllEmployeeCreateAction());
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
            x.FullName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_EMPLOYEE_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Employee By Name"
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
                {tableDataAfterPagingAndSorting().map((item, index) => (
                  <EmployeeTableCollapse
                    item={item}
                    key={item.$id}
                    index={index}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    updateCollegeHandler={updateCollegeHandler}
                    deleteCollegeHandler={deleteCollegeHandler}
                    setOpenResetPopup={setOpenResetPopup}
                    category={employee?.ddlEmployeeCategoryRole}
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
        title="Employee Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <EmployeeForm
              employee={singleEmployee && singleEmployee.hrEmployeeModel}
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openResetPopup}
        setOpenPopup={setOpenResetPopup}
        title="Reset Employee Details"
      >
        <EmployeeReset
          employeeDetails={singleEmployee && singleEmployee.hrEmployeeModel}
          setOpenResetPopup={setOpenResetPopup}
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

export default Employee;
