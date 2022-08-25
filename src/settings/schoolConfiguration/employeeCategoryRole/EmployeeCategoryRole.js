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
  deleteEmployeeCategoryRoleAction,
  getAllEmployeeCategoryRoleAction,
  getSingleEmployeeCategoryRoleAction,
} from "./EmployeeCategoryRoleActions";
import EmployeeCategoryRoleTableCollapse from "./EmployeeCategoryRoleTableCollapse";
import EmployeeCategoryRoleForm from "./EmployeeCategoryRoleForm";
import {
  DELETE_EMPLOYEE_CATEGORY_ROLE_RESET,
  EMPLOYEE_CATEGORY_ROLE_CREATE_RESET,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_RESET,
  GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET,
  UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET,
} from "./EmployeeCategoryRoleConstant";
import EmployeeCategoryRoleDeleteForm from "./EmployeeCategoryRoleDeleteForm";

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
  { id: "Heading", label: "Heading" },
  { id: "Description", label: "Description" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const EmployeeType = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
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

  const { employeeCategoryRole, error, loading } = useSelector(
    (state) => state.employeeCategoryRole
  );

  const {
    success: createEmployeeCategoryRoleSuccess,
    error: createEmployeeCategoryRoleError,
  } = useSelector((state) => state.createEmployeeCategoryRole);

  const {
    singleEmployeeCategoryRole,
    loading: loadingEdit,
    error: singleEmployeeCategoryRoleError,
  } = useSelector((state) => state.getSingleEmployeeCategoryRole);

  const {
    success: updateSingleEmployeeCategoryRoleSuccess,
    error: updateSingleEmployeeCategoryRole,
  } = useSelector((state) => state.updateSingleEmployeeCategoryRole);

  const {
    success: deleteEmployeeCategoryRoleSuccess,
    error: deleteEmployeeCategoryRoleError,
  } = useSelector((state) => state.deleteEmployeeCategoryRole);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_EMPLOYEE_CATEGORY_ROLE_RESET });
  }
  if (createEmployeeCategoryRoleError) {
    setNotify({
      isOpen: true,
      message: createEmployeeCategoryRoleError,
      type: "error",
    });
    dispatch({ type: EMPLOYEE_CATEGORY_ROLE_CREATE_RESET });
  }
  if (singleEmployeeCategoryRoleError) {
    setNotify({
      isOpen: true,
      message: singleEmployeeCategoryRoleError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET });
  }
  if (updateSingleEmployeeCategoryRole) {
    setNotify({
      isOpen: true,
      message: updateSingleEmployeeCategoryRole,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET });
  }

  if (deleteEmployeeCategoryRoleError) {
    setNotify({
      isOpen: true,
      message: deleteEmployeeCategoryRoleError,
      type: "error",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_EMPLOYEE_CATEGORY_ROLE_RESET });
  }
  if (createEmployeeCategoryRoleSuccess) {
    dispatch(getAllEmployeeCategoryRoleAction());
    setNotify({
      isOpen: true,
      message: "Employee Category Role Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: EMPLOYEE_CATEGORY_ROLE_CREATE_RESET });
  }

  if (updateSingleEmployeeCategoryRoleSuccess) {
    dispatch(getAllEmployeeCategoryRoleAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET });
  }

  if (deleteEmployeeCategoryRoleSuccess) {
    dispatch(getAllEmployeeCategoryRoleAction());
    setNotify({
      isOpen: true,
      message: "Deleted Succesfully",
      type: "success",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_EMPLOYEE_CATEGORY_ROLE_RESET });
  }
  const updateCollegeHandler = (id) => {
    dispatch(getSingleEmployeeCategoryRoleAction(id));
    setOpenPopup(true);
  };

  const deleteCollegeHandler = (id) => {
    dispatch(getSingleEmployeeCategoryRoleAction(id));
    setOpenDeletePopup(true);
  };

  useEffect(() => {
    dispatch(getAllEmployeeCategoryRoleAction());
  }, []);

  useEffect(() => {
    if (employeeCategoryRole) {
      setTableData(employeeCategoryRole.dbModelLst);
    }
  }, [dispatch, employeeCategoryRole]);

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
            x.Heading.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Employee Category Role By Heading"
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
                {tableDataAfterPagingAndSorting().map((item) => (
                  <EmployeeCategoryRoleTableCollapse
                    item={item}
                    key={item.$id}
                    updateCollegeHandler={updateCollegeHandler}
                    deleteCollegeHandler={deleteCollegeHandler}
                    setOpenPopup={setOpenPopup}
                    setOpenDeletePopup={setOpenDeletePopup}
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
        title="Employee Category Role Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <EmployeeCategoryRoleForm
              employeeCategoryRole={
                singleEmployeeCategoryRole && singleEmployeeCategoryRole.dbModel
              }
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openDeletePopup}
        setOpenPopup={setOpenDeletePopup}
        title="Employee Category Role Delete Form"
      >
        <EmployeeCategoryRoleDeleteForm
          employeeCategoryDeleteRole={
            singleEmployeeCategoryRole && singleEmployeeCategoryRole.dbModel
          }
          setOpenDeletePopup={setOpenDeletePopup}
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

export default EmployeeType;
