import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  deletePositionAction,
  getSinglePositionAction,
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

const PositionDeleteForm = ({ positionDelete, setOpenDeletePopup }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleDelete = (e) => {
    e.preventDefault();
    setActive(true);
    dispatch(deletePositionAction(values));
  };

  useEffect(() => {
    if (positionDelete) {
      setValues({ ...positionDelete });
    }
  }, [positionDelete]);
  return positionDelete ? (
    <>
      <Form onSubmit={handleDelete}>
        <Grid container style={{ fontSize: "12px" }}>
          <Grid item xs={6}>
            <InputControl
              disabled
              name="PositionHead"
              label="Position Head*"
              value={values.PositionHead}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={handleInputChange}
              // errors={errors.PositionHead}
            />

            <CheckBoxControl
              disabled
              name="IsActive"
              label="IsActive"
              value={values.IsActive}
              onChange={handleInputChange}
              // errors={errors.IsActive}
            />
          </Grid>
          <Grid item xs={6}>
            <InputControl
              disabled
              name="PositionDescription"
              label="Position Description*"
              onFocus={(e) => {
                e.target.select();
              }}
              value={values.PositionDescription}
              onChange={handleInputChange}
              // errors={errors.PositionDescription}
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
            disabled={active}
            onClick={() => dispatch(deletePositionAction(positionDelete))}
            style={{ margin: "10px 0 0 10px" }}
          >
            {active ? "PROCESSING" : "DELETE"}
          </Button>
        </div>
      </Form>
    </>
  ) : (
    <div></div>
  );
};

export default PositionDeleteForm;
