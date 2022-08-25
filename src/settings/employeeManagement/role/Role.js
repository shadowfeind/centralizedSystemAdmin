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
  deleteRoleAction,
  getAllRolesAction,
  getSingleRoleAction,
} from "./RoleActions";
import RoleTableCollapse from "./RoleTableCollapse";
import RoleForm from "./RoleForm";
import {
  DELETE_ROLE_RESET,
  GET_ALL_ROLE_RESET,
  GET_SINGLE_ROLE_RESET,
  ROLE_CREATE_RESET,
  UPDATE_SINGLE_ROLE_RESET,
} from "./RoleConstant";
import RoleDeleteForm from "./RoleDeleteForm";

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
  { id: "RoleName", label: "Role Name" },
  { id: "Description", label: "Description" },
  // { id: "Created_On", label: "Created_On" },
  // { id: "Updated_On", label: "Updated_On" },
  { id: "IsSystemDefined", label: "System Defined" },
  { id: "MarkAsAdmin", label: "Mark As Admin" },
  { id: "actions", label: "All", disableSorting: true },
];

const Role = () => {
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

  const { role, error, loading } = useSelector((state) => state.role);

  const { success: createRoleSuccess, error: createRoleError } = useSelector(
    (state) => state.createRole
  );

  const {
    singleRole,
    error: singleRoleError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleRole);

  const { success: updateSingleRoleSuccess, error: updateSingleRoleError } =
    useSelector((state) => state.updateSingleRole);

  const { success: deleteRoleSuccess, error: deleteRoleError } = useSelector(
    (state) => state.deleteRole
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ROLE_RESET });
  }
  if (createRoleError) {
    setNotify({
      isOpen: true,
      message: createRoleError,
      type: "error",
    });
    dispatch({ type: ROLE_CREATE_RESET });
  }
  if (singleRoleError) {
    setNotify({
      isOpen: true,
      message: singleRoleError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ROLE_RESET });
  }
  if (updateSingleRoleError) {
    setNotify({
      isOpen: true,
      message: updateSingleRoleError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ROLE_RESET });
  }

  if (deleteRoleError) {
    setNotify({
      isOpen: true,
      message: deleteRoleError,
      type: "error",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_ROLE_RESET });
  }

  if (createRoleSuccess) {
    dispatch(getAllRolesAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ROLE_CREATE_RESET });
  }

  if (updateSingleRoleSuccess) {
    dispatch(getAllRolesAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ROLE_RESET });
  }

  if (deleteRoleSuccess) {
    dispatch(getAllRolesAction());
    setNotify({
      isOpen: true,
      message: "Deleted Succesfully",
      type: "success",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_ROLE_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleRoleAction(id));
    setOpenPopup(true);
  };

  const deleteCollegeHandler = (id) => {
    dispatch(getSingleRoleAction(id));
    setOpenDeletePopup(true);
  };

  useEffect(() => {
    dispatch(getAllRolesAction());
  }, []);
  useEffect(() => {
    if (role) {
      setTableData(role.hrRoleModelLst);
    }
  }, [dispatch, role]);

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
            x.RoleName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ROLE_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Role By Role Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.button}
            onClick={addHandler}
          >
            Add{" "}
          </Button> */}
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            <TableContainer className={classes.table}>
              <TblHead />

              <TableBody>
                {tableDataAfterPagingAndSorting().map((item) => (
                  <RoleTableCollapse
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
        title="Employee Role Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <RoleForm
              role={singleRole && singleRole.hrRoleModel}
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openDeletePopup}
        setOpenPopup={setOpenDeletePopup}
        title="Employee Role Delete Form"
      >
        <RoleDeleteForm
          deleteRole={singleRole && singleRole.hrRoleModel}
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

export default Role;
