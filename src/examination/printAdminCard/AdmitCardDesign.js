import React from "react";
import { API_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";

const AdmitCardDesign = ({
  student,
  imagePath,
  headerBanners,
  classname,
  section,
  examDate,
  examEndDate,
  principleSignature,
  year,
  dateValue,
  // enddateValue,
  yearDdl,
}) => {
  const studentImage = imagePath?.filter((x) => x.Key === student.IDHREmployee);
  const yearToShow = yearDdl?.filter((x) => x.Key === year);
  return (
    <div>
      <div className="admitCard">
        <div className="admitCard-Top">
          <div style={{ textAlign: "center" }}>
            <img src={`${API_URL}${headerBanners}`} height="60px" />
          </div>
          <h3>Admit Card</h3>
        </div>
        <div className="admitCard-Bottom">
          <h4>
            {student.EventName} : {yearToShow[0]?.Value}
          </h4>
          <div style={{ marginTop: "12px" }}>
            <Grid container>
              <Grid item xs={8}>
                <h5>
                  <strong>Name:</strong> {student.FullName}
                </h5>
                <h5>
                  <strong>Class / Section:</strong> {classname} {section && "/"}
                  {" "}
                  {section}
                </h5>
                <h5>
                  <strong>Roll No / Symbol No:</strong>
                  {student.RollNo} {student.UniversityRegistrationNumber && "/"}
                  {" "}
                  {student.UniversityRegistrationNumber}
                </h5>
                <h5>
                  <strong>Exam Start-Date:</strong> {examDate}
                </h5>

                <h5>
                  <strong>Exam End-Date:</strong> {examEndDate}
                </h5>
              </Grid>
              <Grid item xs={4}>
                {studentImage?.length > 0 && (
                  <img
                    src={`${API_URL}${studentImage[0].Value}`}
                    height="50px"
                    width="50px"
                  />
                )}
                <div style={{ marginBottom: "-10px", marginRight: "8px" }}>
                  {principleSignature && (
                    <img
                      src={`${API_URL}${principleSignature}`}
                      height="40px"
                    />
                  )}
                </div>

                <h6
                  style={{
                    margin: "3px",
                    borderTop: "1px solid #000",
                    display: "inline-block",
                  }}
                >
                  Principal Signature
                </h6>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmitCardDesign;
