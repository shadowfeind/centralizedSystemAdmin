import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import SelectControl from "../../../components/controls/SelectControl";
import { updateSingleStudentAction } from "./StudentProfileActions";
import { symbolsArrPhone } from "../../../helpers/excludeSymbol";

const initialFormValues = {
  IDHREmployee: 0,
  LoginIDHREmployee: "",
  IDHRCompany: 0,
  WebLoginAccess: true,
  Title: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  ShortName: "",
  UniversityRegistrationNumber: "",
  DOJ: "2022-01-11T09:15:10.772Z",
  IDHRBranch: 0,
  IDHRDepartment: 0,
  IDHREmployeeType: 0,
  Position: 0,
  EmailID: "",
  AlternateEmailID: "",
  SkypeID: "",
  BankAC: "",
  OfficeNumber: "",
  OfficeNumberExtension: "",
  HomeNumber: "",
  MobileNumber: "",
  OtherNumber: "",
  sha1_password: "",
  md5_password: "",
  IDHRRole: 0,
  imagename: "",
  thumbimagename: "",
  Sex: "",
  Married: "",
  DOB: "2022-01-11T09:15:10.772Z",
  BloodGroup: "",
  SpeakingLanguage: "",
  ReadingWritingLanguage: "",
  ComputerLiteracyLevel: "",
  ComputerLiteracyArea: "",
  JoinedPosition: "",
  Status: "",
  PermanentAddressLine1: "",
  PermanentAddressDistrict: "",
  PermanentAddressZone: "",
  PermanentAddressCountry: "",
  TemporaryAddressLine1: "",
  TemporaryAddressDistrict: "",
  TemporaryAddressZone: "",
  TemporaryAddressCountry: "",
  IsNewlyAdded: true,
  IDHREmployeeCategoryRole: 0,
  Created_By: 0,
  IDAcademicRegistration: 0,
  FatherName: "",
  FatherContactNo: "",
  FatherOccupation: "",
  FatherWorkingDesignation: "",
  FatherWorkingOrganization: "",
  FatherEmail: "",
  MotherName: "",
  MotherContactNo: "",
  MotherOccupation: "",
  MotherWorkingDesignation: "",
  MotherWorkingOrganization: "",
  MotherEmail: "",
  LocalGuardianName: "",
  LocalGuardianContactNo: "",
  LocalGuardianOccupation: "",
  LocalGuardianWorkingDesignation: "",
  LocalGuardianWorkingOrganization: "",
  LocalGuardianEmail: "",
  Religion: "",
  TemporaryTownVillage: "",
  TemporaryWardNo: "",
  PermanentTownVillage: "",
  PermanentWardNo: "",
  RollNo: "",
  RoleName: "",
  IsActive: true,
  Created_On: "2022-01-11T09:15:10.772Z",
  Updated_On: "2022-01-11T09:15:10.772Z",
};

const gender = [
  { Key: "Male", Value: "Male" },
  { Key: "Female", Value: "Female" },
];

const loginAccess = [
  { Key: true, Value: "Yes" },
  { Key: false, Value: "No" },
];

const married = [
  { Key: "yes", Value: "Yes" },
  { Key: "no", Value: "No" },
];

const test = [{ Key: "", Value: "" }];

const levelStatus = [
  { Key: "open", Value: "Open" },
  { Key: "cleared", Value: "Cleared" },
  { Key: "suspended", Value: "Suspended" },
  { Key: "dropped", Value: "Dropped" },
  { Key: "passed", Value: "Passed" },
];

const StudentProfileForm = ({ studentData, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.LoginIDHREmployee = !fieldValues.LoginIDHREmployee
      ? "This feild is required"
      : !fieldValues.LoginIDHREmployee.trim()
      ? "This feild is required"
      : "";
    temp.FirstName = !fieldValues.FirstName
      ? "This feild is required"
      : !fieldValues.FirstName.trim()
      ? "This feild is required"
      : "";
    temp.Sex = !fieldValues.Sex ? "This feild is required" : "";
    temp.DOB = !fieldValues.DOB ? "This feild is required" : "";
    temp.MobileNumber = !fieldValues.MobileNumber
      ? "This feild is required"
      : fieldValues.MobileNumber.length < 7
      ? "Mobile No. Must be more than 7"
      : fieldValues.MobileNumber.length > 10
      ? "Mobile No. Must be less than 10"
      : "";
    temp.LastName = !fieldValues.LastName ? "This feild is required" : "";
    temp.EmailID = !fieldValues.EmailID
      ? "This feild is required"
      : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          fieldValues.EmailID
        )
      ? ""
      : "Email is not valid";
    temp.BloodGroup = !fieldValues.BloodGroup ? "This feild is required" : "";
    temp.UniversityRegistrationNumber =
      !fieldValues.UniversityRegistrationNumber ? "This feild is required" : "";
    // temp.WebLoginAccess = !fieldValues.WebLoginAccess
    // ? "This feild is required"
    // : "";
    temp.RollNo = !fieldValues.RollNo ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      dispatch(updateSingleStudentAction(values));
    }
  };

  useEffect(() => {
    if (studentData) {
      setValues({ ...studentData.hrEmployeeModel });
    }
  }, [studentData]);

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="LoginIDHREmployee"
            label="Login ID*"
            disabled
            value={values.LoginIDHREmployee}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.LoginIDHREmployee}
          />
          <InputControl
            name="FirstName"
            label="First Name*"
            value={values.FirstName}
            onChange={handleInputChange}
            onFocus={(e) => {
              e.target.select();
            }}
            errors={errors.FirstName}
          />
          <InputControl
            name="LastName"
            label="Last Name"
            value={values.LastName}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.LastName}
          />
          <InputControl
            name="EmailID"
            label="Email Address"
            value={values.EmailID}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.EmailID}
          />
          <InputControl
            name="BloodGroup"
            label="Blood Group"
            value={values.BloodGroup}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.BloodGroup}
          />
          <InputControl
            name="UniversityRegistrationNumber"
            label="Symbol No"
            value={values.UniversityRegistrationNumber}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.UniversityRegistrationNumber}
          />
          <SelectControl
            name="Sex"
            label="Gender"
            value={values.Sex}
            onChange={handleInputChange}
            onFocus={(e) => {
              e.target.select();
            }}
            options={gender}
            errors={errors.Sex}
          />

          <SelectControl
            name="WebLoginAccess"
            label="Web Login Access"
            value={values.WebLoginAccess}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            options={loginAccess}
            errors={errors.WebLoginAccess}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="MiddleName"
            label="Middle Name"
            onFocus={(e) => {
              e.target.select();
            }}
            value={values.MiddleName}
            onChange={handleInputChange}
          />
          <DatePickerControl
            name="DOB"
            label="Date Of Birth"
            value={values.DOB}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.DOB}
          />
          <InputControl
            name="MobileNumber"
            label="Mobile Number"
            value={values.MobileNumber}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            type="number"
            errors={errors.MobileNumber}
          />
          <InputControl
            name="OtherNumber"
            label="Other Number"
            value={values.OtherNumber}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            onChange={handleInputChange}
            type="number"
          />
          <InputControl
            name="RollNo"
            label="Roll No"
            type="number"
            value={values.RollNo}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.RollNo}
          />

          <SelectControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            options={studentData ? studentData.ddlIsActive : test}
          />
        </Grid>
      </Grid>
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
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </div>
    </Form>
  );
};

export default StudentProfileForm;
