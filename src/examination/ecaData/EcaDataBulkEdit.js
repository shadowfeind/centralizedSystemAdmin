import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  DialogContent,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { postBulkEditEcaAction } from "./EcaDataActions";
import DialogFooter from "../../components/DialogFooter";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const EcaDataBulkEdit = ({
  bulkData,
  academicSubject,
  eca,
  search,
  setOpenPopup,
}) => {
  const [bulk, setBulk] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
  const [errors, setErrors] = useState({});
  const [ecaData, setEcaData] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChangeHandler = (subject, value, name, id, index) => {
    // console.log("subject", subject);
    // console.log("value", value);
    // console.log("name", name);
    // console.log("id", id);

    setEcaData((prev) => {
      const newReassoc = {
        ...subject,
        ECAValue: value,
        IDHREmployee: id,
      };

      let newArray = [...prev];
      newArray[index] = newReassoc;

      // console.log(newArray);
      return [...newArray];
    });

    // const filteredEca = ecaData?.filter(
    //   (x) => !(x.IDHREmployee == id && x.ECAName == name)
    // );
    // console.log("filteredEca", filteredEca);
    // if (filteredEca?.length > 0) {
    //   console.log("final result", [...filteredEca, newReassoc]);
    //   setEcaData([...filteredEca, newReassoc]);
    // }

    // setEcaData((prev) => {
    //   console.log(prev);
    //   const newReassoc = {
    //     ...subject,
    //     ECAValue: value,
    //     IDHREmployee: id,
    //   };

    //   let filteredEca = [];

    //   for (let i = 0; i < prev.length; i++) {
    //     if (prev[i].IDHREmployee !== id && prev[i].ECAName !== name) {
    //       filteredEca.push(prev[i]);
    //     }
    //   }

    //   console.log(filteredEca);
    //   const filteredEca = prev?.filter(
    //     (x) => x.IDHREmployee !== id && x.ECAName !== name
    //   );

    //   if (filteredEca?.length > 0) {
    //     return [...filteredEca, newReassoc];
    //   }
    // });
  };

  const validate = () => {
    let temp = {};
    temp.submit =
      bulk?.length <= 0 ? "Cannot Submit the Data when Data is Empty" : "";

    setErrors({ ...temp });
    return Object?.values(temp)?.every((x) => x === "");
  };

  // const onChangeHandler = (subject, value, name, index) => {
  //   setEcaData((prev) => {
  //     const newReassoc = {
  //       ...subject,
  //       ECAValue:
  //         subject.ECAValue === null
  //           ? [{ [name]: value }]
  //           : [...subject.ECAValue, { [name]: value }],
  //     };

  //     let newArray = [...prev];
  //     newArray[index] = newReassoc;

  //     console.log(newArray);
  //     return [...newArray];
  //   });
  // };

  const formCheckSubmitHandler = () => {
    if (validate()) {
      dispatch(postBulkEditEcaAction(bulk, search, ecaData));
    }
  };
  useEffect(() => {
    if (bulkData) {
      setBulk(bulkData);
    }
  }, [bulkData]);

  useEffect(() => {
    if (academicSubject) {
      setSelectSubject(academicSubject);
    }
  }, [academicSubject]);

  useEffect(() => {
    if (bulkData) {
      let tempArray = [];

      bulkData?.forEach((d) => {
        // console.log("eca", eca);
        let currentUser = eca?.filter((x) => x.IDHREmployee === d.IDHREmployee);
        // console.log("currentUser", currentUser);
        // debugger;
        let test = academicSubject?.map((s) => {
          // debugger;
          let userEca = currentUser?.find(
            (x) => x.IDAssignECA === s.IDAssignECA
          );
          // console.log("userEca", userEca);
          // debugger;
          tempArray.push({
            ...s,
            IDHREmployee: d.IDHREmployee,
            ECAValue: userEca ? userEca.ECAValue : "",
          });
        });
      });
      setEcaData([...tempArray]);
      console.log("tempArray", tempArray);
    }
  }, [bulkData, eca]);

  return (
    <>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell width="10%">Roll No.</StyledTableCell>
                <StyledTableCell width="15%">Student Name</StyledTableCell>
                {selectSubject &&
                  selectSubject?.map((subject, i) => (
                    <StyledTableCell width="15%" key={i}>
                      {subject.ECAName}
                    </StyledTableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {bulk &&
                bulk?.map((subject, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{subject.RollNo}</StyledTableCell>
                    <StyledTableCell>{subject.FullName}</StyledTableCell>
                    {ecaData &&
                      ecaData?.map(
                        (s, i) =>
                          s.IDHREmployee === subject.IDHREmployee && (
                            <StyledTableCell align="left" key={i}>
                              <TextField
                                defaultValue={s.ECAValue}
                                label={s.ECAName}
                                variant="outlined"
                                name={s.ECAName}
                                onChange={(e) =>
                                  onChangeHandler(
                                    s,
                                    e.target.value,
                                    e.target.name,
                                    subject.IDHREmployee,
                                    i
                                  )
                                }
                              />
                            </StyledTableCell>
                          )
                      )}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {bulk?.length <= 0 && (
          <div>
            <h3 style={{ color: "red", textAlign: "center" }}>No Data Found</h3>
          </div>
        )}
        {errors.submit && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "12px",
              paddingTop: "8px",
            }}
          >
            {errors.submit}
          </div>
        )}
      </DialogContent>
      <DialogFooter>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px 0 0 10px" }}
          onClick={formCheckSubmitHandler}
        >
          SUBMIT
        </Button>
      </DialogFooter>
    </>
  );
};

export default EcaDataBulkEdit;
