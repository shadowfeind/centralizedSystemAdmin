import AnnouncementIcon from "@material-ui/icons/Announcement";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";

export const NotificationRoute = [
  {
    name: "Announcement",
    route: "/notification",
    icon: AnnouncementIcon,
    exact: false,
  },
  {
    name: "Class Notification",
    route: "/class-notification",
    icon: NotificationsActiveIcon,
    exact: true,
  },
  {
    name: "Teacher Notification",
    route: "/teacher-notification",
    icon: RecordVoiceOverIcon,
    exact: false,
  },

  // {
  //   name: "Individual Notification",
  //   route: "/individual-notification",
  //   icon: RecordVoiceOverIcon,
  //   exact: false,
  // },
];
