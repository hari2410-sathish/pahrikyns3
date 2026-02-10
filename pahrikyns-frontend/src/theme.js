import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3b82f6", // Bright Blue
            light: "#60a5fa",
            dark: "#2563eb",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#8b5cf6", // Violet
            light: "#a78bfa",
            dark: "#7c3aed",
            contrastText: "#ffffff",
        },
        background: {
            default: "#0f172a", // Slate 900
            paper: "#1e293b",   // Slate 800
        },
        text: {
            primary: "#f8fafc", // Slate 50
            secondary: "#94a3b8", // Slate 400
        },
        success: {
            main: "#10b981", // Emerald 500
        },
        error: {
            main: "#ef4444", // Red 500
        },
        warning: {
            main: "#f59e0b", // Amber 500
        },
        info: {
            main: "#0ea5e9", // Sky 500
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    padding: "8px 16px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    },
                },
                containedPrimary: {
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                },
                containedSecondary: {
                    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none", // Prevent default overlay in dark mode
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#1e293b80", // Transparent slate
                    backdropFilter: "blur(12px)",
                    boxShadow: "none",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    backgroundColor: "rgba(30, 41, 59, 0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                },
            },
        },
    },
});

export default theme;
