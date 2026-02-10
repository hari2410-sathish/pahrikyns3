import { TextField, Box, Chip } from "@mui/material";
import { useState } from "react";

const PRESET_FILTERS = ["has:file", "has:emoji"];

export default function MessageSearch({ query, setQuery, filters, setFilters }) {
  const toggle = (f) =>
    setFilters((p) =>
      p.includes(f) ? p.filter((x) => x !== f) : [...p, f]
    );

  return (
    <Box display="flex" gap={1} alignItems="center">
      <TextField
        size="small"
        placeholder="Search messages… (from:hari has:file)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />

      {PRESET_FILTERS.map((f) => (
        <Chip
          key={f}
          size="small"
          label={f}
          onClick={() => toggle(f)}
          color={filters.includes(f) ? "primary" : "default"}
        />
      ))}
    </Box>
  );
}
