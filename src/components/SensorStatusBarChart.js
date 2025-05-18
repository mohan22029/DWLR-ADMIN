import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const SensorStatusBarChart = () => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    axios.get('https://mock-api-jsia.onrender.com/DWLR_DATA')
      .then(res => {
        const grouped = {};
        res.data.forEach(item => {
          if (!grouped[item.District]) {
            grouped[item.District] = { Normal: 0, Alert: 0 };
          }
          item.Anomaly === "Normal" ? grouped[item.District].Normal++ : grouped[item.District].Alert++;
        });

        const data = Object.entries(grouped).map(([district, values]) => ({
          name: district,
          Normal: values.Normal,
          Alert: values.Alert
        }));

        setBarData(data);
      });
  }, []);

  return (
    <div className="chart-container">
      <h3>Sensor Health by District</h3>
      <BarChart width={500} height={250} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Normal" fill="#82ca9d" />
        <Bar dataKey="Alert" fill="#ff7300" />
      </BarChart>
    </div>
  );
};

export default SensorStatusBarChart;
