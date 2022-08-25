import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import { API_URL } from "../../../constants";
import { symbolsArrPhone } from "../../../helpers/excludeSymbol";

import {
  postCreateHrValueAction,
  putEditHrValueAction,
} from "./HrValueActions";

const initialFormValues = {
  IDHRCompanyValue: 0,
  SchoolName: "",
  SchoolCode: "",
  FullAddress: "",
  Slogan: "",
  SchoolType: "",
  TelNo: "",
  Email: "",
  RegNo: "",
  Url: "",
  SchoolLogo: "",
  HeaderBanner: "",
  PrincipleSignature: "",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-03-18T05:17:08.817Z",
  Updated_On: "2022-03-18T05:17:08.817Z",
};

const HrValueForm = ({ hrValueCreate, setOpenPopup, hrValueEdit }) => {
  const [headerBanner, setHeaderBanner] = useState("");
  const [schoolLogo, setSchoolLogo] = useState("");
  const [principleSignature, setPrincipleSignature] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgSrc1, setImgSrc1] = useState("");
  const [imgSrc2, setImgSrc2] = useState("");
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.SchoolName = !fieldValues.SchoolName ? "This Field is Required" : "";
    temp.FullAddress = !fieldValues.FullAddress ? "This Field is Required" : "";
    temp.Slogan = !fieldValues.Slogan ? "This Field is Required" : "";
    temp.TelNo = !fieldValues.TelNo ? "This Field is Required" : "";
    temp.Email = !fieldValues.Email ? "This Field is Required" : "";
    temp.RegNo = !fieldValues.RegNo ? "This Field is Required" : "";
    temp.Url = !fieldValues.Url ? "This Field is Required" : "";
    temp.SchoolType = !fieldValues.SchoolType ? "This Field is Required" : "";
    temp.SchoolCode = !fieldValues.SchoolCode ? "This Field is Required" : "";
    temp.Email = !fieldValues.Email
      ? "This Field is Required"
      : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValues.Email)
      ? ""
      : "Email is not valid";
    // temp.headerBanner =!fieldValues.headerBanner ? "This Field is Required" : "";
    // temp.schoolLogo =!fieldValues.schoolLogo ? "This Field is Required" : "";
    // temp.principleSignature =!fieldValues.principleSignature ? "This Field is Required" : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setActive(true);
      if (values.IDHRCompanyValue === 0) {
        dispatch(
          postCreateHrValueAction(
            values,
            headerBanner,
            schoolLogo,
            principleSignature
          )
        );
      } else {
        dispatch(
          putEditHrValueAction(
            values,
            headerBanner,
            schoolLogo,
            principleSignature,
            hrValueEdit.FullPath,
            hrValueEdit.FullPathSchoolLogo,
            hrValueEdit.FullPathPrincipleSignature
          )
        );
      }
    }
  };

  const handleHeaderBanner = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setHeaderBanner(event.target.files[0]);
  };

  const handleSchoolLogo = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc1(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setSchoolLogo(event.target.files[0]);
  };

  const handlePrincipleSignature = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc2(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setPrincipleSignature(event.target.files[0]);
  };

  useEffect(() => {
    if (hrValueEdit) {
      setValues({ ...hrValueEdit.dbModel });
      setHeaderBanner(`${API_URL}${hrValueEdit.HeaderBanner}`);
      setSchoolLogo(`${API_URL}${hrValueEdit.SchoolLogo}`);
      setPrincipleSignature(`${API_URL}${hrValueEdit.PrincipleSignature}`);
      console.log(hrValueEdit.dbModel);
    }
  }, [hrValueEdit]);

  useEffect(() => {
    if (hrValueCreate) {
      setValues({ ...hrValueCreate.dbModel });
    }
  }, [hrValueCreate]);

  const test = [{ Key: "", Value: "" }];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="SchoolName"
            label="SchoolName*"
            value={values.SchoolName}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.SchoolName}
          />
          <InputControl
            name="SchoolCode"
            label="School Code*"
            disabled={values.IDHRCompanyValue === 0 ? false : true}
            value={values.SchoolCode}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.SchoolCode}
          />
          <InputControl
            name="FullAddress"
            label="Full Address*"
            value={values.FullAddress}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.FullAddress}
          />
          <InputControl
            name="Slogan"
            label="Slogan*"
            value={values.Slogan}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.Slogan}
          />
          <InputControl
            name="SchoolType"
            label="School Short Name*"
            value={values.SchoolType}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.SchoolType}
          />
          <InputControl
            name="TelNo"
            label="Tel-No*"
            value={values.TelNo}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            type="number"
            errors={errors.TelNo}
          />
          <InputControl
            name="Email"
            label="Email*"
            value={values.Email}
            type="email"
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.Email}
          />
          <InputControl
            name="RegNo"
            label="RegNo*"
            value={values.RegNo}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.RegNo}
          />
          <InputControl
            name="Url"
            label="Url*"
            value={values.Url}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.Url}
          />

          <SelectControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            options={
              hrValueEdit
                ? hrValueEdit.ddlIsActive
                : hrValueCreate
                ? hrValueCreate.ddlIsActive
                : test
            }
            errors={errors.IsActive}
          />
        </Grid>

        <Grid item xs={6}>
          <h3>Select HeadBanner Photo:</h3>
          <InputControl
            name="ImageUploaded"
            // label="Select HeadBanner Photo"
            value={values?.FullPath}
            onChange={(e) => handleHeaderBanner(e)}
            type="file"
            // errors={errors.headerBanner}
          />

          <img
            src={
              imgSrc
                ? imgSrc
                : hrValueEdit && `${API_URL}${hrValueEdit.FullPath}`
            }
            height={200}
            width={200}
          />
          <h3>Select School Logo Photo:</h3>
          <InputControl
            name="ImageUploaded1"
            // label="Select School Logo Photo"
            value={values?.FullPathSchoolLogo}
            onChange={(e) => handleSchoolLogo(e)}
            type="file"
            // errors={errors.schoolLogo}
          />

          <img
            src={
              imgSrc1
                ? imgSrc1
                : hrValueEdit && `${API_URL}${hrValueEdit.FullPathSchoolLogo}`
            }
            height={200}
            width={200}
          />
          <h3>Select Principle Signature Photo:</h3>
          <InputControl
            name="ImageUploaded2"
            // label="Select Principle Signature Photo"
            value={values?.FullPathPrincipleSignature}
            onChange={(e) => handlePrincipleSignature(e)}
            type="file"
            // errors={errors.principleSignature}
          />

          <img
            src={
              imgSrc2
                ? imgSrc2
                : hrValueEdit &&
                  `${API_URL}${hrValueEdit.FullPathPrincipleSignature}`
            }
            height={200}
            width={200}
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

export default HrValueForm;
