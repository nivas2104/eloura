import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaceDetails.css';

const UNSPLASH_ACCESS_KEY = 'laf-OQQgROwdyKh5C_X3EBPx2I2iS4-ghCtkSLMkQMg';
const OPENTRIPMAP_API_KEY = '5ae2e3f221c38a28845f05b64aae5c489bf2c22fcf0d40ffc261073c';

const PlaceDetails = ({ place }) => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!place) return;

    setLoading(true);

    // Fetch description from Wikipedia
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${place}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.extract) setDescription(data.extract);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Wiki error:', err);
        setLoading(false);
      });

    // Fetch coordinates from OpenTripMap
    axios
      .get('https://api.opentripmap.com/0.1/en/places/geoname', {
        params: {
          name: place,
          apikey: OPENTRIPMAP_API_KEY,
        },
      })
      .then((geoRes) => {
        console.log('Geo response:', geoRes.data); // Debugging API response
        if (geoRes.data.lat && geoRes.data.lon) {
          setCoords({
            lat: geoRes.data.lat,
            lon: geoRes.data.lon,
          });
        }
      })
      .catch((err) => {
        console.error('Geo error:', err);
      });

    // Fetch image from Unsplash
    fetch(`https://api.unsplash.com/search/photos?query=${place}&client_id=${UNSPLASH_ACCESS_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setImageUrl(data.results[0].urls.regular);
        }
      })
      .catch((err) => console.error('Unsplash error:', err));
  }, [place]);

  // Log the coordinates to debug if lat and lon are set properly
  useEffect(() => {
    console.log('Coordinates:', coords);
  }, [coords]);

  return (
    <div className="place-details">
      <h2 className="place-title">{place}</h2>

      {imageUrl && <img src={imageUrl} alt={place} className="place-image" />}

      {loading && <p className="loading">Loading...</p>}

      {!loading && (
        <>
          <div className="place-meta">
            <div className="rating">
              ★★★★☆ <span>(4.3 / 5)</span>
            </div>
            <div className="best-time">
              Best Time to Visit: <strong>November - February</strong>
            </div>
          </div>

          <p className="place-description">{description}</p>

          {/* Google Maps Street View */}
          {coords.lat && coords.lon ? (
            <div className="map-container">
              <iframe
                title="street-view"
                width="100%"
                height="450"
                allowFullScreen
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/streetview?key=YOUR_GOOGLE_API_KEY&location=${coords.lat},${coords.lon}&heading=210&pitch=10&fov=80`}
              ></iframe>
            </div>
          ) : (
            <p>Unable to load the map at the moment.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PlaceDetails;
