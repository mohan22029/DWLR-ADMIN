import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F'];

const AnomalyPieChart = () => {
  const [anomalyData, setAnomalyData] = useState([]);

  useEffect(() => {
    axios.get('https://api-creation-2-gntq.onrender.com/data')
      .then(res => {
        const counts = res.data.reduce((acc, curr) => {
          const key = curr.Anomaly === "Yes" ? "Alert" : "Normal";
          acc[key] = acc[key] ? acc[key] + 1 : 1;
          return acc;
        }, {});
        const pieData = Object.entries(counts).map(([name, value]) => ({ name, value }));
        setAnomalyData(pieData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="chart-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Anomaly Type Distribution</h3>
      <PieChart width={300} height={250}>
        <Pie
          data={anomalyData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {anomalyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default AnomalyPieChart;
