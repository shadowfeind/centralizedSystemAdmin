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
  getAllAcademicSectionAction,
  getSingleAcademicSectionAction,
} from "./AcademicSectionActions";
import AcademicSectionTableCollapse from "./AcademicSectionTableCollapse";
import AcademicSectinoForm from "./AcademicSectionForm";
import {
  ACADEMIC_SECTION_CREATE_RESET,
  GET_ALL_ACADEMIC_SECTION_RESET,
  GET_SINGLE_ACADEMIC_SECTION_RESET,
  UPDATE_SINGLE_ACADEMIC_SECTION_RESET,
} from "./AcademicSectionConstants";

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
  { id: "RoomName", label: "Academic Section" },
  { id: "RoomLocation", label: "Section Location" },
  { id: "RoomCapacity", label: "Section Capacity" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicSection = () => {
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

  const { academicSection, error, loading } = useSelector(
    (state) => state.academicSection
  );

  const { success: createAcademicSection, error: createAcademicSectionError } =
    useSelector((state) => state.createAcademicSection);

  const {
    singleAcademicSection,
    loading: loadingEdit,
    error: singleAcademicSectionError,
  } = useSelector((state) => state.getSingleAcademicSection);

  const {
    success: updateAcademicSectionSuccess,
    error: updateSingleAcademicSectionError,
  } = useSelector((state) => state.updateSingleAcademicSection);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACADEMIC_SECTION_RESET });
  }
  if (createAcademicSectionError) {
    setNotify({
      isOpen: true,
      message: createAcademicSectionError,
      type: "error",
    });
    dispatch({ type: ACADEMIC_SECTION_CREATE_RESET });
  }
  if (singleAcademicSectionError) {
    setNotify({
      isOpen: true,
      message: singleAcademicSectionError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ACADEMIC_SECTION_RESET });
  }
  if (updateSingleAcademicSectionError) {
    setNotify({
      isOpen: true,
      message: updateSingleAcademicSectionError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_SECTION_RESET });
  }

  if (createAcademicSection) {
    dispatch(getAllAcademicSectionAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ACADEMIC_SECTION_CREATE_RESET });
  }

  if (updateAcademicSectionSuccess) {
    dispatch(getAllAcademicSectionAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_SECTION_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleAcademicSectionAction(id));
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
    dispatch(getAllAcademicSectionAction());
  }, []);

  useEffect(() => {
    if (academicSection) {
      setTableData(academicSection.dbModelLst);
    }
  }, [dispatch, academicSection]);

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
            x.RoomName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ACADEMIC_SECTION_RESET });
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Academic Section By Academic Section"
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
                  <AcademicSectionTableCollapse
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
        title="Academic Section Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AcademicSectinoForm
              academicSection={
                singleAcademicSection && singleAcademicSection.dbModel
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

export default AcademicSection;
