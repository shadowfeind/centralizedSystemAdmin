import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import "./AssignEcaForm.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { postAssignEcaAction } from "./AssignEcaActions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
    color: "#fff",
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

const AssignEcaForm = ({
  assignEca,
  idYearFacultyProgramLink,
  level,
  count,
  setOpenPopup,
}) => {
  const [checked, setChecked] = useState(false);
  const [assign, setAssign] = useState([]);
  const [errors, setErrors] = useState({});
  const [active, setActive] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const validate = () => {
    let temp = {};

    temp.ecaError =
      assign.length > 8 - count
        ? `Eca can only contain 8 entries. ${8 - count} remaining.`
        : "";

    temp.submit = assign?.length <= 0 ? "Select Atleast one options" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  // useEffect(() => {
  //   if (assignEca) {
  //     setAssign(assignEca);
  //   }
  // }, [assignEca]);

  const handleAllChecked = (checked) => {
    setChecked(checked);
    if (checked) {
      setAssign([...assignEca]);
    } else {
      setAssign([]);
    }
  };

  const handleChecked = (checked, obj) => {
    if (!checked) {
      setAssign((prev) => {
        let newCheckList = prev.filter((x) => x.IDECA !== obj.IDECA);
        return [...newCheckList];
      });
    } else {
      setAssign((prev) => [...prev, obj]);
    }
  };

  const formCheckSubmitHandler = () => {
    if (validate()) {
      setActive(true);
      dispatch(postAssignEcaAction(assign, idYearFacultyProgramLink, level));
      setOpenPopup(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ECA Name</StyledTableCell>
              <StyledTableCell>ECA Description</StyledTableCell>
              <StyledTableCell>Created_On</StyledTableCell>
              <StyledTableCell>Updated_On</StyledTableCell>
              <StyledTableCell>
                {" "}
                <label>All</label>
                <Checkbox
                  checked={checked}
                  color="primary"
                  onChange={(e) => handleAllChecked(e.target.checked)}
                />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignEca &&
              assignEca.map((subject, key) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {subject.ECAName}
                  </StyledTableCell>
                  <StyledTableCell>{subject.ECADescription}</StyledTableCell>
                  <StyledTableCell>
                    {subject.Created_On?.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {subject.Updated_On?.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Checkbox
                      checked={
                        assign.filter((x) => x.IDECA === subject.IDECA).length >
                        0
                          ? true
                          : false
                      }
                      color="primary"
                      onChange={(e) => handleChecked(e.target.checked, subject)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {assignEca?.length <= 0 && (
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
      <div style={{ textAlign: "center", color: "red", fontSize: "14px" }}>
        {errors && errors.ecaError}
      </div>
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
          onClick={() => setOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={active}
          style={{ margin: "10px 0 0 10px" }}
          onClick={formCheckSubmitHandler}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </div>
    </>
  );
};
export default AssignEcaForm;
