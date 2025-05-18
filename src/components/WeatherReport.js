import React from "react";
import { Box, Typography } from "@mui/material";

const WeatherReport = ({ location }) => {
  const weatherData = {
    date: "2025-05-16",
    temperature: "28°C",
    humidity: "65%",
    precipitation: "2 mm",
  };

  return (
    <Box
      className="chart-container"
      sx={{
        height: "300px", // Match map height for consistency
        flex: 1,
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Typography variant="h6">
        Weather Report for {location}
      </Typography>
      <Typography component="p">
        <strong>Date:</strong> {weatherData.date}
      </Typography>
      <Typography component="p">
        <strong>Temperature:</strong> {weatherData.temperature}
      </Typography>
      <Typography component="p">
        <strong>Humidity:</strong> {weatherData.humidity}
      </Typography>
      <Typography component="p">
        <strong>Precipitation:</strong> {weatherData.precipitation}
      </Typography>
    </Box>
  );
};

export default WeatherReport;