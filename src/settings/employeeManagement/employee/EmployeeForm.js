import React, { useState, useEffect } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import SelectControl from "../../../components/controls/SelectControl";
import { symbolsArrPhone } from "../../../helpers/excludeSymbol";
import {
  employeeCreateAction,
  updateSingleEmployeeAction,
} from "./EmployeeActions";
import DialogFooter from "../../../components/DialogFooter";

const initialFormValues = {
  IDHRCompany: 2,
  IDHREmployee: 0,
  IDHREmployeeCategoryRole: 1,
  LoginIDHREmployee: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  EmailID: "",
  Sex: "Male",
  DOJ: "2021-09-27T10:59:00.89",
  IDHREmployeeType: 1,
  IDHRBranch: 1,
  Position: 1,
  WebLoginAccess: "true",
  ShortName: "",
  Title: "Mr",
  DOB: "2000-09-27T10:59:00.89",
  MobileNumber: "",
  Married: "True",
  IDHRRole: 2,
  BankAC: "",
  IDHRDepartment: 1,
  JoinedPosition: "",
  IsNewlyAdded: 1,
  IsActive: true,
  Created_By: 0,
  Created_On: "2021-10-01T04:20:16.288Z",
  Updated_On: "2021-10-01T04:20:16.288Z",
};

const gender = [
  { Key: "Male", Value: "Male" },
  { Key: "Female", Value: "Female" },
];

const loginAccess = [
  { Key: "true", Value: "Yes" },
  { Key: "false", Value: "No" },
];

const married = [
  { Key: "True", Value: "True" },
  { Key: "False", Value: "False" },
];

const EmployeeForm = ({ employee, setOpenPopup }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.LoginIDHREmployee = !fieldValues.LoginIDHREmployee
      ? "This feild is required"
      : !fieldValues.LoginIDHREmployee.trim()
      ? "This feild is required"
      : "";
    temp.IDHREmployeeCategoryRole = !fieldValues.IDHREmployeeCategoryRole
      ? "This feild is required"
      : "";
    temp.IDHRDepartment = !fieldValues.IDHRDepartment
      ? "This feild is required"
      : "";
    // temp.JoinedPosition = !fieldValues.JoinedPosition ? "This feild is required" :"";
    temp.EmailID = !fieldValues.EmailID
      ? "This field is required"
      : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          fieldValues.EmailID
        )
      ? ""
      : "Email is not valid";
    temp.Married = !fieldValues.Married ? "This feild is required" : "";
    temp.IDHRRole = !fieldValues.IDHRRole ? "This feild is required" : "";
    temp.WebLoginAccess = !fieldValues.WebLoginAccess
      ? "This feild is required"
      : "";
    temp.Sex = !fieldValues.Sex ? "This feild is required" : "";
    temp.IDHRBranch = !fieldValues.IDHRBranch ? "This feild is required" : "";
    temp.IDHREmployeeType = !fieldValues.IDHREmployeeType
      ? "This feild is required"
      : "";
    temp.Title = !fieldValues.Title ? "This feild is required" : "";
    temp.Position = !fieldValues.Position ? "This feild is required" : "";
    temp.DOB = !fieldValues.DOB ? "This feild is required" : "";
    temp.DOJ = !fieldValues.DOJ ? "This feild is required" : "";
    temp.FirstName = !fieldValues.FirstName
      ? "This feild is required"
      : !fieldValues.FirstName.trim()
      ? "This feild is required"
      : "";
    temp.LastName = !fieldValues.LastName
      ? "This feild is required"
      : !fieldValues.LastName.trim()
      ? "This feild is required"
      : "";
    temp.MobileNumber = !fieldValues.MobileNumber
      ? "This feild is required"
      : fieldValues.MobileNumber.length < 7
      ? "Mobile No. cannot be less than 7."
      : fieldValues.MobileNumber.length > 10
      ? "Mobile No. cannot be more than 10."
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const { employeeCreate } = useSelector((state) => state.getAllEmployeeCreate);

  const {
    ddlEmployeeCategoryRole,
    ddlTitle,
    ddlBranch,
    ddlEmployeeType,
    ddlPosition,
    ddlRole,
    ddlDepartment,
    ddlIsActive,
  } = employeeCreate;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      if (values.IDHREmployee === 0) {
        dispatch(employeeCreateAction(values));
      } else {
        dispatch(updateSingleEmployeeAction(values));
      }
    }
  };

  useEffect(() => {
    if (employee) {
      setValues({ ...employee });
    }
  }, [employee]);

  return (
    <>
      <DialogContent dividers>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <SelectControl
                name="IDHREmployeeCategoryRole"
                label="Category Role"
                value={values.IDHREmployeeCategoryRole}
                options={ddlEmployeeCategoryRole}
                onChange={handleInputChange}
                errors={errors.IDHREmployeeCategoryRole}
              />
              <InputControl
                name="LoginIDHREmployee"
                label="Login ID*"
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
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={handleInputChange}
                errors={errors.FirstName}
              />
              <InputControl
                name="LastName"
                label="Last Name*"
                value={values.LastName}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={handleInputChange}
                errors={errors.FirstName}
              />
              <InputControl
                name="EmailID"
                label="Email Address*"
                value={values.EmailID}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={handleInputChange}
                errors={errors.EmailID}
              />
              <SelectControl
                name="Sex"
                label="Gender"
                value={values.Sex}
                onChange={handleInputChange}
                options={gender}
                errors={errors.Sex}
              />
              <DatePickerControl
                name="DOJ"
                label="Date Of Joining"
                value={values.DOJ}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={handleInputChange}
                errors={errors.DOJ}
              />
              <SelectControl
                name="IDHREmployeeType"
                label="Employee Type"
                value={values.IDHREmployeeType}
                onChange={handleInputChange}
                options={ddlEmployeeType}
                errors={errors.IDHREmployeeType}
              />
              <SelectControl
                name="IDHRBranch"
                label="Branch Name"
                value={values.IDHRBranch}
                onChange={handleInputChange}
                options={ddlBranch}
                errors={errors.IDHRBranch}
              />
              <SelectControl
                name="Position"
                label="Position"
                value={values.Position}
                onChange={handleInputChange}
                options={ddlPosition}
                errors={errors.Position}
              />
              <SelectControl
                name="WebLoginAccess"
                label="Web Login Access"
                value={values.WebLoginAccess}
                onChange={handleInputChange}
                options={loginAccess}
                errors={errors.WebLoginAccess}
              />
            </Grid>
            <Grid item xs={6}>
              <InputControl
                name="ShortName"
                label="Short Name"
                onFocus={(e) => {
                  e.target.select();
                }}
                value={values.ShortName}
                onChange={handleInputChange}
              />
              <SelectControl
                name="Title"
                label="Title"
                value={values.Title}
                onChange={handleInputChange}
                options={ddlTitle}
                errors={errors.Title}
              />

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
                label="Mobile Number*"
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
              <SelectControl
                name="Married"
                label="Is Married"
                value={values.Married}
                onChange={handleInputChange}
                options={married}
                errors={errors.Married}
              />
              <SelectControl
                name="IDHRRole"
                label="Role"
                value={values.IDHRRole}
                onChange={handleInputChange}
                options={ddlRole}
                errors={errors.IDHRRole}
              />
              <InputControl
                name="BankAC"
                label="Bank Account"
                value={values.BankAC}
                onFocus={(e) => {
                  e.target.select();
                }}
                onWheelCapture={(e) => {
                  e.target.blur();
                }}
                onKeyDown={(e) =>
                  symbolsArrPhone.includes(e.key) && e.preventDefault()
                }
                type="number"
                onChange={handleInputChange}
              />
              <SelectControl
                name="IDHRDepartment"
                label="Department Name"
                value={values.IDHRDepartment}
                onChange={handleInputChange}
                options={ddlDepartment}
                errors={errors.IDHRDepartment}
              />
              <SelectControl
                name="JoinedPosition"
                label="Joined Position"
                value={values.Position}
                onChange={handleInputChange}
                options={ddlPosition}
                errors={errors.Position}
              />

              <SelectControl
                name="IsActive"
                label="IsActive"
                value={values.IsActive}
                onChange={handleInputChange}
                options={ddlIsActive}
              />
            </Grid>
          </Grid>
        </Form>
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
          onClick={handleSubmit}
          disabled={active}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default EmployeeForm;
