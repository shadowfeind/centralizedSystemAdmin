import React, { useState, useEffect } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import { putSearchTeacherFacSubAction } from "./SearchTeacherFacultySubjectActions";
import DialogFooter from "../../../components/DialogFooter";

const initialFormValues = {
  IDHRTeacherFacultySubjectMappingHeader: "",
  IDTeacher: "",
  Level: "",
  IDYearFacultyLink: "",
  IDAcademicFacultySubjectLink: "",
  Summary: "",
  IDAcademicShift: "",
  Section: "",
  IsActive: true,
  Created_On: "2022-01-06T13:05:53",
  Updated_On: "2022-02-07T11:43:09.027",
};

const SearchTeacherFacultySubjectForm = ({
  datas,
  searchFilterModel,
  setOpenPopup,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.IDTeacher = !fieldValues.IDTeacher ? "This feild is required" : "";
    temp.IDAcademicFacultySubjectLink =
      !fieldValues?.IDAcademicFacultySubjectLink
        ? "This feild is required"
        : "";
    temp.Summary = !fieldValues?.Summary
      ? "This feild is required"
      : !fieldValues.Summary?.trim()
      ? "This feild is required"
      : fieldValues.Summary.length > 200
      ? "Must be less than 101 characters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp)?.every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      dispatch(putSearchTeacherFacSubAction(values));
    }
  };

  const fillerArray = [{ Key: "", Value: "" }];

  useEffect(() => {
    if (datas) {
      setValues({ ...datas.dbModel });
    }
  }, [datas]);

  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <SelectControl
                name="IDTeacher"
                label="Teacher"
                value={values.IDTeacher}
                onChange={handleInputChange}
                onFocus={(e) => {
                  e.target.select();
                }}
                options={datas ? datas.ddlTeacher : fillerArray}
                errors={errors.IDTeacher}
              />
              <InputControl
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
                name="IDAcademicFacultySubjectLink"
                label="Faculty Subject"
                value={values.IDAcademicFacultySubjectLink}
                onChange={handleInputChange}
                onFocus={(e) => {
                  e.target.select();
                }}
                options={datas ? datas?.ddlFacultySubject : fillerArray}
                errors={errors.IDAcademicFacultySubjectLink}
              />
              <SelectControl
                name="IsActive"
                label="IsActive"
                value={values.IsActive}
                onChange={handleInputChange}
                onFocus={(e) => {
                  e.target.select();
                }}
                options={datas ? datas?.ddlIsActive : fillerArray}
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

export default SearchTeacherFacultySubjectForm;
