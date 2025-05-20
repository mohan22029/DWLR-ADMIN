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
import Alert from './components/Alert';
import AnomalyFeature from './components/Anomaly';
import NewsPage from './components/news';
import axios from "axios";
import Predict from "./components/Prediction";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dwlrData, setDwlrData] = useState([]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    axios.get("https://mock-api-jsia.onrender.com/DWLR_DATA")
      .then((res) => setDwlrData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => {
    console.log('App: Toggling sidebar, new state:', !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="dashboard">
          <Header theme={theme} toggleTheme={toggleTheme} />
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
                 
                </>
              }
            />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/alert" element={<Alert />} />
            <Route path="/anomaly" element={<AnomalyFeature />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;