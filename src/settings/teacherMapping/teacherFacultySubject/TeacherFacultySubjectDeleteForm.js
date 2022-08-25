import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import { deleteTeacherFacSubAction } from "./TeacherFacultySubjectActions";

const initialFormValues = {
  IDHRTeacherFacultySubjectMappingHeader: 0,
  IDTeacher: 0,
  Level: "",
  IDYearFacultyLink: "",
  IDAcademicFacultySubjectLink: "",
  Summary: "",
  IDAcademicShift: "",
  Section: "",
  IsActive: true,
  Created_On: "2022-01-06T13:05:53.393",
  Updated_On: "2022-01-06T13:05:53.393",
};

const TeacherFacultySubjectDeleteForm = ({
  deleteForm,
  setOpenDeletePopup,
}) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.IDTeacher = !fieldValues.IDTeacher ? "This feild is required" : "";
    temp.IDAcademicFacultySubjectLink =
      !fieldValues.IDAcademicFacultySubjectLink ? "This feild is required" : "";
    temp.Summary = !fieldValues.Summary
      ? "This feild is required"
      : !fieldValues.Summary.trim()
      ? "This feild is required"
      : fieldValues.Summary.length > 200
      ? "Must be less than 101 characters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    setActive(true);
    dispatch(deleteTeacherFacSubAction(values));

    setOpenDeletePopup(false);
  };

  const fillerArray = [{ Key: "", Value: "" }];
  useEffect(() => {
    if (deleteForm) {
      setValues({ ...deleteForm.dbModel });
      console.log(deleteForm);
    }
  }, [deleteForm]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            disabled
            name="IDTeacher"
            label="Teacher"
            value={values.IDTeacher}
            onChange={null}
            onFocus={(e) => {
              e.target.select();
            }}
            options={deleteForm ? deleteForm.ddlTeacher : fillerArray}
            errors={errors.IDTeacher}
          />
          <InputControl
            disabled
            name="Summary"
            label="Summary"
            value={values.Summary}
            onChange={handleInputChange}
            onFocus={(e) => {
              e.target.select();
            }}
            variant="outlined"
            errors={errors.Summary}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectControl
            disabled
            name="IDAcademicFacultySubjectLink"
            label="Faculty Subject"
            value={values.IDAcademicFacultySubjectLink}
            onChange={null}
            onFocus={(e) => {
              e.target.select();
            }}
            options={deleteForm ? deleteForm.ddlFacultySubject : fillerArray}
            errors={errors.IDAcademicFacultySubjectLink}
          />
          <SelectControl
            disabled
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={null}
            onFocus={(e) => {
              e.target.select();
            }}
            options={deleteForm ? deleteForm.ddlIsActive : fillerArray}
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
          onClick={() => setOpenDeletePopup(false)}
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
          {active ? "PROCESSING" : "DELETE"}
        </Button>
      </div>
    </Form>
  );
};

export default TeacherFacultySubjectDeleteForm;
