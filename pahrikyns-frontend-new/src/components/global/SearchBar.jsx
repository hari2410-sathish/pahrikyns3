import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={{
        background: "white",
        borderRadius: 2,
        width: 250,
        "& .MuiOutlinedInput-root": {
          fontSize: 14,
          paddingRight: 0,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
