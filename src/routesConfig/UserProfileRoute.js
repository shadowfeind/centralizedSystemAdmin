import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FindInPageIcon from "@material-ui/icons/FindInPage";

export const UserProfileRoute = [
  {
    name: "User Profile",
    route: "/user-profile",
    icon: AccountCircleIcon,
    exact: false,
  },
  {
    name: "Auto Search",
    route: "/auto-search",
    icon: FindInPageIcon,
    exact: false,
  },
];
