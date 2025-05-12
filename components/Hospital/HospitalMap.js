import React, { useEffect, useState } from "react";
import location from "@/json/location.json";

function HospitalMap() {
  const [LMap, setLMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    // Dynamically import Leaflet & react-leaflet
    import("leaflet/dist/leaflet.css");
    import("react-leaflet").then(
      ({ MapContainer, TileLayer, CircleMarker, Popup }) => {
        setLMap(() => ({ MapContainer, TileLayer, CircleMarker, Popup }));
      }
    );

    // Get user location from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("loggedIn");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const lat = parsed.location?.lat;
          const lon = parsed.location?.lon;
          if (lat && lon) {
            setUserLocation([lat, lon]);
          }
        } catch (err) {
          console.error("Invalid user location in localStorage:", err);
        }
      }
    }

    // Fetch prediction data
    fetch("http://127.0.0.1:5000/predict/all")
      .then((res) => res.json())
      .then((data) => setPredictions(data.predictions || []))
      .catch((err) => console.error("Prediction fetch error:", err));
  }, []);

  const handlePopupClick = (state) => {
    console.log(state);
  };

  if (!LMap) return <div>Loading map...</div>;

  const { MapContainer, TileLayer, CircleMarker, Popup } = LMap;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      <MapContainer
        center={userLocation}
        zoom={7}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Base hospital markers */}
        {location.map((state, idx) => (
          <CircleMarker
            key={`hospital-${idx}`}
            center={[state.lat, state.lon]}
            radius={8}
            pathOptions={{
              color: "teal",
              fillColor: "teal",
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <div className="space-y-1">
                <p><strong>{state.hospital}</strong></p>
                <p>Lat: {state.lat.toFixed(4)}</p>
                <p>Lng: {state.lon.toFixed(4)}</p>
                <button
                  onClick={() => handlePopupClick(state)}
                  className="text-teal-600 underline text-sm mt-1"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Prediction overlays using will_be_crowded */}
        {predictions.map((prediction, idx) => {
          const match = location.find((h) => h.hospital === prediction.hospital);
          if (!match) return null;

          const color = prediction.will_be_crowded ? "red" : "green";
          const label = prediction.will_be_crowded ? "Very Crowded" : "Not Crowded";

          return (
            <CircleMarker
              key={`prediction-${idx}`}
              center={[match.lat, match.lon]}
              radius={10}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.6,
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <p><strong>{prediction.hospital}</strong></p>
                  <p>Prediction for: {prediction.date}</p>
                  <p>Crowd Status: <span className="font-semibold">{label}</span></p>
                  <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* User marker */}
        {userLocation && (
          <CircleMarker
            center={userLocation}
            radius={10}
            pathOptions={{
              color: "blue",
              fillColor: "blue",
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <strong>You are here</strong>
            </Popup>
          </CircleMarker>
        )}
      </MapContainer>
    </div>
  );
}

export default HospitalMap;
