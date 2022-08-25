import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import DatePickerControl from "../../components/controls/DatePickerControl";
import {
  createSingleAdmissionConfigAction,
  updateSingleAdmissionConfigAction,
} from "./AdmissionConfigurationActions";

const initialFormValues = {
  IDFacultyConfiguration: 0,
  IDHRCompany: 0,
  IDYearFacultyLink: 0,
  AdmissionStartDate: "2021-12-30T05:53:28.306Z",
  AdmissionEndDate: "2021-12-30T05:53:28.306Z",
  EntranceDate: "2021-12-30T05:53:28.306Z",
  EntranceTime: "string",
  EntranceFullMark: 0,
  EntrancePassMark: 0,
  GroupDiscussionFullMark: 0,
  GroupDiscussionPassMark: 0,
  EntranceWeightage: 0,
  InterviewDate: "2021-12-30T05:53:28.306Z",
  InterviewTime: "string",
  InterviewFullMark: 0,
  InterviewPassMark: 0,
  InterviewerA: 0,
  InterviewerB: 0,
  InterviewerC: 0,
  InterviewWeightage: 0,
  AdmissionFee: 0,
  EntranceCutOffCount: 0,
  EntranceTimeSpan: 0,
  InterviewCutOffCount: 0,
  InterviewTimeSpan: 0,
  TotalPastPercentage: 0,
  SLCContribution: 0,
  IntermediateContribution: 0,
  BachelorContribution: 0,
  AEWContribution: 0,
  CBTContribution: 0,
  GDDate: "2021-12-30T05:53:28.306Z",
  GDTime: "string",
  RSPContribution: 0,
  NBBContribution: 0,
  KAContribution: 0,
  DTContribution: 0,
  GDWeightage: 0,
  PastAcademicWeightage: 0,
  AcademicWeightage: 0,
  TotalPastPerformance_L: 0,
  AEW_O: 0,
  CBT_N: 0,
  GD_U: 0,
  Interview_Z: 0,
  FinalPassMark: 0,
  Created_By: 0,
  Updated_By: 0,
  IsActive: true,
  Created_On: "2021-12-30T05:53:28.306Z",
  Updated_On: "2021-12-30T05:53:28.306Z",
};

const AdmissionConfigurationForm = ({
  updateAcademicConfig,
  createAcademicConfig,
  setOpenPopup,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.AdmissionStartDate = !fieldValues.AdmissionStartDate
      ? "This field is Required"
      : "";
    temp.AdmissionEndDate = !fieldValues.AdmissionEndDate
      ? "This field is Required"
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
      if (values.IDFacultyConfiguration === 0) {
        dispatch(createSingleAdmissionConfigAction(values));
      } else {
        dispatch(updateSingleAdmissionConfigAction(values));
      }
    }
  };

  useEffect(() => {
    if (updateAcademicConfig) {
      setValues({ ...updateAcademicConfig.dbModel });
    }
  }, [updateAcademicConfig]);

  useEffect(() => {
    if (createAcademicConfig) {
      setValues({ ...createAcademicConfig.dbModel });
    }
  }, [createAcademicConfig]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <DatePickerControl
            name="AdmissionStartDate"
            label="Admission Start Date"
            value={values.AdmissionStartDate}
            onChange={handleInputChange}
            errors={errors.AdmissionStartDate}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerControl
            name="AdmissionEndDate"
            label="Admission End Date"
            value={values.AdmissionEndDate}
            onChange={handleInputChange}
            errors={errors.AdmissionEndDate}
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

export default AdmissionConfigurationForm;
