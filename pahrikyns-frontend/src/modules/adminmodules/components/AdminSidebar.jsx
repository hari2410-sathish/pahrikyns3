import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Collapse,
  IconButton,
  Drawer,
  useMediaQuery,
  Badge,
} from "@mui/material";

// ICONS
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PaymentsIcon from "@mui/icons-material/Payments";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

// =====================================================
// MENU CONFIG
// =====================================================
const menu = [
  {
    title: "Dashboard",
    single: true,
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },

  {
    title: "Orders",
    icon: <SchoolIcon />,
    basePath: "/admin/orders",
    children: [
      { title: "All Orders", path: "/admin/orders" },
      { title: "Add Order", path: "/admin/orders/add" },
      { title: "Search", path: "/admin/orders/search" },
      { title: "Export", path: "/admin/orders/export" },
      { title: "Draft Orders", path: "/admin/orders/drafts" },
      { title: "Shipments", path: "/admin/orders/shipments" },
      { title: "Gift Certificates", path: "/admin/orders/gift-certificates" },
    ],
  },

  {
    title: "Products",
    icon: <BookIcon />,
    basePath: "/admin/products",
    children: [
      { title: "All Products", path: "/admin/products" },
      { title: "Add Product", path: "/admin/products/add" },
      { title: "Import", path: "/admin/products/import" },
      { title: "Export", path: "/admin/products/export" },
      { title: "Categories", path: "/admin/products/categories" },
      { title: "Options", path: "/admin/products/options" },
      { title: "Filtering", path: "/admin/products/filtering" },
      { title: "Reviews", path: "/admin/products/reviews" },
      { title: "Brands", path: "/admin/products/brands" },
      { title: "Import SKUs", path: "/admin/products/import-sku" },
      { title: "Export SKUs", path: "/admin/products/export-sku" },
    ],
  },

  {
    title: "Customers",
    icon: <PeopleIcon />,
    basePath: "/admin/Customers",
    children: [
      { title: "All Customers", path: "/admin/Customers/AllCustomers" },
      { title: "Add Customer", path: "/admin/Customers/AddCustomer" },
      { title: "Customer Details", path: "/admin/Customers/CustomerDetails" },
      { title: "Customer Groups", path: "/admin/Customers/CustomerGroups" },
    ],
  },

  {
    title: "Store Front",
    icon: <BookIcon />,
    basePath: "/admin/storefront",
    children: [
      { title: "Webpages", path: "/admin/storefront/webpages" },
      { title: "Blog", path: "/admin/storefront/blog" },
      { title: "Image Manager", path: "/admin/storefront/images" },
    ],
  },

  {
    title: "Analytics",
    icon: <BookIcon />,
    basePath: "/admin/analytics",
    children: [
      { title: "Overview", path: "/admin/analytics" },
      { title: "Insight", path: "/admin/analytics/insight" },
      { title: "Real Time", path: "/admin/analytics/realtime" },
      { title: "Marketing", path: "/admin/analytics/marketing" },
      { title: "Orders", path: "/admin/analytics/orders" },
      { title: "Customers", path: "/admin/analytics/customers" },
      { title: "Purchase Funnel", path: "/admin/analytics/purchase-funnel" },
      { title: "Carts", path: "/admin/analytics/carts" },
      { title: "Sales Tax Reports", path: "/admin/analytics/tax" },
    ],
  },

  {
    title: "Certificates",
    icon: <WorkspacePremiumIcon />,
    basePath: "/admin/certificates",
    children: [
      { title: "All Certificates", path: "/admin/certificates" },
      { title: "Issue Certificate", path: "/admin/certificates/issue" },
    ],
  },

  {
    title: "Payments",
    icon: <PaymentsIcon />,
    basePath: "/admin/payments",
    children: [
      { title: "All Payments", path: "/admin/payments" },
      { title: "Invoices", path: "/admin/payments/invoices" },
      { title: "Refunds", path: "/admin/payments/refunds" },
    ],
  },

  {
    title: "Resume",
    icon: <DescriptionIcon />,
    basePath: "/admin/resume",
    children: [
      { title: "Resume Home", path: "/admin/resume" },
      { title: "Builder", path: "/admin/resume/builder" },
      { title: "Simple", path: "/admin/resume/simple" },
      { title: "Medium", path: "/admin/resume/medium" },
      { title: "Pro", path: "/admin/resume/pro" },
      { title: "Master", path: "/admin/resume/master" },
      { title: "Ultra Pro", path: "/admin/resume/ultra-pro" },
    ],
  },

  {
    title: "Settings",
    icon: <SettingsIcon />,
    basePath: "/admin/settings",
    children: [
      { title: "Settings Home", path: "/admin/settings" },
      { title: "Admin Profile", path: "/admin/settings/profile" },
      { title: "Change Password", path: "/admin/settings/password" },
      { title: "Sessions", path: "/admin/settings/sessions" },
      { title: "Security Logs", path: "/admin/settings/security-logs" },
      { title: "2FA", path: "/admin/settings/2fa" },
    ],
  },
];

export default function AdminSidebar({ notifyCount = 0 }) {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const userName = localStorage.getItem("ADMIN_NAME") || "Admin";

  const [openMenus, setOpenMenus] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  // AUTO EXPAND ACTIVE MENU
  useEffect(() => {
    const active = {};
    menu.forEach((m) => {
      if (m.basePath && location.pathname.startsWith(m.basePath)) {
        active[m.title] = true;
      }
    });
    setOpenMenus(active);
  }, [location.pathname]);

  const sidebarContent = (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        background: "rgba(2, 6, 23, 0.7)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(0, 234, 255, 0.1)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "rgba(0, 234, 255, 0.1)",
            color: "#00eaff",
            fontWeight: "bold",
            border: "1px solid rgba(0, 234, 255, 0.3)"
          }}
        >
          {userName[0]}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={800} sx={{ letterSpacing: "0.5px" }}>Admin Panel</Typography>
          <Typography fontSize={11} sx={{ color: "#00eaff", opacity: 0.8, letterSpacing: "1px" }}>SUPER ADMIN</Typography>
        </Box>
        <Badge badgeContent={notifyCount} color="error" variant="dot">
          <NotificationsIcon fontSize="small" sx={{ color: "rgba(255,255,255,0.5)" }} />
        </Badge>
      </Box>

      {/* MENU */}
      <Box sx={{ flex: 1, overflowY: "auto", py: 2 }}>
        <List component="nav" sx={{ px: 2 }}>
          {menu.map((item) =>
            item.single ? (
              <ListItemButton
                key={item.title}
                component={NavLink}
                to={item.path}
                end
                sx={sidebarItemStyle}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
              </ListItemButton>
            ) : (
              <Box key={item.title}>
                <ListItemButton
                  sx={sidebarItemStyle}
                  onClick={() =>
                    setOpenMenus((p) => ({ ...p, [item.title]: !p[item.title] }))
                  }
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 18,
                      transform: openMenus[item.title] ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s"
                    }}
                  />
                </ListItemButton>

                <Collapse in={openMenus[item.title]} timeout={300}>
                  <List component="div" disablePadding sx={{ position: "relative", ml: 2, pl: 2, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                    {item.children.map((sub) => (
                      <ListItemButton
                        key={sub.title}
                        component={NavLink}
                        to={sub.path}
                        sx={sidebarChildStyle}
                      >
                        <ListItemText primary={sub.title} primaryTypographyProps={{ fontSize: 13 }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            )
          )}
        </List>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton onClick={() => setMobileOpen(true)} sx={{ m: 1 }}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{ sx: { bgcolor: "transparent" } }}
        >
          {sidebarContent}
        </Drawer>
      </>
    );
  }

  return sidebarContent;
}

// =====================================================
// STYLES
// =====================================================
const sidebarItemStyle = {
  mb: 0.5,
  borderRadius: "10px",
  color: "rgba(255,255,255,0.7)",
  transition: "all 0.2s ease",
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.05)",
    color: "#fff",
    transform: "translateX(4px)",
  },
  "&.active": {
    bgcolor: "rgba(0, 234, 255, 0.1)",
    color: "#00eaff",
    border: "1px solid rgba(0, 234, 255, 0.2)",
    fontWeight: 700,
  },
};

const sidebarChildStyle = {
  my: 0.2,
  borderRadius: "6px",
  color: "rgba(255,255,255,0.5)",
  transition: "all 0.2s",
  "&:hover": {
    color: "#fff",
    bgcolor: "rgba(255,255,255,0.03)",
  },
  "&.active": {
    color: "#00eaff",
    bgcolor: "rgba(0, 234, 255, 0.05)",
  },
};
