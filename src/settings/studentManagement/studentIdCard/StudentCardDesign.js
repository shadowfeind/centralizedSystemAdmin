import React, { useState, useEffect } from "react";
import { API_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { getHeaderBannerAction, getHeaderContentAction } from "../../../dashboard/DashboardActions";
import { GET_HEADER_BANNER_RESET, GET_HEADER_CONTENT_RESET } from "../../../dashboard/DashboardConstants";
import { useSelector } from "react-redux";

const StudentCardDesign = ({ student, imagePath,section, classname,headerBanners, examDate }) => {

  const dispatch = useDispatch();
  const classNameToShow = classname?.filter( s => s.Key === student.IdLevel)
  const sectionNameToShow = section?.filter( s => s.Key == student.Section)
  return (
    <div
      style={{
        width: "270px",
        height: "320px",
        padding: "10px",
        margin: "10px",
        border: "1px solid #000",
        borderRadius: "10px",
      }}
    >
      <div className="admitCard">
        <img
          src={`${API_URL}${headerBanners}`}
          height="60px"
          width="270px"
          style={{ marginTop: "15px" }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
      <h4>ID Card</h4>
        <h6>
          <strong>Name:</strong> {student.StudentFullName}
        </h6>
        <h6>
          <strong>Class:</strong> {classNameToShow?.length>0 && classNameToShow[0].Value}
        </h6>
        <h6>
          <strong>Section:</strong> {sectionNameToShow?.length>0 && sectionNameToShow[0].Value}
        </h6>
        <h6>
          <strong>Roll No:</strong> {student.rollNo}
        </h6>
        <h6>
          <strong>Mobile No:</strong> {student.MobileNumber}
        </h6>
    
      </div>
    </div>
  );
};

export default StudentCardDesign;
