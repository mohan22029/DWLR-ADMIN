import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LeafletMap = ({ data }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [20.5937, 78.9629], // Center of India
      zoom: 5,
      scrollWheelZoom: false,
    });

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !data) return;

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add markers for DWLR data
    data.forEach((item) => {
      if (item.lat && item.lng) {
        const marker = L.marker([item.lat, item.lng], {
          icon: L.icon({
            iconUrl: item.anomaly
              ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
              : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            shadowSize: [41, 41],
          }),
        }).addTo(mapInstanceRef.current);

        // Popup content
        const popupContent = `
          <div style="font-family: 'Segoe UI', sans-serif; color: #1e293b;">
            <h3 style="margin: 0 0 10px; font-size: 1.1rem; color: #3b82f6;">DWLR Location</h3>
            <p style="margin: 5px 0;"><strong>ID:</strong> ${item.id || "N/A"}</p>
            <p style="margin: 5px 0;"><strong>Water Level:</strong> ${item.water_level || "N/A"} m</p>
            <p style="margin: 5px 0;"><strong>Anomaly:</strong> ${item.anomaly ? "Yes" : "No"}</p>
            <p style="margin: 5px 0;"><strong>Timestamp:</strong> ${item.timestamp || "N/A"}</p>
            <p style="margin: 5px 0;"><strong>Location:</strong> (${item.lat.toFixed(4)}, ${item.lng.toFixed(4)})</p>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          minWidth: 200,
        });
      }
    });
  }, [data]);

  return (
    <Box
      className="chart-container"
      sx={{
        height: "400px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </Box>
  );
};

export default LeafletMap;