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
import AddIcon from "@material-ui/icons/Add";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  GET_ALL_ASSIGN_ECA_RESET,
  GET_LIST_ASSIGN_ECA_RESET,
  GET_SINGLE_CREATE_ASSIGN_ECA_RESET,
  POST_ASSIGN_ECA_RESET,
} from "./AssignEcaConstants";
import AssignEcaTableCollapse from "./AssignEcaTableCollapse";
import {
  getALLAssignEcaAction,
  getListAssignEcaAction,
  getSingleCreateAssignEcaAction,
} from "./AssignEcaActions";
import AssignEcaForm from "./AssignEcaForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  // { id: "IDHRCompany", label: "Company" },
  { id: "ECAName", label: "ECA Name" },
  { id: "ECADescription", label: "ECA Description" },
  { id: "Created_On", label: "Created_On" },
  { id: "Updated_On", label: "Updated_On" },
  { id: "IsActive", label: "IsActive" },
];

const AssignECA = () => {
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

  const [academicYear, setAcademicYear] = useState([]);
  const [acaYear, setAcaYear] = useState("");
  const [ddlprogram, setDdlProgram] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [ddlClass, setDdlClass] = useState([]);
  const [classId, setClassId] = useState("");

  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const { allAssignEca, error } = useSelector((state) => state.getAllAssignEca);

  const { listAssignEca, error: listAssignEcaError } = useSelector(
    (state) => state.getListAssignEca
  );

  const { singleCreateAssignEca, error: singleCreateAssignEcaError } =
    useSelector((state) => state.getSingleCreateAssignEca);

  const { success: postAssignEcaSuccess, error: postAssignEcaError } =
    useSelector((state) => state.postAssignEca);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ASSIGN_ECA_RESET });
  }

  if (listAssignEcaError) {
    setNotify({
      isOpen: true,
      message: listAssignEcaError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ASSIGN_ECA_RESET });
  }

  if (singleCreateAssignEcaError) {
    setNotify({
      isOpen: true,
      message: singleCreateAssignEcaError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_CREATE_ASSIGN_ECA_RESET });
    setOpenPopup(false);
  }

  if (postAssignEcaError) {
    setNotify({
      isOpen: true,
      message: postAssignEcaError,
      type: "error",
    });
    dispatch({ type: POST_ASSIGN_ECA_RESET });
  }
  if (postAssignEcaSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({ type: POST_ASSIGN_ECA_RESET });
    dispatch(getListAssignEcaAction(acaYear, programValue, classId));
  }

  useEffect(() => {
    if (allAssignEca) {
      setAcademicYear(allAssignEca?.searchFilterModel.ddlAcademicYear);
      setAcaYear(allAssignEca?.searchFilterModel.ddlAcademicYear[0]?.Key);
      // setDdlProgram(allAssignEca.searchFilterModel.ddlFacultyProgramLink);
      setProgramValue(
        allAssignEca?.searchFilterModel.ddlFacultyProgramLink[0]?.Key
      );
      setDdlClass(allAssignEca?.searchFilterModel.ddlClass);
      setClassId(allAssignEca?.searchFilterModel.ddlClass[0]?.Key);
    }
  }, [dispatch, allAssignEca]);

  useEffect(() => {
    dispatch({ type: GET_LIST_ASSIGN_ECA_RESET });
    dispatch(getALLAssignEcaAction());
  }, []);

  useEffect(() => {
    if (listAssignEca) {
      setTableData([...listAssignEca.dbModelLst]);
    }
  }, [listAssignEca]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(getListAssignEcaAction(acaYear, programValue, classId));
    }
  };

  const createHandler = () => {
    if (validate()) {
      dispatch(getSingleCreateAssignEcaAction(acaYear, programValue, classId));
      setOpenPopup(true);
    }
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => setAcaYear(e.target.value)}
                options={academicYear}
                errors={errors.acaYear}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={ddlprogram}
                errors={errors.programValue}
              />
            </Grid> */}
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                className={classes.button}
                style={{ margin: "10px 0 0 10px" }}
                onClick={createHandler}
              >
                Create{" "}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={listSearchHandler}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {listAssignEca && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <AssignEcaTableCollapse
                  item={item}
                  key={item.$id}
                  level={listAssignEca?.ddlLevel}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}

        {listAssignEca && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Assign ECA"
      >
        <AssignEcaForm
          assignEca={singleCreateAssignEca && singleCreateAssignEca.ddlECA}
          idYearFacultyProgramLink={
            singleCreateAssignEca &&
            singleCreateAssignEca.idYearFacultyProgramLink
          }
          level={singleCreateAssignEca && singleCreateAssignEca.level}
          count={singleCreateAssignEca && singleCreateAssignEca.ECAAssignCount}
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

export default AssignECA;
