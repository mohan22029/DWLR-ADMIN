import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import { AlertTriangle, Droplet, TrendingUp, BarChart2 } from 'lucide-react';

// Sample data generation function
const generateSampleData = () => {
  const sampleData = [];
  for (let i = 1; i <= 6; i++) {
    sampleData.push({
      id: i,
      location: `Location ${i}`,
      waterLevel: Math.floor(Math.random() * 100),
      change: (Math.random() * 10 - 5).toFixed(1),
      timestamp: new Date().toISOString(),
      anomaly: Math.random() > 0.7
    });
  }
  return sampleData;
};

const Dashboard = () => {
  const [dwlrData, setDwlrData] = useState([]);
  
  useEffect(() => {
    // Simulate API fetch with sample data
    const data = generateSampleData();
    setDwlrData(data);
    
    // Refresh data periodically to simulate real-time updates
    const interval = setInterval(() => {
      setDwlrData(generateSampleData());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Filters and stats calculation
  const totalDWLRs = dwlrData.length;
  const anomalies = dwlrData.filter(item => item.anomaly);
  const totalAnomalies = anomalies.length;
  const recentAlerts = [...anomalies].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="dashboard-content">
      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="card">
          <div className="title">
            <Droplet size={18} className="icon" /> DWLRs Monitored
          </div>
          <div className="value">{totalDWLRs}</div>
          <div className="percentage">
            <TrendingUp size={14} /> Active and reporting
          </div>
        </div>
        
        <div className="card">
          <div className="title">
            <AlertTriangle size={18} className="icon" /> Anomalies Detected
          </div>
          <div className="value">{totalAnomalies}</div>
          <div className="percentage">
            <TrendingUp size={14} /> {Math.round((totalAnomalies / totalDWLRs) * 100)}% of total
          </div>
        </div>
        
        <div className="card">
          <div className="title">
            <BarChart2 size={18} className="icon" /> Average Water Level
          </div>
          <div className="value">
            {Math.round(dwlrData.reduce((acc, curr) => acc + curr.waterLevel, 0) / totalDWLRs)}%
          </div>
          <div className="percentage">
            <TrendingUp size={14} /> Updated live
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="charts">
        <div className="chart-container">
          <h3>Water Level Trends</h3>
          <div className="chart-placeholder">
            {/* Placeholder for actual chart */}
            <div className="animated-chart">
              {dwlrData.map((item, index) => (
                <div 
                  key={item.id} 
                  className="chart-bar" 
                  style={{ 
                    height: `${item.waterLevel}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="chart-container">
          <h3>Anomaly Distribution</h3>
          <div className="chart-placeholder">
            {/* Placeholder for actual chart */}
            <div className="pie-chart-placeholder">
              <div className="pie-segment" style={{ transform: `rotate(${totalAnomalies/totalDWLRs * 360}deg)` }}></div>
              <div className="pie-center">
                <span>{Math.round((totalAnomalies / totalDWLRs) * 100)}%</span>
              </div>
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-color normal"></span> Normal
              </div>
              <div className="legend-item">
                <span className="legend-color anomaly"></span> Anomaly
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Alerts */}
      <div className="recent-alerts">
        <h3>Recent Alerts</h3>
        <ul>
          {recentAlerts.length > 0 ? (
            recentAlerts.map(alert => (
              <li key={alert.id} className="alert-item">
                <strong>{alert.location}</strong> - Anomaly detected at water level {alert.waterLevel}%
                <div className="alert-time">
                  {new Date(alert.timestamp).toLocaleTimeString()} - {new Date(alert.timestamp).toLocaleDateString()}
                </div>
              </li>
            ))
          ) : (
            <li>No recent alerts</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;