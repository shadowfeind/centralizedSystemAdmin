import React, { useRef } from "react";
import ExamResultWithMarksDesign from "./ExamResultWithMarksDesign";
import { useReactToPrint } from "react-to-print";
import { Button, DialogContent } from "@material-ui/core";
import DialogFooter from "../../components/DialogFooter";

const ExamResultWithMarksModel = ({
  examReport,
  headerBanners,
  setOpenPopupResultMark,
  principleSignature,
  date,
}) => {
  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });
  const examTerm =
    examReport &&
    examReport.ddlAcademicYearCalendar?.filter(
      (x) => x.Key === examReport.idAcademicYearCalendar
    );

  // const examYear = examReport.ddlAcademicYear?.filter(
  //   (x) => x.Key === examReport.idAcademicYear
  // );

  return (
    <div id="result-with-marks" ref={componentRef}>
      <DialogContent>
        {examReport &&
          examReport.dbStudentModelLst?.map((student) => {
            let subjects = examReport.dbModelLst?.filter(
              (s) => s.IDHREmployee === student.IDHREmployee
            );
            let levelTest = examReport.LevelTestLst?.filter(
              (s) => s.IDHREmployee === student.IDHREmployee
            );
            let studentAttendance = examReport.StudentAttendanceDay?.filter(
              (s) => s.IDHREmployee === student.IDHREmployee
            );
            let rank = examReport.dbModelRankLst?.filter(
              (s) => s.Key === student.IDHREmployee
            );
            let ecaDataFinal = [];
            // let ecaDataConcatContainer = [];
            examReport.ddlAcademicFacultyECASubModel?.forEach((x) => {
              let test = examReport.ecaData?.filter((s) => {
                if (
                  s.IDAssignECA == x.IDAssignECA &&
                  s.IDHREmployee == student.IDHREmployee
                ) {
                  ecaDataFinal?.push({ ...s, ECAName: x.ECAName });
                }
                // console.log("test", test);
              });
            });

            let studentClass = examReport.ddlLevel?.filter(
              (x) => x.Key === examReport.level
            );
            // let studentYear = examReport.ddlAcademicYear?.filter(
            //   (x) => x.Key === examReport.idAcademicYear
            // );
            let studentSection = examReport.ddlSection?.filter(
              (x) => x.Key === examReport.classSection
            );
            return (
              <ExamResultWithMarksDesign
                key={student.$id}
                student={student}
                subjects={subjects}
                levelTest={levelTest}
                studentAttendance={studentAttendance}
                dbModelLst={examReport.dbModelLst}
                forDate={examReport.footerModel}
                examTerm={examTerm[0]}
                studentClass={studentClass[0]}
                studentYear={examReport.npYear}
                studentSection={studentSection[0]}
                headerBanners={headerBanners}
                ecaDataWithName={ecaDataFinal}
                principleSignature={principleSignature}
                rank={rank}
                date={date}
              />
            );
          })}
      </DialogContent>
      <DialogFooter>
        <Button
          onClick={() => setOpenPopupResultMark(false)}
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

export default ExamResultWithMarksModel;
