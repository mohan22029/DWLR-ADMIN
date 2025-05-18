import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapView = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [dwlrs, setDwlrs] = useState([]);

  useEffect(() => {
    const fetchDWLRData = async () => {
      try {
        const response = await axios.get("https://mock-api-jsia.onrender.com/DWLR_DATA");
        setDwlrs(response.data);
      } catch (error) {
        console.error("Error fetching DWLR data:", error);
      }
    };

    fetchDWLRData();
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
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || dwlrs.length === 0) return;

    dwlrs.forEach((d) => {
      if (d.latitude && d.longitude) {
        L.marker([d.latitude, d.longitude])
          .addTo(mapInstanceRef.current)
          .bindPopup(
            `<b>${d.location}</b><br/>Water Level: ${d.water_level} m<br/>Status: ${d.status}`
          );
      }
    });
  }, [dwlrs]);

  return (
    <div
      id="map"
      ref={mapRef}
      style={{ height: "400px", width: "100%", borderRadius: "10px", marginTop: "10px" }}
    />
  );
};

export default MapView;
