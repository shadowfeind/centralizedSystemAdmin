import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import PublishIcon from "@material-ui/icons/Publish";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ListAltIcon from "@material-ui/icons/ListAlt";
export const ExaminationRoute = [
  // {
  //   name: "Academic Grading",
  //   route: "/examination",
  //   icon: RecordVoiceOver,
  //   exact: false,
  // },
  // {
  //   name: "Exam Division",
  //   route: "/exam-division",
  //   icon: Accessible,
  //   exact: false,
  // },
  {
    name: "Full/Pass Marks",
    route: "/examination",
    icon: ListAltIcon,
    exact: false,
  },
  {
    name: "Admit Card",
    route: "/print-admit-card",
    icon: AssignmentIndIcon,
    exact: false,
  },
  // {
  //   name: "Exam Mark Entry",
  //   route: "/exam-mark-entry",
  //   icon: Face,
  //   exact: false,
  // },
  {
    name: "Exam Mark Entry/Update",
    route: "/exam-mark-approval",
    icon: SystemUpdateAltIcon,
    exact: false,
  },
  {
    name: "Generate/Publish Result",
    route: "/generatepublish-result",
    icon: PublishIcon,
    exact: false,
  },

  {
    name: "Student Attendance",
    route: "/student-attendance",
    icon: HowToRegIcon,
    exact: false,
  },
  // {
  //   name: "ECA",
  //   route: "/level-test",
  //   icon: SportsKabaddiIcon,
  //   exact: false,
  // },
  {
    name: "ECA Data",
    route: "/eca-data",
    icon: SportsKabaddiIcon,
    exact: false,
  },
  {
    name: "Exam Result(Print)",
    route: "/exam-result",
    icon: AssessmentIcon,
    exact: false,
  },
];
