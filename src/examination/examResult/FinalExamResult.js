import React, { useRef } from "react";
import FinalExamResultDesign from "./FinalExamResultDesign";
import { useReactToPrint } from "react-to-print";
import { Button, DialogContent } from "@material-ui/core";
import DialogFooter from "../../components/DialogFooter";

const FinalExamResult = ({
  result,
  headerBanners,
  setOpenPopupFinal,
  principleSignature,
  date,
}) => {
  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });
  const examYear = result.ddlAcademicYear?.filter(
    (x) => x.Key === result.idAcademicYear
  );
  return (
    <div id="result-final-print" ref={componentRef}>
      <DialogContent>
        {result &&
          result.dbStudentModelLst?.map((student) => {
            let subjectList = result.dbModelLstForCountSubject?.filter(
              (x) =>
                (x.IDHREmployee === student.IDHREmployee) &
                (x.EventName == "FIRST TERM EXAMINATION")
            );
            let firstTerm = result.dbModelLst?.filter(
              (x) =>
                (x.EventName == "FIRST TERM EXAMINATION") &
                (x.IDHREmployee === student.IDHREmployee)
            );
            let secondTerm = result.dbModelLst?.filter(
              (x) =>
                (x.EventName == "SECOND TERM EXAMINATION") &
                (x.IDHREmployee === student.IDHREmployee)
            );
            let thirdTerm = result.dbModelLst?.filter(
              (x) =>
                (x.EventName == "THIRD TERM EXAMINATION") &
                (x.IDHREmployee === student.IDHREmployee)
            );
            let finalTerm = result.dbModelLst?.filter(
              (x) =>
                (x.EventName == "FINAL TERM EXAMINATION") &
                (x.IDHREmployee === student.IDHREmployee)
            );
            let attendance = result.StudentAttendanceDay?.filter(
              (x) => x.IDHREmployee === student.IDHREmployee
            );
            let crrentStudentId = result.dbModelResultLst?.filter(
              (x) => x.Key === student.IDHREmployee
            );
            let currentStudentRank = [];
            if (
              crrentStudentId.length > 0 &&
              crrentStudentId.value !== "Fail"
            ) {
              currentStudentRank = result.dbModelRankLst?.filter(
                (x) => x.Key === student.IDHREmployee
              );
            }
            let studentClass = result.ddlLevel?.filter(
              (x) => x.Key === result.level
            );
            let studentSection = result.ddlSection?.filter(
              (x) => x.Key === result.classSection
            );
            let ecaData = result.ecaData?.filter(
              (s) => s.IDHREmployee === student.IDHREmployee
            );
            let ecaDataWithName = [];
            ecaData?.map((x) => {
              result.ddlAcademicFacultyECASubModel?.forEach((s) => {
                if (s.IDAssignECA === x.IDAssignECA) {
                  ecaDataWithName?.push({ ...s, ECAValue: x.ECAValue });
                }
              });
            });
            let studentYear = result.ddlAcademicYear?.filter(
              (x) => x.Key === result.idAcademicYear
            );

            return (
              <FinalExamResultDesign
                student={student}
                key={student.$id}
                firstTerm={firstTerm}
                secondTerm={secondTerm}
                thirdTerm={thirdTerm}
                finalTerm={finalTerm}
                subjectList={subjectList}
                attendance={attendance}
                currentStudentRank={currentStudentRank}
                studentClass={studentClass}
                studentSection={studentSection}
                studentYear={result.npYear}
                resultDate={result.footerModel.PublishDate}
                headerBanners={headerBanners}
                ecaDataWithName={ecaDataWithName}
                principleSignature={principleSignature}
                date={date}
              />
            );
          })}
      </DialogContent>
      <DialogFooter>
        <Button
          onClick={() => setOpenPopupFinal(false)}
          className="print-button-hide"
          variant="contained"
          color="primary"
          style={{ marginRight: "16px" }}
        >
          CANCEL
        </Button>

        <Button
          onClick={printPdf}
          className="print-button-hide"
          variant="contained"
          color="primary"
        >
          PRINT
        </Button>
      </DialogFooter>
    </div>
  );
};

export default FinalExamResult;
