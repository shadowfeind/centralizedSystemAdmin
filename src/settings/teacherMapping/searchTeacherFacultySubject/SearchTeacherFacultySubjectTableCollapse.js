import React from "react";
import { Button, TableRow, TableCell, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const SearchTeacherFacultySubjectTableCollapse = ({
  item,
  year,
  subject,
  classId,
  section,
  shift,
  updateCollegeHandler,
}) => {
  const yearNameToShow = year?.filter((s) => s.Key === item.idAcademicYear);
  const subjectNameToShow = subject?.filter(
    (s) => s.Key === item.IDAcademicFacultySubjectLink
  );
  const classNameToShow = classId?.filter((s) => s.Key === item.Level);
  const sectionNameToShow = section?.filter((s) => s.Key == item.Section);
  const shiftNameToShow = shift?.filter((s) => s.Key === item.IDAcademicShift);

  const classes = useStyles();
  return (
    <TableRow>
      <TableCell>{item.TeacherName}</TableCell>
      <TableCell>
        {yearNameToShow?.length > 0 && yearNameToShow[0]?.Value}
      </TableCell>
      <TableCell>
        {classNameToShow?.length > 0 && classNameToShow[0]?.Value}
      </TableCell>
      <TableCell>
        {subjectNameToShow?.length > 0 && subjectNameToShow[0]?.Value}
      </TableCell>
      <TableCell>
        {sectionNameToShow?.length > 0 && sectionNameToShow[0]?.Value}
      </TableCell>
      <TableCell>
        {shiftNameToShow?.length > 0 && shiftNameToShow[0]?.Value}
      </TableCell>
      <TableCell>{item.Created_On?.slice(0, 10)}</TableCell>
      <TableCell>{item.IsActive ? "Active" : "Not Active"}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() =>
            updateCollegeHandler(
              item.IDHRTeacherFacultySubjectMappingHeader,
              item.IDYearFacultyLink,
              item.Level,
              item.Section,
              item.IDAcademicShift,
              item.IDTeacher
            )
          }
        >
          <EditIcon style={{ fontSize: 12 }} />
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default SearchTeacherFacultySubjectTableCollapse;
