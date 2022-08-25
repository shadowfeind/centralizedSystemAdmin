import React from "react";
import { Grid } from "@material-ui/core";
import { API_URL } from "../../constants";
import "./ExamResultWithMarks.css";
import { gpaToGrade, gpaToRemarks, gradeCalc, pointCalc } from "./Helpers";

const FinalExamResultDesign = ({
  student,
  firstTerm,
  secondTerm,
  thirdTerm,
  finalTerm,
  subjectList,
  attendance,
  currentStudentRank,
  studentClass,
  studentSection,
  studentYear,
  resultDate,
  headerBanners,
  ecaDataWithName,
  principleSignature,
  date,
}) => {
  let avgGpa = [];
  let tdToRender = [];

  for (let i = subjectList.length; i <= 10; i++) {
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
                {studentSection && studentSection[0]?.Value}
              </span>
            </h5>
          </Grid>
          <Grid item xs={6}>
            <h5>
              Class&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">
                {studentClass && studentClass[0]?.Value}
              </span>
            </h5>
            <h5>
              Roll No&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">{student.RollNo}</span>
            </h5>
          </Grid>
        </Grid>
        <h2>ANNUAL RESULT : {studentYear}</h2>
        <div className="uppderTableResult">
          <table style={{ margin: "15px 0" }}>
            <thead>
              <tr>
                <th>SN</th>
                <th style={{ width: "25%" }}>Subjects</th>
                <th style={{ textAlign: "center" }}>Credit Hours</th>
                <th style={{ textAlign: "center" }}>1st Term (15%)</th>
                <th style={{ textAlign: "center" }}>2nd Term (20%)</th>
                <th style={{ textAlign: "center" }}>3rd Term (15%)</th>
                <th style={{ textAlign: "center" }}>Final Term (50%)</th>
                <th style={{ textAlign: "center" }}>Grade</th>
                <th style={{ textAlign: "center" }}>Grade Point</th>
              </tr>
            </thead>
            <tbody>
              {subjectList &&
                subjectList?.map((s, i) => {
                  let count = i + 1;
                  let totalMarksAcc = [];
                  let totalGpa = [];
                  let firstTermMarks = firstTerm?.filter(
                    (x) => x.IDAcademicSubject === s.IDAcademicSubject
                  );

                  let firstTermConvertedMarks = firstTermMarks
                    ? ((firstTermMarks[0]?.ObtainedMark +
                        firstTermMarks[0]?.ObtainedMarkPractical) /
                        (firstTermMarks[0]?.FullMark +
                          firstTermMarks[0]?.FullMarkPractical)) *
                      100 *
                      0.15
                    : "";
                  totalMarksAcc.push({
                    marks: firstTermConvertedMarks,
                  });
                  {
                    firstTermMarks?.length > 0 &&
                      totalGpa.push({
                        gpa: parseFloat(pointCalc(firstTermConvertedMarks)),
                      });
                  }
                  let secondTermMarks = secondTerm?.filter(
                    (x) => x.IDAcademicSubject === s.IDAcademicSubject
                  );

                  let secondTermConvertedMarks = secondTermMarks
                    ? ((secondTermMarks[0]?.ObtainedMark +
                        secondTermMarks[0]?.ObtainedMarkPractical) /
                        (secondTermMarks[0]?.FullMark +
                          secondTermMarks[0]?.FullMarkPractical)) *
                      100 *
                      0.2
                    : "";
                  totalMarksAcc.push({
                    marks: secondTermConvertedMarks,
                  });
                  {
                    secondTerm?.length > 0 &&
                      totalGpa.push({
                        gpa: parseFloat(pointCalc(secondTermConvertedMarks)),
                      });
                  }
                  let thirdTermMarks = thirdTerm?.filter(
                    (x) => x.IDAcademicSubject === s.IDAcademicSubject
                  );

                  let thirdTermConvertedMarks = thirdTermMarks
                    ? ((thirdTermMarks[0]?.ObtainedMark +
                        thirdTermMarks[0]?.ObtainedMarkPractical) /
                        (thirdTermMarks[0]?.FullMark +
                          thirdTermMarks[0]?.FullMarkPractical)) *
                      100 *
                      0.15
                    : "";
                  totalMarksAcc.push({
                    marks: thirdTermConvertedMarks,
                  });
                  {
                    thirdTermMarks?.length > 0 &&
                      totalGpa.push({
                        gpa: parseFloat(pointCalc(thirdTermConvertedMarks)),
                      });
                  }
                  let finalTermMarks = finalTerm?.filter(
                    (x) => x.IDAcademicSubject === s.IDAcademicSubject
                  );
                  let finalTermConvertedMarks = finalTermMarks
                    ? ((finalTermMarks[0]?.ObtainedMark +
                        finalTermMarks[0]?.ObtainedMarkPractical) /
                        (finalTermMarks[0]?.FullMark +
                          finalTermMarks[0]?.FullMarkPractical)) *
                      100 *
                      0.5
                    : "";
                  totalMarksAcc.push({
                    marks: finalTermConvertedMarks,
                  });
                  {
                    finalTermMarks?.length > 0 &&
                      totalGpa.push({
                        gpa: parseFloat(pointCalc(finalTermConvertedMarks)),
                      });
                  }
                  avgGpa.push(
                    Number(
                      pointCalc(
                        totalMarksAcc
                          ?.reduce((acc, cur) => {
                            return acc + cur.marks;
                          }, 0)
                          ?.toFixed(2)
                      )
                    )
                  );
                  return (
                    <tr key={s.$id}>
                      <td>{count}</td>
                      <td>{s.SubjectName}</td>
                      <td style={{ textAlign: "center" }}>4.0</td>
                      <td style={{ textAlign: "center" }}>
                        {firstTermMarks?.length > 0 &&
                          gradeCalc(
                            (
                              ((firstTermMarks[0]?.ObtainedMark +
                                firstTermMarks[0]?.ObtainedMarkPractical) /
                                (firstTermMarks[0]?.FullMark +
                                  firstTermMarks[0]?.FullMarkPractical)) *
                              100
                            )?.toFixed(2)
                          )}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {secondTermMarks?.length > 0 &&
                          gradeCalc(
                            (
                              ((secondTermMarks[0]?.ObtainedMark +
                                secondTermMarks[0]?.ObtainedMarkPractical) /
                                (secondTermMarks[0]?.FullMark +
                                  secondTermMarks[0]?.FullMarkPractical)) *
                              100
                            )?.toFixed(2)
                          )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {thirdTermMarks?.length > 0 &&
                          gradeCalc(
                            (
                              ((thirdTermMarks[0]?.ObtainedMark +
                                thirdTermMarks[0]?.ObtainedMarkPractical) /
                                (thirdTermMarks[0]?.FullMark +
                                  thirdTermMarks[0]?.FullMarkPractical)) *
                              100
                            )?.toFixed(2)
                          )}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {finalTermMarks?.length > 0 &&
                          gradeCalc(
                            (
                              ((finalTermMarks[0]?.ObtainedMark +
                                finalTermMarks[0]?.ObtainedMarkPractical) /
                                (finalTermMarks[0]?.FullMark +
                                  finalTermMarks[0]?.FullMarkPractical)) *
                              100
                            )?.toFixed(2)
                          )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {gradeCalc(
                          totalMarksAcc
                            ?.reduce((acc, cur) => {
                              return acc + cur.marks;
                            }, 0)
                            ?.toFixed(2)
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {/* this part needs to be recalcutaed not so sure */}
                        {pointCalc(
                          totalMarksAcc
                            ?.reduce((acc, cur) => {
                              return acc + cur.marks;
                            }, 0)
                            ?.toFixed(2)
                        )}
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
                  </tr>
                ))}

              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  GRADE POINT AVERAGE (GPA)
                </td>
                <td style={{ textAlign: "center" }}>
                  {avgGpa &&
                    (
                      avgGpa?.reduce((acc, cur) => {
                        return acc + cur;
                      }, 0) / avgGpa.length
                    )?.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="lowerTableResult">
          <Grid container>
            <Grid item xs={3}>
              <table style={{ margin: "15px 0" }}>
                <thead>
                  <tr>
                    <td colSpan={2}>Attendance:</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Working Days:{" "}
                      {attendance.length > 0 && attendance[0]?.WorkingDay}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Present Days:{" "}
                      {attendance.length > 0 && attendance[0]?.PresentDay}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Absent Days:{" "}
                      {(attendance.length > 0 && attendance[0]?.WorkingDay) -
                        (attendance.length > 0 && attendance[0]?.PresentDay)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <Grid item xs={9}>
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
                    <td>Result:</td>
                    <td style={{ backgroundColor: "#fff" }}>
                      Grade:{" "}
                      {gpaToGrade(
                        (
                          avgGpa?.reduce((acc, cur) => {
                            return acc + cur;
                          }, 0) / avgGpa.length
                        )?.toFixed(2)
                      )}
                    </td>
                    <td style={{ backgroundColor: "#fff" }}>
                      GPA:{" "}
                      {avgGpa &&
                        (
                          avgGpa?.reduce((acc, cur) => {
                            return acc + cur;
                          }, 0) / avgGpa.length
                        )?.toFixed(2)}
                    </td>
                    <td style={{ backgroundColor: "#fff" }}>
                      Rank:{" "}
                      {currentStudentRank.length > 0
                        ? currentStudentRank[0]?.Value
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
                    <td>Remarks: </td>
                    <td style={{ backgroundColor: "#fff" }}>
                      {gpaToRemarks(
                        avgGpa?.reduce((acc, cur) => {
                          return acc + cur;
                        }, 0) / avgGpa.length
                      )}
                    </td>
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

export default FinalExamResultDesign;
