import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { Brightness7, DarkMode } from "@mui/icons-material";
import StatBox from "../components/StatBox";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import LeafletMap from "../components/LeafletMap";
import RecentAlerts from "../components/RecentAlerts";
import axios from "axios";

const Dashboard = ({ toggleTheme }) => {
  const theme = useTheme();
  const [dwlrData, setDwlrData] = useState([]);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api-creation-1hfb.onrender.com/data");
        // Add random coordinates for India if not provided
        const dataWithCoords = res.data.map(item => ({
          ...item,
          lat: item.lat || (20.5937 + (Math.random() - 0.5) * 10), // Random lat around India
          lng: item.lng || (78.9629 + (Math.random() - 0.5) * 20), // Random lng around India
        }));
        setDwlrData(dataWithCoords);
      } catch (err) {
        console.error("Error fetching DWLR data:", err);
      }
    };

    const fetchQuote = async () => {
      try {
        const res = await axios.get("https://api.quotable.io/random?tags=wisdom|inspirational");
        setQuote(res.data.content);
      } catch (err) {
        console.error("Error fetching quote:", err);
        setQuote("Water is life. Preserve it.");
      }
    };

    fetchData();
    fetchQuote();
  }, []);

  const filteredData = dwlrData;
  const totalDWLRs = filteredData.length;
  const totalAnomalies = filteredData.filter((d) => d.anomaly).length;

  return (
    <Box sx={{ px: 3, py: 2 }} className="dashboard">
      {/* Header */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "#1e1e2f" : "#e0f7fa",
          borderRadius: 2,
          mb: 4,
          px: 4,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {/* Title Row */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" fontWeight="bold">
            DWLR Monitoring Dashboard
          </Typography>
          <IconButton onClick={toggleTheme} sx={{ ml: 2 }}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <DarkMode />}
          </IconButton>
        </Box>

        {/* Quote */}
        <Box
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#333" : "#f1f8e9",
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontStyle: "italic", color: "text.secondary" }}>
            “{quote}”
          </Typography>
        </Box>
      </Box>

      {/* KPIs */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }} className="kpi-cards">
        <StatBox title="DWLRs Monitored" value={totalDWLRs} />
        <StatBox title="Anomalies Detected" value={totalAnomalies} />
      </Box>

      {/* Map */}
      <Box sx={{ mb: 4 }}>
        <LeafletMap data={filteredData} />
      </Box>

      {/* Charts */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }} className="charts">
        <LineChart data={filteredData} />
        <BarChart data={filteredData} />
      </Box>

      {/* Alerts */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <RecentAlerts data={filteredData.filter((d) => d.anomaly)} />
      </Box>
    </Box>
  );
};

export default Dashboard;