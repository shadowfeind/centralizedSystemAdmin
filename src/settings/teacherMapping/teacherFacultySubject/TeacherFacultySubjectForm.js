import React, { useState, useEffect } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import {
  createSingleTeacherFacSubAction,
  singleTeacherFacSubEditAction,
} from "./TeacherFacultySubjectActions";
import DialogFooter from "../../../components/DialogFooter";

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

const TeacherFacultySubjectForm = ({
  editData,
  createData,
  setOpenPopup,
  searchFilterModel,
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

    if (validate()) {
      setActive(true);
      if (values.IDHRTeacherFacultySubjectMappingHeader === 0) {
        dispatch(createSingleTeacherFacSubAction(values, searchFilterModel));
      } else {
        dispatch(singleTeacherFacSubEditAction(values));
      }
      setOpenPopup(false);
    }
  };

  const fillerArray = [{ Key: "", Value: "" }];
  useEffect(() => {
    if (editData) {
      setValues({ ...editData.dbModel });
      console.log(editData);
    }
    if (createData) {
      setValues({
        ...createData.dbModel,
        IDTeacher: createData?.ddlTeacher[0]?.Key,
        IDAcademicFacultySubjectLink: createData?.ddlFacultySubject[0]?.Key,
      });
    }
  }, [editData, createData]);

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
                options={
                  editData
                    ? editData.ddlTeacher
                    : createData
                    ? createData.ddlTeacher
                    : fillerArray
                }
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
                options={
                  editData
                    ? editData.ddlFacultySubject
                    : createData
                    ? createData.ddlFacultySubject
                    : fillerArray
                }
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
                options={
                  editData
                    ? editData.ddlIsActive
                    : createData
                    ? createData.ddlIsActive
                    : fillerArray
                }
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

export default TeacherFacultySubjectForm;
