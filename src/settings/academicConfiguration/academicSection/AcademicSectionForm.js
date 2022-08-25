import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { symbolsArrPhone } from "../../../helpers/excludeSymbol";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  AcademicSectionCreateAction,
  updateSingleAcademicSectionAction,
} from "./AcademicSectionActions";

const initialFormValues = {
  IDAcademicRoom: 0,
  IDHRCompany: 2,
  RoomName: "",
  RoomLocation: "",
  RoomCapacity: "",
  IsActive: true,
  Created_On: "2021-09-23T03:44:16.140Z",
  Updated_On: "2021-09-23T03:44:16.141Z",
};

const AcademicSectinoForm = ({ academicSection, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.RoomName = !fieldValues.RoomName
      ? "This feild is required"
      : !fieldValues.RoomName.trim()
      ? "This feild is required"
      : "";
    temp.RoomCapacity = fieldValues.RoomCapacity
      ? ""
      : "This feild is required";
    temp.RoomLocation = !fieldValues.RoomLocation
      ? "This feild is required"
      : !fieldValues.RoomLocation.trim()
      ? "This feild is required"
      : fieldValues.RoomLocation.length > 200
      ? "Must be less than 201 letters"
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
      if (values.IDAcademicRoom === 0) {
        dispatch(AcademicSectionCreateAction(values));
      } else {
        dispatch(updateSingleAcademicSectionAction(values));
      }
    }
  };

  useEffect(() => {
    if (academicSection) {
      setValues({ ...academicSection });
    }
  }, [academicSection]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="RoomName"
            label="Academic Section*"
            onFocus={(e) => {
              e.target.select();
            }}
            value={values.RoomName}
            onChange={handleInputChange}
            errors={errors.RoomName}
          />

          <InputControl
            name="RoomLocation"
            label="Section Location*"
            onFocus={(e) => {
              e.target.select();
            }}
            value={values.RoomLocation}
            onChange={handleInputChange}
            errors={errors.RoomLocation}
          />

          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            errors={errors.IsActive}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="RoomCapacity"
            label="Section Capacity*"
            value={values.RoomCapacity}
            onFocus={(e) => {
              e.target.select();
            }}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            onChange={handleInputChange}
            errors={errors.RoomCapacity}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            type="number"
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

export default AcademicSectinoForm;
