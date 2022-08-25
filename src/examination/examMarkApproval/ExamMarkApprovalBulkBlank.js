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
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  getBulkExamApprovalBlankDataAction,
  postBulkExamMarkApprovalAction,
} from "./ExamMarkApprovalActions";
import { useDispatch } from "react-redux";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

const ExamMarkApprovalBulkBlank = ({ bulkBlankData, search }) => {
  const [bulk, setBulk] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChangeHandler = (subject, value, name, index) => {
    setBulk((prev) => {
      const newReassoc = {
        ...subject,
        [name]: Number(value),
      };

      let newArray = [...prev];
      newArray[index] = newReassoc;

      return [...newArray];
    });
  };

  const formCheckSubmitHandler = () => {
    dispatch(getBulkExamApprovalBlankDataAction(bulk, search));
  };

  useEffect(() => {
    if (bulkBlankData) {
      bulkBlankData?.forEach((bulk) => {
        if (bulk.StudentExamStatus === null) {
          bulk.StudentExamStatus = 1;
        }
      });
      setBulk(bulkBlankData);
    }
  }, [bulkBlankData]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No.</StyledTableCell>
              <StyledTableCell align="right">Name Of Students</StyledTableCell>
              <StyledTableCell align="right">Mark Obtained(TH)</StyledTableCell>
              <StyledTableCell align="right">Mark Obtained(PT)</StyledTableCell>
              <StyledTableCell align="right">Remarks</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bulk &&
              bulk?.map((subject, index) => (
                <StyledTableRow key={subject.IDHREmployee}>
                  <StyledTableCell component="th" scope="row">
                    {subject.RollNo}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.FullName}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <TextField
                      id={`theory_${subject.IDHREmployee}`}
                      name="ObtainedMark"
                      value={handleInputChange}
                      type="number"
                      label="Obtained Mark"
                      inputProps={{ tabIndex: "1" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      id={`practical_${subject.IDHREmployee}`}
                      value={handleInputChange}
                      name="ObtainedMarkPractical"
                      type="number"
                      label="Obtained Practical Mark"
                      inputProps={{ tabIndex: "2" }}
                    />
                  </StyledTableCell>
                  {/* <StyledTableCell align="right">
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="filled-age-native-simple">
                        Status
                      </InputLabel>
                      <Select
                        native
                        defaultValue={subject.StudentExamStatus}
                        name="StudentExamStatus"
                        id={`status_${subject.IDHREmployee}`}
                        onChange={(e) =>
                          onChangeHandler(
                            subject,
                            e.target.value,
                            e.target.name,
                            index
                          )
                        }
                      >
                        {statusData &&
                          statusData.map((section) => (
                            <option key={section.Value} value={section.Key}>
                              {section.Value}
                            </option>
                          ))} 
                      </Select>
                    </FormControl>
                  </StyledTableCell> */}
                  {/* <StyledTableCell align="right">
                    {subject.FullMark}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.FullMarkPractical}
                  {/* </StyledTableCell> */}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop: "10px",
            marginTop: "10px",
            borderTop: "1px solid #f3f3f3",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            // onClick={() => setOpenBulkPopup(false)}
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
            PRINT
          </Button>
        </div>
      </TableContainer>
    </>
  );
};

export default ExamMarkApprovalBulkBlank;
