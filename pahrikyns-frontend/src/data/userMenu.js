import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/Inbox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import PaymentsIcon from "@mui/icons-material/Payments";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

export const userMenu = [
  { label: "Home", icon: DashboardIcon, path: "/dashboard" },
  { label: "Inbox", icon: InboxIcon, path: "/messages" },
  { label: "Calendar", icon: CalendarMonthIcon, path: "/calendar" },
  { label: "Courses", icon: SchoolIcon, path: "/my-courses" },
  { label: "Payment Details", icon: PaymentsIcon, path: "/subscription" },
  { label: "Achievements", icon: EmojiEventsIcon, path: "/achievements" },
  { label: "Community", icon: GroupsIcon, path: "/community" },
  { label: "Settings", icon: SettingsIcon, path: "/settings" },
];
