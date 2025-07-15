import React, { useEffect, useState } from "react";
import axios from "axios";
import "./itinerary.css";

const Itinerary = ({ itinerary }) => {
  const [parsedItinerary, setParsedItinerary] = useState([]);
  const [images, setImages] = useState({});

  const fetchImage = async (place) => {
    if (images[place]) return; // already fetched

    try {
      const res = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: place,
          per_page: 1,
          orientation: "landscape",
        },
        headers: {
          Authorization: `Client-ID laf-OQQgROwdyKh5C_X3EBPx2I2iS4-ghCtkSLMkQMg`,
        },
      });

      const url = res.data.results[0]?.urls?.regular || "";
      setImages((prev) => ({ ...prev, [place]: url }));
    } catch (err) {
      console.error("Failed to load image for", place, err);
      setImages((prev) => ({ ...prev, [place]: "" }));
    }
  };

  const extractJsonFromText = (text) => {
    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]") + 1;

    if (startIndex === -1 || endIndex === -1) return null;

    const jsonPart = text.slice(startIndex, endIndex);

    try {
      return JSON.parse(jsonPart);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return null;
    }
  };

  useEffect(() => {
    const parsed = typeof itinerary === "string" ? extractJsonFromText(itinerary) : itinerary;
    if (parsed) {
      setParsedItinerary(parsed);

      // Load images
      const places = new Set();
      parsed.forEach((day) =>
        day.activities.forEach((act) => places.add(act.place.trim()))
      );
      places.forEach((place) => fetchImage(place));
    }
  }, [itinerary]);

  const handleVR = (place) => {
    alert(`🚀 Launching VR view for: ${place}`);
    // <streetView place={place} />; // do such that the street view is shown in the other page  
  };

  return (
    <div className="itinerary-container">
      <h2>🗺️ Your Travel Itinerary</h2>
      {parsedItinerary.length > 0 &&
        parsedItinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="day-card">
            <h3>
              {day.day} - {day.date}
            </h3>
            {day.activities.map((act, idx) => (
              <div key={idx} className="activity-block">
                <p>
                  <strong>{act.time}</strong> - {act.title}
                </p>
                <p>
                  <em>{act.place}</em>
                </p>
                {images[act.place] && (
                  <img
                    src={images[act.place]}
                    alt={act.place}
                    className="itinerary-img"
                  />
                )}
                <button className="vr-btn" onClick={() => handleVR(act.place)}>
                  🕶️ Explore in VR
                </button>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Itinerary;
