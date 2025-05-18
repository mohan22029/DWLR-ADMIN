import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import KPICards from "./components/KPICards";
import WaterLevelChart from "./components/WaterLevelChart";
import AnomalyPieChart from "./components/AnomalyPieChart";
import SensorStatusBarChart from "./components/SensorStatusBarChart";
import RecentAlerts from "./components/RecentAlerts";
import MapView from "./components/MapView";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Alert from './components/Alert'; // <- Add this line
import AnomalyFeature from './components/Anomaly';
import  NewsPage from './components/news';
const App = () => {
  const theme = useTheme();
  const [dwlrData, setDwlrData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://mock-api-jsia.onrender.com/DWLR_DATA");
        const dataWithCoords = res.data.map(item => ({
          ...item,
          lat: item.lat || (2 + (Math.random() - 0.5) * 5),
          lng: item.lng || (7 + (Math.random() - 0.5) * 20),
        }));
        setDwlrData(dataWithCoords);
      } catch (err) {
        console.error("Error fetching DWLR data:", err);
        setDwlrData([
          { id: "1", water_level: 5.2, anomaly: false, lat: 20.5937, lng: 78.9629, timestamp: "2025-05-17" },
          { id: "2", water_level: 3.8, anomaly: true, lat: 22.5937, lng: 80.9629, timestamp: "2025-05-17" },
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className={`app ${theme.palette.mode}`}>
        <Sidebar />
        <main className="dashboard">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <KPICards data={dwlrData} />
                  <MapView data={dwlrData} />
                  <WaterLevelChart data={dwlrData} />
                  <div className="charts">
                   
                    <AnomalyPieChart data={dwlrData} />
                    <SensorStatusBarChart data={dwlrData} />
                  </div>
                  <RecentAlerts data={dwlrData.filter((d) => d.anomaly)} />
                </>
              }
            />
            <Route path="/news" element={<NewsPage/>} />
            <Route path="/alert" element={<Alert/>} />
            <Route path="/anomaly" element={<AnomalyFeature />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
//import NewsPage from "./components/NewsPage";