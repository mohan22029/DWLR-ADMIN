import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Typography } from "@mui/material";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapView = ({ data }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  console.log("MapView rendered with data:", data);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) {
      console.log("Map not initialized: ", { mapRef: !!mapRef.current, mapInstance: !!mapInstanceRef.current });
      return;
    }

    console.log("Initializing map");
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        console.log("Cleaning up map");
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !data) {
      console.log("No map instance or data:", { mapInstance: !!mapInstanceRef.current, data });
      return;
    }

    console.log("Updating markers with data:", data);
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

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

        const avgWaterLevel = data.length
          ? (data.reduce((sum, item) => sum + (item.water_level || 0), 0) / data.length).toFixed(2)
          : "N/A";

        const popupContent = `
          <div style="font-family: 'Poppins', sans-serif; color: #1e293b;">
            <h3 style="margin: 0 0 10px; font-size: 1.1rem; color: #3b82f6;">DWLR Location</h3>
            <p style="margin: 5px 0;"><strong>ID:</strong> ${item.id || "N/A"}</p>
            <p style="margin: 5px 0;"><strong>Water Level:</strong> ${item.water_level || "N/A"} m</p>
            <p style="margin: 5px 0;"><strong>Average Water Level:</strong> ${avgWaterLevel} m</p>
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
        height: "300px", // Consistent height for the row
        flex: 1,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Typography variant="h6">
        DWLR Locations
      </Typography>
      <div ref={mapRef} style={{ height: "calc(100% - 40px)", width: "100%", minHeight: "260px" }} />
    </Box>
  );
};

export default MapView;