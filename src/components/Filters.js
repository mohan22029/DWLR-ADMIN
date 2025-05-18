import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";

export default function Filters({
  location,
  setLocation,
  locations = [],
  dateRange,
  setDateRange,
  darkMode = false,  // add this prop
}) {
  const [startDate, endDate] = dateRange || [null, null];

  // Define your color based on mode
  const textFieldStyles = {
    minWidth: 200,
    // Color for the label and input text:
    "& .MuiInputLabel-root": {
      color: darkMode ? "#9ca3af" : "#374151", // lighter gray in dark, darker gray in light
    },
    "& .MuiInputBase-input": {
      color: darkMode ? "#f3f4f6" : "#111827", // light text in dark, dark text in light
    },
    // For the border color of the outlined variant
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: darkMode ? "#4b5563" : "#d1d5db",
      },
      "&:hover fieldset": {
        borderColor: darkMode ? "#6b7280" : "#9ca3af",
      },
      "&.Mui-focused fieldset": {
        borderColor: darkMode ? "#60a5fa" : "#3b82f6", // blue focus color
      },
    },
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
      <TextField
        select
        label="Select Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={textFieldStyles}
      >
        <MenuItem value="">All</MenuItem>
        {locations.map((loc) => (
          <MenuItem key={loc} value={loc}>
            {loc}
          </MenuItem>
        ))}
      </TextField>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          views={["year", "month", "day"]}
          startText="Start Date"
          endText="End Date"
          value={[startDate ? dayjs(startDate) : null, endDate ? dayjs(endDate) : null]}
          onChange={(newValue) => setDateRange(newValue)}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} sx={textFieldStyles} />
              <Box sx={{ mx: 2, color: darkMode ? "#9ca3af" : "#374151", alignSelf: "center" }}>
                to
              </Box>
              <TextField {...endProps} sx={textFieldStyles} />
            </>
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
