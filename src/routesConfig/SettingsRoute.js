
import DescriptionIcon from '@material-ui/icons/Description';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SchoolIcon from '@material-ui/icons/School';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CastForEducationRoundedIcon from '@material-ui/icons/CastForEducationRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
export const SettingsRoute = [
  {
    name: "School Configuration",
    route: "/settings",
    icon: HomeWorkRoundedIcon,
    exact: true,
  },
  {
    name: "Employee Management",
    route: "/employee-management",
    icon: PeopleAltIcon,
    exact: false,
  },
  {
    name: "Academic Configuration",
    route: "/academic-configuration",
    icon: SchoolIcon,
    exact: false,
  },
  {
    name: "Teacher's Subject",
    route: "/teacher-mapping",
    icon: LibraryBooksIcon,
    exact: false,
  },
  {
    name: "Student Management",
    route: "/student-management",
    icon: PermContactCalendarIcon,
    exact: false,
  },
  {
    name: "Access Control",
    route: "/access-control",
    icon: SettingsRemoteIcon,
    exact: false,
  },
  {
    name: "Class Routine",
    route: "/class-schedule",
    icon: EventNoteIcon,
    exact: false,
  },
  // { name: "Notice", route: "/notice", icon: PostAdd, exact: false },
  
  {
    name: "Old Questions",
    route: "/old-questions",
    icon: MenuBookIcon,
    exact: false,
  },
  {
    name: "Syllabus",
    route: "/syllabus",
    icon: DescriptionIcon,
    exact: false,
  },
];
