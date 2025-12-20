import React from "react";
import { Box } from "@mui/material";

/** ========================================================
 * RESUME ADMIN — PRO VERSION (v1)
 * Admin Dashboard
 * - Overview Cards
 * - Template Usage
 * - User Stats (placeholder)
 * - Clean admin UI
 * ======================================================== */

export default function ResumeAdmin() {
  return (
    <Box className="min-h-screen bg-gray-50 p-6 flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* STATS GRID */}
      <Box className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Box className="bg-white p-6 shadow rounded-xl text-center">
          <h3 className="font-semibold text-xl">Total Resumes</h3>
          <p className="text-gray-600 text-3xl mt-2">154</p>
        </Box>

        <Box className="bg-white p-6 shadow rounded-xl text-center">
          <h3 className="font-semibold text-xl">Active Users</h3>
          <p className="text-gray-600 text-3xl mt-2">87</p>
        </Box>

        <Box className="bg-white p-6 shadow rounded-xl text-center">
          <h3 className="font-semibold text-xl">Pro Subscribers</h3>
          <p className="text-purple-600 text-3xl mt-2">23</p>
        </Box>
      </Box>

      {/* TEMPLATE USAGE */}
      <Box className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Template Usage Stats</h2>
        <p className="text-gray-600">(This section will show chart analytics)</p>
      </Box>

      {/* USER MANAGEMENT PLACEHOLDER */}
      <Box className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <p className="text-gray-600">User list will be displayed here.</p>
      </Box>
    </Box>
  );
}
