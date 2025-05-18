import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const SensorStatusBarChart = () => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://api-creation-2-gntq.onrender.com/data')
        .then(res => {
          const districts = ["Agarmalwa", "Alirajpur", "Shivpuri", "Anuppur"];
          const grouped = {};

          districts.forEach(d => {
            grouped[d] = { Normal: 0, Alert: 0 };
          });

          res.data.forEach(item => {
            const district = item.District;
            if (districts.includes(district)) {
              if (item.Anomaly && item.Anomaly.toLowerCase() === "no") {
                grouped[district].Normal++;
              } else {
                grouped[district].Alert++;
              }
            }
          });

          console.log("Grouped data:", grouped);

          const data = districts.map(district => ({
            name: district,
            Normal: grouped[district].Normal,
            Alert: grouped[district].Alert,
          }));

          console.log("Bar data:", data);

          setBarData(data);
        })
        .catch(err => {
          console.error("Error fetching data:", err);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
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