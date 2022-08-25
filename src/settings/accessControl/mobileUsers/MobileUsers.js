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
  GET_ALL_MOBILE_USER_RESET,
  GET_LIST_MOBILE_USER_RESET,
  GET_SINGLE_EDIT_MOBILE_USER_RESET,
  PUT_MOBILE_USER_RESET,
} from "./MobileUsersConstants";
import MobileUsersTableCollapse from "./MobileUsersTableCollapse";
import MobileUsersForm from "./MobileUsersForm";
import {
  getAllMobileUserAction,
  getSingleEditMobileUserAction,
} from "./MobileUsersActions";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "25%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "FullName", label: "Full Name" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const MobileUsers = () => {
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

  const { allMobileUser, error, loading } = useSelector(
    (state) => state.getAllMobileUser
  );

  const {
    mobileUserLists,
    error: mobileUserListsError,
    loading: mobileUserListsLoading,
  } = useSelector((state) => state.getMobileUserLists);

  const {
    singleMobileUser,
    loading: loadingEdit,
    error: singleMobileUserError,
  } = useSelector((state) => state.getSingleMobileUser);

  const { success: putMobileUserSuccess, error: putMobileUserError } =
    useSelector((state) => state.putMobileUser);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_MOBILE_USER_RESET });
  }
  if (mobileUserListsError) {
    setNotify({
      isOpen: true,
      message: mobileUserListsError,
      type: "error",
    });
    dispatch({ type: GET_LIST_MOBILE_USER_RESET });
  }

  if (singleMobileUserError) {
    setNotify({
      isOpen: true,
      message: singleMobileUserError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_EDIT_MOBILE_USER_RESET });
  }
  if (putMobileUserError) {
    setNotify({
      isOpen: true,
      message: putMobileUserError,
      type: "error",
    });
    dispatch({ type: PUT_MOBILE_USER_RESET });
  }

  if (putMobileUserSuccess) {
    dispatch(getAllMobileUserAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_MOBILE_USER_RESET });
  }

  useEffect(() => {
    dispatch(getAllMobileUserAction());
    dispatch({ type: "GET_LINK", payload: "/settings" });
  }, []);

  useEffect(() => {
    if (allMobileUser) {
      setTableData(allMobileUser.dbModelLst);
    }
  }, [allMobileUser]);

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
            x.FirstName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const updateUserHandler = (id) => {
    dispatch(getSingleEditMobileUserAction(id));
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Mobile Users By Name"
            InputProps={{
              startAdornment: (
                <InputAdornment allMobileUser="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>

        {mobileUserListsLoading && <LoadingComp />}
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            <TableContainer className={classes.table}>
              <TblHead />

              <TableBody>
                {tableDataAfterPagingAndSorting().map((item) => (
                  <MobileUsersTableCollapse
                    item={item}
                    key={item.$id}
                    updateUserHandler={updateUserHandler}
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
        title="Mobile Users Edit Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <MobileUsersForm
              mobileUser={singleMobileUser && singleMobileUser}
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
export default MobileUsers;
