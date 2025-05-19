import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './MapView.css';


// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;

// Define a custom circle icon using SVG
const customIcon = new L.DivIcon({
  html: `
    <svg height="24" width="24" viewBox="0 0 24 24" style="transform: translate(-12px, -24px);">
      <circle cx="12" cy="12" r="10" fill="#2A9D8F" stroke="white" stroke-width="2" />
    </svg>
  `,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const MapView = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [telemetryData, setTelemetryData] = useState({});

  useEffect(() => {
    const fetchTelemetryData = async () => {
      try {
        const response = await fetch('/district_telemetry_data1.json');
        const data = await response.json();
        setTelemetryData(data);
      } catch (error) {
        console.error("Error fetching telemetry data:", error);
      }
    };

    fetchTelemetryData();
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629], // Center of India
      zoom: 5,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      dragging: true,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || Object.keys(telemetryData).length === 0) return;

    Object.entries(telemetryData).forEach(([district, info]) => {
      info.telemetries.forEach((tele, index) => {
        if (tele.latitude && tele.longitude) {
          const marker = L.marker([tele.latitude, tele.longitude], { icon: customIcon })
            .addTo(mapInstanceRef.current);

          marker.bindTooltip(tele.uid);

          marker.bindPopup(`
            <div>
              <strong>Telemetry UID:</strong> ${tele.uid}<br />
              <strong>District:</strong> ${district}<br />
              <strong>Avg Water Level (m):</strong> ${tele.avg_water_level}
            </div>
          `);
        }
      });
    });
  }, [telemetryData]);

  return (
    <div
      id="map"
      ref={mapRef}
      style={{ height: "400px", width: "100%", borderRadius: "10px", marginTop: "10px" }}
    />
  );
};

export default MapView;