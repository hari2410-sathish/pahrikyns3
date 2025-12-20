import React from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import DarkModeToggle from "../mobile/DarkModeToggle";

/* ============================================================
   RESUME NAVBAR — PRO VERSION (V12)
   ------------------------------------------------------------
   ✔ No crashes
   ✔ Perfect Dark Mode integration
   ✔ Clickable Stepper
   ✔ Clean layout
   ✔ Resume.io style
   ============================================================ */

const steps = [
  { id: "personal", label: "Personal" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "preview", label: "Preview" },
];

export default function ResumeNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active step
  const currentPath = location.pathname.split("/").pop();
  const activeIndex = steps.findIndex((s) => s.id === currentPath);

  const goTo = (id) => navigate(`/resume/builder/${id}`);

  return (
    <Box className="w-full bg-white dark:bg-gray-900 dark:text-white border-b px-4 py-3 flex flex-col gap-4 shadow-sm select-none">
      {/* ================= TOP NAV BAR ================= */}
      <Box className="flex items-center justify-between">
        
        {/* LEFT: BRAND / LOGO */}
        <Box className="flex items-center gap-2 cursor-pointer"
             onClick={() => navigate("/resume")}>
          <HomeIcon className="text-gray-700 dark:text-gray-200" />
          <h1 className="font-semibold text-xl">Resume Builder</h1>
        </Box>

        {/* RIGHT SIDE — Template button + Dark mode */}
        <Box className="flex items-center gap-3">
          <Button
            variant="contained"
            onClick={() => navigate("/resume/templates")}
            startIcon={<DescriptionIcon />}
          >
            Change Template
          </Button>

          {/* DESKTOP DARK MODE SWITCH */}
          <Box className="hidden lg:block">
            <DarkModeToggle />
          </Box>
        </Box>
      </Box>

      {/* ================= STEPPER NAVIGATION ================= */}
      <Stepper
        activeStep={activeIndex}
        alternativeLabel={!isMobile}
        className="pb-2"
      >
        {steps.map((step) => (
          <Step
            key={step.id}
            onClick={() => goTo(step.id)}
            className="cursor-pointer"
          >
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
