import React from "react";
import { Grid } from "@material-ui/core";
import { API_URL } from "../../constants";
import "./ExamResultWithMarks.css";
import { gpaToGrade, gpaToRemarks, gradeCalc, pointCalc } from "./Helpers";

const ExamResultWithMarksDesign = ({
  student,
  subjects,
  levelTest,
  studentAttendance,
  dbModelLst,
  forDate,
  examTerm,
  studentClass,
  studentYear,
  studentSection,
  headerBanners,
  ecaDataWithName,
  principleSignature,
  rank,
  date,
}) => {
  let trackSubject = [];
  let tdToRender = [];

  for (let i = subjects.length; i <= 10; i++) {
    tdToRender.push(i);
  }

  return (
    <div className="resultContainer">
      <div className="imageContainer">
        <img src={`${API_URL}${headerBanners}`} width="640px" />
      </div>
      <div className="subjectTable">
        <h1>PROGRESS REPORT</h1>
        <Grid container>
          <Grid item xs={6}>
            <h5>
              Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">{student.FullName}</span>
            </h5>
            <h5>
              Section&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">
                {studentSection && studentSection.Value}
              </span>
            </h5>
          </Grid>
          <Grid item xs={6}>
            <h5>
              Class&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">
                {studentClass && studentClass.Value}
              </span>
            </h5>
            <h5>
              Roll No&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">{student.RollNo}</span>
            </h5>
          </Grid>
        </Grid>
        <h2>
          {examTerm.Value} : {studentYear}
        </h2>
        <div className="uppderTableResult">
          <table style={{ margin: "15px 0" }}>
            <thead>
              <tr>
                <th rowSpan="2">SN</th>
                <th style={{ width: "30%" }} rowSpan="2">
                  Subjects
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  Full Marks
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  Obtained Marks
                </th>
                <th colSpan="2" style={{ textAlign: "center" }} width="20%">
                  Obtained Grades
                </th>
                <th style={{ textAlign: "center" }} rowSpan="2">
                  Final Grade
                </th>
                <th style={{ textAlign: "center" }} rowSpan="2">
                  Grade Point
                </th>
                <th style={{ textAlign: "center" }} rowSpan="2">
                  Highest Grade
                </th>
              </tr>
              <tr>
                <th style={{ textAlign: "center" }}>TH</th>
                <th style={{ textAlign: "center" }}>PR</th>
                <th style={{ textAlign: "center" }}>TH</th>
                <th style={{ textAlign: "center" }}>PR</th>
                <th style={{ textAlign: "center" }}>TH</th>
                <th style={{ textAlign: "center" }}>PR</th>
              </tr>
            </thead>
            <tbody>
              {subjects?.map((s, i) => {
                let count = i + 1;
                let resultTH = (s.ObtainedMark * 100) / s.FullMark;
                let resultPR =
                  (s.ObtainedMarkPractical * 100) / s.FullMarkPractical;
                let resultTotal =
                  ((s.ObtainedMark + s.ObtainedMarkPractical) /
                    (s.FullMark + s.FullMarkPractical)) *
                  100;

                let gradePointTotal =
                  ((s.ObtainedMark + s.ObtainedMarkPractical) /
                    (s.FullMark + s.FullMarkPractical)) *
                  100;

                let filteredSubjects = dbModelLst?.filter(
                  (x) =>
                    (x.SubjectCode === s.SubjectCode) &
                    (x.Status === "Approved")
                );
                let highestThMarks = filteredSubjects?.sort(
                  (a, b) => b.ObtainedMark - a.ObtainedMark
                );
                let highestPrMarks = filteredSubjects?.sort(
                  (a, b) => b.ObtainedMarkPractical - a.ObtainedMarkPractical
                );

                let totalHighestMarks;
                if ((highestThMarks.length > 0) & (highestPrMarks.length > 0)) {
                  let totalMarks = s?.FullMark + s?.FullMarkPractical;

                  let totalHighestMarksContainer =
                    highestThMarks[0].ObtainedMark +
                    highestPrMarks[0].ObtainedMarkPractical;

                  totalHighestMarks =
                    (totalHighestMarksContainer * 100) / totalMarks;
                } else {
                  totalHighestMarks = 0;
                }

                //to calculate GPA tracking grade poing
                let subTracker = {
                  name: s.SubjectCode,
                  totalMarks: Number(pointCalc(gradePointTotal)),
                };
                trackSubject.push(subTracker);

                return (
                  <tr key={s.$id}>
                    <td>{count}</td>
                    <td>{s.SubjectName?.slice(0, 20)}</td>
                    <td style={{ textAlign: "center" }}> {s.FullMark}</td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {s.FullMarkPractical}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {s.FullMark !== null &&
                        (s.ObtainedMark ? s.ObtainedMark.toFixed(2) : "0.00")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {s.FullMarkPractical !== null &&
                        (s.ObtainedMarkPractical
                          ? s.ObtainedMarkPractical.toFixed(2)
                          : "0.00")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {gradeCalc(resultTH)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {s.FullMarkPractical !== null ? gradeCalc(resultPR) : ""}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {gradeCalc(resultTotal)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {pointCalc(gradePointTotal)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {gradeCalc(totalHighestMarks)}
                    </td>
                  </tr>
                );
              })}
              {/* to render empty td */}
              {tdToRender &&
                tdToRender?.map((x) => (
                  <tr key={x}>
                    <td height={30}></td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                  </tr>
                ))}

              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  GRADE POINT AVERAGE (GPA)
                </td>
                <td style={{ textAlign: "center" }}>
                  {(
                    trackSubject?.reduce((acc, cur) => {
                      return acc + cur.totalMarks;
                    }, 0) / trackSubject.length
                  )?.toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="lowerTableResult">
          <Grid container>
            <Grid item xs={4}>
              <table style={{ margin: "15px 0" }}>
                <thead>
                  <tr>
                    <td colSpan={2}>Achievement in work skills</td>
                  </tr>
                </thead>
                <tbody>
                  <Grid container>
                    <Grid item xs={6}>
                      {ecaDataWithName?.slice(0, 4)?.map((x) => {
                        return (
                          <div
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #000",
                              borderLeft: "1px solid #000",
                              borderRight: "1px solid #000",
                              padding: "7px 15px",
                              fontSize: "11px",
                              fontWeight: "lighter",
                            }}
                          >
                            {x?.ECAName}: {x?.ECAValue}
                          </div>
                        );
                      })}
                    </Grid>
                    <Grid item xs={6}>
                      {ecaDataWithName?.slice(4, 8)?.map((x) => {
                        return (
                          <div
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #000",
                              borderRight: "1px solid #000",
                              padding: "7px 15px",
                              fontSize: "11px",
                              fontWeight: "lighter",
                            }}
                          >
                            {x?.ECAName}: {x?.ECAValue}
                          </div>
                        );
                      })}
                    </Grid>
                  </Grid>
                </tbody>
              </table>
            </Grid>
            <Grid item xs={8}>
              <table style={{ margin: "15px 0 15px 15px" }}>
                <thead>
                  <tr>
                    <td colSpan={5}>Grading System</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A+</td>
                    <td>90 or Above (Outstanding) - 4.0</td>
                    <td></td>
                    <td>A</td>
                    <td>80-Below 90 (Excellent) - 3.6</td>
                  </tr>
                  <tr>
                    <td>B+</td>
                    <td>70-Below 80 (Very Good) - 3.2</td>
                    <td></td>
                    <td>B</td>
                    <td>60-Below 70 (Good) - 2.8</td>
                  </tr>
                  <tr>
                    <td>C+</td>
                    <td>50-Below 60 (Satisfactory) - 2.4</td>
                    <td></td>
                    <td>C</td>
                    <td>40-Below 50 (Acceptable) - 2.0</td>
                  </tr>
                  <tr>
                    <td>D+</td>
                    <td>30-Below 40 (Partially Acceptable) - 1.6</td>
                    <td></td>
                    <td>D</td>
                    <td>20-Below 30 (Insufficient) - 1.2</td>
                  </tr>
                  <tr>
                    <td>E+</td>
                    <td>1-Below 20 (Very Insufficient) - 0.8</td>
                    <td></td>
                    <td>N</td>
                    <td>0 (Not Qualified) - 0.0</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <table style={{ marginRight: "40px" }}>
                <thead>
                  <tr>
                    <td>Attendance:</td>
                    <td>
                      Working Days:{" "}
                      {studentAttendance?.length > 0 &&
                        studentAttendance[0]?.WorkingDay}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#fff" }}>
                    <td>
                      Present Days:{" "}
                      {studentAttendance?.length > 0 &&
                      studentAttendance[0]?.PresentDay > 0
                        ? studentAttendance[0]?.PresentDay
                        : ""}
                    </td>
                    <td>
                      Absent Days:{" "}
                      {(studentAttendance?.length > 0 &&
                        studentAttendance[0]?.WorkingDay) -
                        (studentAttendance?.length > 0 &&
                          studentAttendance[0]?.PresentDay) >
                      0
                        ? studentAttendance[0]?.WorkingDay -
                          (studentAttendance?.length > 0 &&
                            studentAttendance[0]?.PresentDay)
                        : ""}
                    </td>
                  </tr>
                </thead>
              </table>
            </Grid>
            <Grid item xs={6}>
              <table>
                <thead>
                  <tr>
                    <td colSpan={2}>Result:</td>
                    <td>Remarks:</td>
                    <td>Rank:</td>
                  </tr>
                  <tr style={{ backgroundColor: "#fff" }}>
                    <td>
                      Grade:{" "}
                      {gpaToGrade(
                        (
                          trackSubject?.reduce((acc, cur) => {
                            return acc + cur.totalMarks;
                          }, 0) / trackSubject?.length
                        )?.toFixed(2)
                      )}
                    </td>
                    <td>
                      G.P.A:{" "}
                      {(
                        trackSubject?.reduce((acc, cur) => {
                          return acc + cur.totalMarks;
                        }, 0) / trackSubject.length
                      )?.toFixed(2)}
                    </td>
                    <td>
                      {gpaToRemarks(
                        (
                          trackSubject?.reduce((acc, cur) => {
                            return acc + cur.totalMarks;
                          }, 0) / trackSubject.length
                        )?.toFixed(2)
                      )}
                    </td>
                    <td>{rank?.length > 0 && rank[0]?.Value}</td>
                  </tr>
                </thead>
              </table>
            </Grid>
          </Grid>
          <div className="signatureContainer">
            <Grid container>
              <Grid item xs={3}>
                <div style={{ marginTop: "-12px", marginBottom: "-10px" }}>
                  <h4>{date?.slice(0, 10)}</h4>
                </div>
                <h4 style={{ margin: "0" }}>................</h4>
                <h6>Result Date</h6>
              </Grid>
              <Grid item xs={3}>
                <h4>................</h4>
                <h6>Class Teacher</h6>
              </Grid>
              <Grid item xs={3}>
                <h4>................</h4>
                <h6>School Stamp</h6>
              </Grid>
              <Grid item xs={3}>
                <div style={{ marginTop: "-34px", marginBottom: "-22px" }}>
                  {principleSignature && (
                    <img
                      src={`${API_URL}${principleSignature}`}
                      height="54px"
                    />
                  )}
                </div>
                <h4 style={{ margin: "0" }}>................</h4>
                <h6>Principal</h6>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResultWithMarksDesign;
