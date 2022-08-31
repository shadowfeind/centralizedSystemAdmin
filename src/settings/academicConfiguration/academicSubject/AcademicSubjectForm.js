import React, { useState, useEffect } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";

import DialogFooter from "../../../components/DialogFooter";

import {
  academicSubjectCreateAction,
  updateSingleAcademicSubjectAction,
} from "./AcademicSubjectActions";

const initialFormValues = {
  IDAcademicSubject: 0,
  IDHRCompany: 2,
  SubjectName: "",
  SubjectCode: "",
  SubjectDescription: "",
  CreditHour: 4,
  IsOptional: false,
  IsCompulsory: true,
  IsTheoritical: false,
  IsPractical: true,
  IsShowInLedger: true,
  IsActive: true,
  Created_On: "2021-09-23",
  Updated_On: "2021-09-23",
};

const AcademicSubjectForm = ({ academicSubject }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.SubjectName = !fieldValues.SubjectName
      ? "This feild is required"
      : !fieldValues.SubjectName.trim()
      ? "This feild is required"
      : fieldValues.SubjectName.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.SubjectDescription = !fieldValues.SubjectDescription
      ? "This feild is required"
      : !fieldValues.SubjectDescription.trim()
      ? "This feild is required"
      : "";

    temp.SubjectCode = !fieldValues.SubjectCode
      ? "This field is required"
      : !fieldValues.SubjectCode.trim()
      ? "This field is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      if (values.IDAcademicSubject === 0) {
        dispatch(academicSubjectCreateAction(values));
      } else {
        dispatch(updateSingleAcademicSubjectAction(values));
      }
    }
  };

  useEffect(() => {
    if (academicSubject) {
      setValues({ ...academicSubject });
    }
  }, [academicSubject]);

  const handleCompulsory = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      IsOptional: !value,
    }));
  };
  const handleOptional = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      IsCompulsory: !value,
    }));
  };
  const handleTheory = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      IsPractical: !value,
    }));
  };
  const handlePractical = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      IsTheoritical: !value,
    }));
  };

  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <InputControl
                name="SubjectName"
                label="Subject Name*"
                value={values.SubjectName}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={handleInputChange}
                errors={errors.SubjectName}
              />
            </Grid>

            <Grid item xs={6}>
              <InputControl
                name="SubjectCode"
                label="Subject Code*"
                value={values.SubjectCode}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={handleInputChange}
                errors={errors.SubjectCode}
              />
            </Grid>
          </Grid>

          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={12}>
              <InputControl
                name="SubjectDescription"
                label="Subject Description*"
                value={values.SubjectDescription}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={handleInputChange}
                errors={errors.SubjectDescription}
              />
            </Grid>
          </Grid>

          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <CheckBoxControl
                name="IsCompulsory"
                label="Mark As Compulsory"
                value={values.IsCompulsory}
                onChange={handleCompulsory}
                errors={errors.IsCompulsory}
              />

              <CheckBoxControl
                name="IsTheoritical"
                label="Mark As Theoritical"
                value={values.IsTheoritical}
                onChange={handleTheory}
                errors={errors.IsTheoritical}
              />

              <CheckBoxControl
                name="IsActive"
                label="Is Active"
                value={values.IsActive}
                onChange={handleInputChange}
                errors={errors.IsActive}
              />
            </Grid>

            <Grid item xs={6}>
              <CheckBoxControl
                name="IsOptional"
                label="Mark As Optional"
                value={values.IsOptional}
                onChange={handleOptional}
                errors={errors.IsOptional}
              />

              <CheckBoxControl
                name="IsPractical"
                label="Mark As Practical"
                value={values.IsPractical}
                onChange={handlePractical}
                errors={errors.IsPractical}
              />

              <CheckBoxControl
                name="IsShowInLedger"
                label="Show Ledger"
                value={values.IsShowInLedger}
                onChange={handleInputChange}
                errors={errors.IsShowInLedger}
              />
            </Grid>
          </Grid>

          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Form>
      </DialogContent>
      <DialogFooter>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={active}
          style={{ margin: "10px 0 0 10px" }}
          onClick={handleSubmit}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </DialogFooter>
    </>
  );
};
export default AcademicSubjectForm;
