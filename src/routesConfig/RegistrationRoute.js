import DateRangeIcon from "@material-ui/icons/DateRange";
import PortraitIcon from "@material-ui/icons/Portrait";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
export const RegistrationRoute = [
  {
    name: "Counter Configuraion",
    route: "/counter-configuration",
    icon: DateRangeIcon,
    exact: false,
  },
  {
    name: "Admission Configuraion",
    route: "/admission-configuration",
    icon: PortraitIcon,
    exact: false,
  },
  {
    name: "Student Registration",
    route: "/registration",
    icon: GroupAddIcon,
    exact: false,
  },
];
