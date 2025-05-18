import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const KPICards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://mock-api-jsia.onrender.com/DWLR_DATA')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const uniqueSensors = new Set(data.map(item => item.Telemetry_UID)).size;
  const totalAnomalies = data.filter(item => item.Anomaly !== 'Normal').length;
  const locations = new Set(data.map(item => item.District)).size;

  return (
    <div className="kpi-cards">
      <div className="card">DWLRs Monitored: {uniqueSensors}</div>
      <div className="card">Anomalies Detected: {totalAnomalies}</div>
      <div className="card">Locations Reporting: {locations}</div>
      <div className="card">Alerts Triggered: {totalAnomalies}</div>
    </div>
  );
};

export default KPICards;
