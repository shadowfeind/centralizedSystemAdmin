import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  positionCreateAction,
  updateSinglePositionAction,
} from "./PositionActions";

const initialFormValues = {
  IDHRPosition: 0,
  IDHRCompany: 2,
  PositionHead: "",
  PositionDescription: "",
  IsActive: true,
  Created_On: "2021-09-23",
  Updated_On: "2021-09-23",
};

const PositionForm = ({ position, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.PositionHead = !fieldValues.PositionHead
      ? "This feild is required"
      : fieldValues.PositionHead.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.PositionHead.trim()
      ? "This feild is required"
      : "";

    temp.PositionDescription = !fieldValues.PositionDescription
      ? "This feild is required"
      : !fieldValues.PositionDescription.trim()
      ? "This feild is required"
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
      if (values.IDHRPosition === 0) {
        dispatch(positionCreateAction(values));
      } else {
        dispatch(updateSinglePositionAction(values));
      }
    }
  };

  useEffect(() => {
    if (position) {
      setValues({ ...position });
    }
  }, [position]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="PositionHead"
            label="Position Head*"
            value={values.PositionHead}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.PositionHead}
          />

          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.IsActive}
          />
          <div></div>
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="PositionDescription"
            label="Position Description*"
            value={values.PositionDescription}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.PositionDescription}
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
          {active ? "PROCESSSSING" : "SUBMIT"}
        </Button>
      </div>
    </Form>
  );
};

export default PositionForm;
