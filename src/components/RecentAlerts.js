import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('https://mock-api-jsia.onrender.com/DWLR_DATA')
      .then(res => {
        const alertData = res.data.filter(item => item.Anomaly !== 'Normal');
        setAlerts(alertData);
      });
  }, []);

  return (
    <div className="recent-alerts">
      <h3>Recent Alerts</h3>
      <ul>
        {alerts.map((alert, idx) => (
          <li key={idx}>
            <strong>{alert.Telemetry_UID}</strong> - {alert["Date & Time"]} - {alert.Anomaly}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAlerts;
