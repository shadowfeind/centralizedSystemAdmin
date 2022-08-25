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
import Popup from "../../components/Popup";
import LoadingComp from "../../components/LoadingComp";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  DOWNLOAD_OLD_QUESTIONS_RESET,
  GET_ALL_OLD_QUESTIONS_RESET,
  GET_LIST_OF_OLD_QUESTIONS_RESET,
  GET_SINGLE_TO_CREATE_OLD_QUESTIONS_RESET,
  GET_SINGLE_TO_EDIT_OLD_QUESTIONS_RESET,
  GET_SUBJECT_OF_OLD_QUESTIONS_RESET,
  POST_OLD_QUESTIONS_RESET,
  PUT_OLD_QUESTIONS_RESET,
} from "./OldQuestionsConstants";
import {
  getAllOldQuestionsAction,
  getListOldQuestionsAction,
  getSingleCreateOldQuestionsAction,
  getSingleEditOldQuestionsAction,
  getSubjectOldQuestionsAction,
  postOldQuestionsAction,
  puOldQuestionsAction,
  putOldQuestionsAction,
} from "./OldQuestionsActions";
import OldQuestionsTableCollapse from "./OldQuestionsTableCollapse";
import OldQuestionsForm from "./OldQuestionsForm";

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
  { id: "Name", label: "Name" },
  { id: "Description", label: "Description" },
  { id: "PostedBy", label: "Posted By" },
  { id: "PostedDate", label: "Posted Date" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const OldQuestions = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [classId, setClassId] = useState("");
  const [ddlFacultySubject, setDdlFacultySubject] = useState([]);
  const [facultySubject, setFacultySubject] = useState("");
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState([]);
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
            x.OldQuestionName.toLowerCase().includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  const { allOldQuestions, error: allOldQuestionsError } = useSelector(
    (state) => state.getAllOldQuestions
  );
  const { subjectOldQuestions, error: subjectOldQuestionsError } = useSelector(
    (state) => state.getSubjectOldQuestions
  );

  const {
    singleEditOldQuestions,
    loading: loadingEdit,
    error: singleEditOldQuestionsError,
  } = useSelector((state) => state.getSingleEditOldQuestions);

  const { singleCreateOldQuestions } = useSelector(
    (state) => state.getSingleCreateOldQuestions
  );

  const { success: postOldQuestionsSuccess, error: postOldQuestionsError } =
    useSelector((state) => state.postOldQuestions);

  const { success: putOldQuestionsSuccess, error: putOldQuestionsError } =
    useSelector((state) => state.putOldQuestions);

  const { listOldQuestions, loading } = useSelector(
    (state) => state.getListOldQuestions
  );

  const {
    success: downloadOldQuestionsSuccess,
    file: downloadFile,
    error: downloadOldQuestionsError,
  } = useSelector((state) => state.downloadOldQuestions);

  if (downloadFile) {
    var blob = new Blob([downloadFile]);
    var url = window.URL.createObjectURL(blob);
    debugger;
    window.open(url, "_blank");
  }
  if (allOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: allOldQuestionsError,
      type: "error",
    });
    dispatch({ type: GET_ALL_OLD_QUESTIONS_RESET });
  }
  if (downloadOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: downloadOldQuestionsError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_OLD_QUESTIONS_RESET });
  }
  if (subjectOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: subjectOldQuestionsError,
      type: "error",
    });
    dispatch({ type: GET_SUBJECT_OF_OLD_QUESTIONS_RESET });
  }

  if (singleEditOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: singleEditOldQuestionsError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_OLD_QUESTIONS_RESET });
  }
  if (postOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: postOldQuestionsError,
      type: "error",
    });
    dispatch({ type: POST_OLD_QUESTIONS_RESET });
  }
  if (putOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: putOldQuestionsError,
      type: "error",
    });
    dispatch({ type: PUT_OLD_QUESTIONS_RESET });
  }
  if (postOldQuestionsSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getListOldQuestionsAction(classId, facultySubject));
    dispatch({ type: POST_OLD_QUESTIONS_RESET });
  }
  if (putOldQuestionsSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(getListOldQuestionsAction(classId, facultySubject));
    dispatch({ type: PUT_OLD_QUESTIONS_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/settings" });
  }, [dispatch]);

  useEffect(() => {
    if (allOldQuestions) {
      setDdlClass(allOldQuestions?.searchFilterModel.ddlClass);
      setClassId(allOldQuestions?.searchFilterModel.ddlClass[0]?.Key);
      dispatch(
        getSubjectOldQuestionsAction(
          allOldQuestions?.searchFilterModel.ddlClass[0]?.Key
        )
      );
    }
  }, [dispatch, allOldQuestions]);

  useEffect(() => {
    dispatch({ type: GET_LIST_OF_OLD_QUESTIONS_RESET });
    dispatch(getAllOldQuestionsAction());
  }, []);

  useEffect(() => {
    if (listOldQuestions) {
      setTableData(listOldQuestions.dbModelModelLst);
    }
  }, [listOldQuestions]);

  useEffect(() => {
    if (subjectOldQuestions) {
      setDdlFacultySubject([...subjectOldQuestions]);
      setFacultySubject(subjectOldQuestions[0]?.Key);
    }
  }, [subjectOldQuestions]);

  const validate = () => {
    let temp = {};
    temp.classId = !classId ? "This feild is required" : "";
    temp.facultySubject = !facultySubject ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(getListOldQuestionsAction(classId, facultySubject));
    }
  };

  const handleCreate = () => {
    if (validate()) {
      dispatch(getSingleCreateOldQuestionsAction(classId, facultySubject));
      setOpenPopup(true);
      dispatch({ type: GET_SINGLE_TO_EDIT_OLD_QUESTIONS_RESET });
    }
  };

  const updateOldQuestions = (id) => {
    dispatch({ type: GET_SINGLE_TO_CREATE_OLD_QUESTIONS_RESET });
    dispatch(getSingleEditOldQuestionsAction(id));
    setOpenPopup(true);
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    dispatch(getSubjectOldQuestionsAction(value));
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="classes"
                label="Class"
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
                value={classId}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="subject"
                label="Subject"
                value={facultySubject}
                onChange={(e) => setFacultySubject(e.target.value)}
                options={ddlFacultySubject}
                errors={errors.facultySubject}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreate}
              >
                CREATE
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
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Old Questions By Name"
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
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {listOldQuestions && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <OldQuestionsTableCollapse
                      item={item}
                      key={item.$id}
                      updateOldQuestions={updateOldQuestions}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {listOldQuestions && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Old Questions Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <OldQuestionsForm
              singleEditOldQuestions={
                singleEditOldQuestions && singleEditOldQuestions
              }
              singleCreateOldQuestions={
                singleCreateOldQuestions && singleCreateOldQuestions
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

export default OldQuestions;
