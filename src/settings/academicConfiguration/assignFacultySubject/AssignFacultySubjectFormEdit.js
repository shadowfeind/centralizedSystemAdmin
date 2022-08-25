import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { academicFacultySubjectPostEditAction } from "./AssignFacultySubjectActions";
import { symbolsArrPhoneDot } from "../../../helpers/excludeSymbol";

const initialFormValues = {
  IDAcademicFacultySubjectLink: 0,
  IDAcademicSubject: 0,
  AcademicLevel: 0,
  CreditHour: 3,
  IDHRCompany: 0,
  IsActive: false,
  IsOptional: false,
  IsCompulsory: false,
  IsTheoritical: false,
  IsPractical: false,
  SubjectName: "",
  SubjectCode: "",
  SubjectDescription: "",
  IsShowInLedger: false,
};

const AssignFacultySubjectFormEdit = ({
  singleFacultySubject,
  setOpenPopup,
  dbModel,
  idYearFacultyProgramLink,
  level,
  setOpenPopupForm,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.CreditHour = fieldValues.CreditHour ? "" : "This feild is required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      dispatch(
        academicFacultySubjectPostEditAction(
          dbModel,
          values,
          idYearFacultyProgramLink,
          level
        )
      );
      setOpenPopupForm(false);
    }
  };

  useEffect(() => {
    if (singleFacultySubject) {
      setValues({ ...singleFacultySubject });
    }
  }, [singleFacultySubject]);
  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            disabled
            name="SubjectName"
            label="Subject Name"
            value={values.SubjectName}
            variant="filled"
          />

          <InputControl
            disabled
            name="SubjectCode"
            label="Subject Code"
            onFocus={(e) => {
              e.target.select();
            }}
            value={values.SubjectCode}
            variant="filled"
          />
          <InputControl
            disabled
            name="IsOptional"
            onFocus={(e) => {
              e.target.select();
            }}
            label="Mark As Optional"
            value={values.IsOptional}
            variant="filled"
          />
          <InputControl
            disabled
            name="IsTheoritical"
            onFocus={(e) => {
              e.target.select();
            }}
            label="Mark As Theoritical"
            value={values.IsTheoritical}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            disabled
            name="SubjectDescription"
            onFocus={(e) => {
              e.target.select();
            }}
            label="Subject Description"
            value={values.SubjectDescription}
            variant="filled"
          />
          <InputControl
            disabled
            name="IsCompulsory"
            onFocus={(e) => {
              e.target.select();
            }}
            label="Mark As Compulsory"
            value={values.IsCompulsory}
            variant="filled"
          />
          <InputControl
            disabled
            name="IsPractical"
            onFocus={(e) => {
              e.target.select();
            }}
            label="Mark As Practical"
            value={values.IsPractical}
            variant="filled"
          />
          <InputControl
            name="CreditHour"
            label="Credit Hour"
            onChange={handleInputChange}
            onFocus={(e) => {
              e.target.select();
            }}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onKeyDown={(e) =>
              symbolsArrPhoneDot.includes(e.key) && e.preventDefault()
            }
            value={values.CreditHour}
            type="number"
            variant="outlined"
            required
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
          onClick={() => setOpenPopupForm(false)}
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

export default AssignFacultySubjectFormEdit;
