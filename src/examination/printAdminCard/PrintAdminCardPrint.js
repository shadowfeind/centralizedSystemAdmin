import { Button, Grid } from "@material-ui/core";
import React from "react";
import AdmitCardDesign from "./AdmitCardDesign";

const PrintAdminCardPrint = ({
  students,
  imagePath,
  classname,
  examDate,
  print,
  headerBanners,
  principleSignature,
  componentRef,
  year,
  yearDdl,
  dateValue,
  setOpenPopup,
}) => {
  return (
    <div id="test-print-blueberry" ref={componentRef}>
      <Grid container>
        {students &&
          students?.map((student) => (
            <Grid item xs={6} key={student.$id}>
              <AdmitCardDesign
                key={student.$id}
                student={student}
                imagePath={imagePath}
                classname={classname}
                examDate={examDate}
                headerBanners={headerBanners}
                principleSignature={principleSignature}
                year={year}
                dateValue={dateValue}
                yearDdl={yearDdl}
              />
            </Grid>
          ))}
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
          onClick={() => setOpenPopup(false)}
          variant="contained"
          color="primary"
          className="card-print-hide-cancel"
          style={{ marginRight: "12px" }}
        >
          CANCEL
        </Button>
        <Button
          onClick={print}
          variant="contained"
          color="primary"
          id="card-print"
        >
          PRINT
        </Button>
      </div>
    </div>
  );
};

export default PrintAdminCardPrint;
