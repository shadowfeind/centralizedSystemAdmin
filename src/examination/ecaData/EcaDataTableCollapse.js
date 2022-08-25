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
import { useDispatch } from "react-redux";

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

const EcaDataTableCollapse = ({ bulkDatas, academicSubjects, ecas }) => {
  const [bulk, setBulk] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
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

  useEffect(() => {
    if (bulkDatas) {
      setBulk(bulkDatas);
    }
  }, [bulkDatas]);

  useEffect(() => {
    if (academicSubjects) {
      setSelectSubject(academicSubjects);
    }
  }, [academicSubjects]);

  useEffect(() => {
    if (bulkDatas) {
      let tempArray = [];

      bulkDatas?.forEach((d) => {
        console.log("eca", ecas);
        let currentUser = ecas?.filter(
          (x) => x.IDHREmployee === d.IDHREmployee
        );
        console.log("currentUser", currentUser);
        let test = academicSubjects?.map((s) => {
          let userEca = currentUser?.find(
            (x) => x.IDAssignECA === s.IDAssignECA
          );
          console.log("userEca", userEca);
          tempArray.push({
            ...s,
            IDHREmployee: d.IDHREmployee,
            ECAValue: userEca ? userEca.ECAValue : "",
          });
        });
      });
      setEcaData([...tempArray]);
      console.log(tempArray);
    }
  }, [bulkDatas, ecas]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No.</StyledTableCell>
              <StyledTableCell>Student Name</StyledTableCell>
              {selectSubject &&
                selectSubject?.map((subject, i) => (
                  <StyledTableCell key={i}>{subject.ECAName}</StyledTableCell>
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
                            {s.ECAValue}
                          </StyledTableCell>
                        )
                    )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EcaDataTableCollapse;
