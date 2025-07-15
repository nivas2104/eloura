import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './streetView.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCAXD0Ye_sasSRpECPU_4I_gSn1berLqt8'; // Replace with your actual API key

const StreetView = ({ place: propPlace }) => {
  const { place: paramPlace } = useParams();
  const place = propPlace || paramPlace;

  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (!place) return;

    // Fetch coordinates from Google Geocoding API
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: encodeURIComponent(place), // Encoding the place to handle special characters
          key: GOOGLE_MAPS_API_KEY,
        },
      })
      .then((res) => {
        console.log('Geocoding API Response:', res.data);  // Log the API response
        const result = res.data.results[0];
        if (result) {
          const { lat, lng } = result.geometry.location;
          console.log(`Coordinates for ${place}: lat=${lat}, lon=${lng}`);  // Log the coordinates
          setCoordinates({ lat, lon: lng });
        } else {
          console.error('No results found for the place');
          setCoordinates(undefined); // No results found
        }
      })
      .catch((err) => {
        console.error('Error fetching coordinates:', err);
        setCoordinates(undefined); // In case of error
      });
  }, [place]);

  // Display loading message if coordinates are not yet fetched
  if (coordinates === null) {
    return <p>Loading Street View for <strong>{place}</strong>...</p>;
  }

  // Display error message if no valid coordinates were found
  if (coordinates === undefined) {
    return <p>❌ Could not find coordinates for <strong>{place}</strong>.</p>;
  }

  // Generate the Street View URL using the fetched coordinates
  const { lat, lon } = coordinates;
  const streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?key=${GOOGLE_MAPS_API_KEY}&location=${lat},${lon}&heading=210&pitch=10&fov=80`;

  return (
    <div className="map-container">
      <h2>🕶️ Street View: {place}</h2>
      <iframe
        title="Street View"
        width="100%"
        height="450"
        loading="lazy"
        allowFullScreen
        src={streetViewUrl}
        className='street-view-iframe'
      ></iframe>
    </div>
  );
};

export default StreetView;
