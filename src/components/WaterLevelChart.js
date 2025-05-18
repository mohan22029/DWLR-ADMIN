import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  CartesianGrid, ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const WaterLevelChart = () => {
  const [fullData, setFullData] = useState([]);     // All data
  const [chartData, setChartData] = useState([]);   // Incrementally shown data
  const [dayIndex, setDayIndex] = useState(0);       // Current day being fetched

  useEffect(() => {
    axios.get('https://mock-api-jsia.onrender.com/DWLR_DATA')
      .then(res => {
        const groupedByDate = {};

        res.data.forEach(entry => {
          const date = new Date(entry["Date & Time"]).toISOString().split("T")[0];
          if (!groupedByDate[date]) groupedByDate[date] = [];
          groupedByDate[date].push(entry);
        });

        // Sort dates and keep only 4 records per day
        const sorted = Object.keys(groupedByDate).sort();
        const perDayData = sorted.map(date => {
          const readings = groupedByDate[date]
            .sort((a, b) => new Date(a["Date & Time"]) - new Date(b["Date & Time"]))
            .slice(0, 4); // only 4 per day
          return readings;
        });

        setFullData(perDayData);
      });
  }, []);

  useEffect(() => {
    if (fullData.length === 0) return;

    const interval = setInterval(() => {
      if (dayIndex >= fullData.length) {
        clearInterval(interval);
        return;
      }

      setChartData(prev => [...prev, ...fullData[dayIndex]]);
      setDayIndex(prev => prev + 1);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [fullData, dayIndex]);

  return (
    <div className="chart-container">
      <h3>Water Level (Fetched 1 Day at a Time Every 10s)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date & Time" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Water Level (m)" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterLevelChart;
