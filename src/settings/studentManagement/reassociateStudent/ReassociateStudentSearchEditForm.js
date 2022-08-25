import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { putReassociateStudentsAction } from "./ReassociateStudentActions";
import SelectControl from "../../../components/controls/SelectControl";

const initialFormValues = {
  IDStudentFacultyLevel: "",
  IDYearFacultyLink: "",
  IDAdmissionRegistration: "",
  IDLevel: "",
  Section: "",
  IDAcademicShift: "",
  LevelStatus: "",
  Created_On: "2022-03-21T10:50:18.233Z",
  Updated_On: "2022-03-21T10:50:18.233Z",
};

const ReassociateStudentSearchEditForm = ({
  reassociateForm,
  setOpenPopupEdit,
}) => {
  const [studentName, setStudentName] = useState([]);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.IDAdmissionRegistration = !fieldValues.IDAdmissionRegistration
      ? "This feild is required"
      : "";
    temp.IDYearFacultyLink = !fieldValues.IDYearFacultyLink
      ? "This feild is required"
      : "";
    temp.IDLevel = !fieldValues.IDLevel ? "This feild is required" : "";
    temp.IDAcademicShift = !fieldValues.IDAcademicShift
      ? "This feild is required"
      : "";
    temp.Section = !fieldValues.Section ? "This feild is required" : "";
    temp.LevelStatus = !fieldValues.LevelStatus ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setActive(true);
      dispatch(putReassociateStudentsAction(values));
    }
  };

  useEffect(() => {
    if (reassociateForm) {
      setValues({ ...reassociateForm.dbModel });
      const studentNameFilter = reassociateForm.ddlStaff.filter(
        (s) => s.Key === reassociateForm.dbModel.IDAdmissionRegistration
      );
      setStudentName(studentNameFilter);
    }
  }, [reassociateForm]);

  const test = [{ Key: "", Value: "" }];

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container style={{ fontSize: "12px" }}>
          <Grid item xs={6}>
            <InputControl
              disabled
              name="IDAdmissionRegistration"
              label="Admission Registration"
              onFocus={(e) => {
                e.target.select();
              }}
              value={studentName?.length > 0 && studentName[0].Value}
            />
            <SelectControl
              name="IDYearFacultyLink"
              label="Year Faculty Link"
              value={values.IDYearFacultyLink}
              options={
                reassociateForm ? reassociateForm.ddlFacultyProgramLink : test
              }
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={handleInputChange}
              errors={errors.IDYearFacultyLink}
            />
            <SelectControl
              name="IDLevel"
              label="Class"
              value={values.IDLevel}
              options={reassociateForm ? reassociateForm.ddlClass : test}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={handleInputChange}
              errors={errors.IDLevel}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectControl
              name="IDAcademicShift"
              label="AcademicShift"
              value={values.IDAcademicShift}
              options={
                reassociateForm ? reassociateForm.ddlAcademicShift : test
              }
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={handleInputChange}
              errors={errors.IDAcademicShift}
            />
            <SelectControl
              name="Section"
              label="Section"
              value={values.Section}
              options={reassociateForm ? reassociateForm.ddlSection : test}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={handleInputChange}
              errors={errors.Section}
            />
            <SelectControl
              name="LevelStatus"
              label="Class Status"
              value={values.LevelStatus}
              options={reassociateForm ? reassociateForm.ddlLevelStatus : test}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={handleInputChange}
              errors={errors.LevelStatus}
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
            onClick={() => setOpenPopupEdit(false)}
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
    </>
  );
};

export default ReassociateStudentSearchEditForm;
