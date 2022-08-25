import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Grid } from "@material-ui/core";
import "./examLedger.css";

const ExamResultTableCollapse = memo(
  ({
    ledgerHeader,
    student,
    mark,
    showDataTable,
    result,
    rank,
    searchFilterModel,
    currentClass,
    currentSection,
    schoolName,
    date,
    year,
  }) => {
    const [ledgerData, setLedgeData] = useState([]);
    const componentRef = useRef();
    const printPdf = useReactToPrint({
      content: () => componentRef.current,
    });
    let newLedger = [];

    let termExamName = searchFilterModel.ddlAcademicYearCalendar?.filter(
      (x) => x.Key === searchFilterModel.idAcademicYearCalendar
    );

    // let termExamYear = year?.filter(
    //   (x) => x.Key === searchFilterModel.idAcademicYear
    // );

    let currentClassToDisplay = currentClass?.filter(
      (x) => x.Key === searchFilterModel.level
    );
    let currentSectionToDisplay = currentSection?.filter(
      (x) => x.Key === searchFilterModel.classSection
    );

    useEffect(() => {
      if (student) {
        student
          ?.sort((a, b) => a.RollNo - b.RollNo)
          ?.map((d) => {
            let markModel = mark?.filter(
              (m) => m.IDHREmployee === d.IDHREmployee
            );
            if (ledgerHeader) {
              ledgerHeader?.map((l) => {
                let obtainedMark = markModel?.find(
                  (o) => o.IdAcademicSubject === l.IDAcademicSubject
                );
                if (obtainedMark) {
                  newLedger?.push(obtainedMark);
                } else {
                  newLedger?.push({ IDHREmployee: d.IDHREmployee });
                }
              });
            }
          });
      }
      setLedgeData([...newLedger]);
    }, []);

    return showDataTable ? (
      <div className="ledgerResult" ref={componentRef}>
        <Grid container style={{ marginBottom: "12px" }}>
          <Grid item xs={6} className="ledger-header-print">
            School Name: {schoolName && schoolName}
          </Grid>
          <Grid item xs={3} className="ledger-header-print">
            Year: {searchFilterModel && searchFilterModel.npYear}
          </Grid>
          <Grid item xs={3} className="ledger-header-print">
            Class: {currentClassToDisplay && currentClassToDisplay[0]?.Value}
          </Grid>
          <Grid item xs={6} className="ledger-header-print">
            Term: {termExamName && termExamName[0]?.Value}
          </Grid>
          <Grid item xs={3} className="ledger-header-print">
            Section:{" "}
            {currentSectionToDisplay && currentSectionToDisplay[0]?.Value}
          </Grid>

          <Grid item xs={3} className="ledger-header-print">
            Date: {date?.slice(0, 10)}
          </Grid>
        </Grid>
        <table border="1" id="table-xls-button">
          <thead>
            <tr>
              <th rowSpan="2" style={{ width: "5%" }}>
                Roll No.
              </th>
              <th rowSpan="2" style={{ width: "15%" }}>
                Name Of the Students
              </th>
              {ledgerHeader &&
                ledgerHeader?.map((s) => (
                  <th colSpan="2" key={s.$id} style={{ textAlign: "center" }}>
                    {s.SubjectName}
                  </th>
                ))}

              <th rowSpan="2" style={{ width: "5%" }}>
                Total Obtained
              </th>

              <th rowSpan="2" style={{ width: "7%" }}>
                Result
              </th>

              <th rowSpan="2">Rank</th>
            </tr>
            <tr>
              {ledgerHeader &&
                ledgerHeader?.map((s) => (
                  <Fragment key={s.$id}>
                    <th>TH</th>
                    <th>PR</th>
                  </Fragment>
                ))}
            </tr>
          </thead>
          <tbody>
            {student &&
              student?.map((d) => {
                const showResult = result?.filter(
                  (r) => r.Key === d.IDHREmployee
                );
                const showRank = rank?.filter((r) => r.Key === d.IDHREmployee);
                console.log(showResult);
                console.log(showRank);
                return (
                  <tr key={d.$id}>
                    <td>{d.RollNo}</td>
                    <td>{d.StudentName}</td>
                    {ledgerData &&
                      ledgerData?.map((n) => {
                        return (
                          n.IDHREmployee === d.IDHREmployee && (
                            <Fragment key={d.$id}>
                              <td>
                                {n.ObtainedMarks === 0
                                  ? ""
                                  : n.ObtainedMarks?.toFixed(2)}
                              </td>
                              <td>
                                {n.ObtainedMarksPractical === 0
                                  ? ""
                                  : n.ObtainedMarksPractical?.toFixed(2)}
                              </td>
                            </Fragment>
                          )
                        );
                      })}
                    <td>{d.TotalObtainedMark?.toFixed(2)}</td>
                    <td>{showResult.length > 0 && showResult[0].Value}</td>
                    <td>{showRank.length > 0 && showRank[0].Value}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
            onClick={printPdf}
            variant="contained"
            className="print-button-hide"
            color="primary"
            style={{ marginRight: "10px" }}
          >
            PRINT
          </Button>
          <ReactHTMLTableToExcel
            className="download-table-xls-button print-button-hide"
            table="table-xls-button"
            filename="ledger"
            sheet="Sheet"
            buttonText="Download as XLS"
          />
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
);

export default ExamResultTableCollapse;
