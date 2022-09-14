import { Button, DialogContent, Grid } from "@material-ui/core";
import React from "react";
import DialogFooter from "../../components/DialogFooter";
import AdmitCardDesign from "./AdmitCardDesign";

const PrintAdminCardPrint = ({
  students,
  imagePath,
  classname,
  section,
  examDate,
  examEndDate,
  print,
  headerBanners,
  principleSignature,
  componentRef,
  year,
  yearDdl,
  dateValue,
  // enddateValue,
  setOpenPopup,
}) => {
  return (
    <div id="test-print-blueberry" ref={componentRef}>
      <DialogContent>
        <Grid container>
          {students &&
            students?.map((student) => (
              <Grid item xs={6} key={student.$id}>
                <AdmitCardDesign
                  key={student.$id}
                  student={student}
                  imagePath={imagePath}
                  classname={classname}
                  section={section}
                  examDate={examDate}
                  examEndDate={examEndDate}
                  headerBanners={headerBanners}
                  principleSignature={principleSignature}
                  year={year}
                  dateValue={dateValue}
                  // enddateValue={enddateValue}
                  yearDdl={yearDdl}
                />
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogFooter>
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
      </DialogFooter>
    </div>
  );
};

export default PrintAdminCardPrint;
