import React, { useState, useEffect, useMemo } from "react";
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
// MENU CONFIG (FINAL – CORRECT)
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
      { title: "OrdersList", path: "/admin/OrdersList" },
      { title: "OrderDetails", path: "/admin/Orders/OrderDetails"},
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
    basePath: "/admin/customers",
    children: [
      { title: "All Customers", path: "/admin/customers" },
      { title: "Add Customer", path: "/admin/customers/add" },
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
      { title: "CertificateDetails", path: "/admin/certificates/CertificateDetails" },
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
      { title: "PaymentDetails", path: "/admin/payments/PaymentDetails" },
      { title: "Transactions", path: "/admin/payments/Transactions" },
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
    ],
  },
];

// =====================================================
// COMPONENT
// =====================================================
export default function AdminSidebar({ notifyCount = 0 }) {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const userName = localStorage.getItem("ADMIN_NAME") || "Admin";

  const [openMenus, setOpenMenus] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🔥 ACTIVE MENU FIX
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
    <Box sx={{ width: 260, height: "100vh", background: "#020617", color: "white", display: "flex", flexDirection: "column" }}>
      {/* HEADER */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={{ bgcolor: "#2563eb" }}>{userName[0]}</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={700}>Admin Panel</Typography>
          <Typography fontSize={12} color="#94a3b8">ADMIN</Typography>
        </Box>
        <IconButton size="small" sx={{ color: "white" }}>
          <Badge badgeContent={notifyCount} color="error">
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Box>

      <Divider />

      {/* MENU */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List>
          {menu.map((item) =>
            item.single ? (
              <ListItemButton
                key={item.title}
                component={NavLink}
                to={item.path}
                end
                sx={sidebarItemStyle}
              >
                <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ) : (
              <Box key={item.title}>
                <ListItemButton
                  sx={sidebarItemStyle}
                  onClick={() =>
                    setOpenMenus((p) => ({ ...p, [item.title]: !p[item.title] }))
                  }
                >
                  <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  <ExpandMoreIcon
                    sx={{
                      transform: openMenus[item.title] ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </ListItemButton>

                <Collapse in={openMenus[item.title]}>
                  <List sx={{ pl: 4 }}>
                    {item.children.map((sub) => (
                      <ListItemButton
                        key={sub.title}
                        component={NavLink}
                        to={sub.path}
                        sx={sidebarChildStyle}
                      >
                        <ListItemText primary={sub.title} />
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
        <IconButton onClick={() => setMobileOpen(true)}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
          {sidebarContent}
        </Drawer>
      </>
    );
  }

  return sidebarContent;
}

// =====================================================
const sidebarItemStyle = {
  mx: 1,
  mb: 0.5,
  borderRadius: 1,
  color: "white",
  "&.active": { bgcolor: "#2563eb" },
};

const sidebarChildStyle = {
  mb: 0.4,
  borderRadius: 1,
  color: "#cbd5f5",
  "&.active": { bgcolor: "#2563eb" },
};
