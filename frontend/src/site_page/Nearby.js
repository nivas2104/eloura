import axios from "axios";
import { useState, useEffect } from "react";
import './Nearby.css';

const UNSPLASH_ACCESS_KEY = 'laf-OQQgROwdyKh5C_X3EBPx2I2iS4-ghCtkSLMkQMg';

export default function Nearby(props) {
  const place = props.place;
  const [nearby, setNearby] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch images from Unsplash based on the place
  useEffect(() => {
    if (place) {
      fetch(`https://api.unsplash.com/search/photos?query=${place}&client_id=${UNSPLASH_ACCESS_KEY}`)
        .then(res => res.json())
        .then(data => {
          console.log('Unsplash API Response:', data); // Log the data
          if (data.results && data.results.length > 0) {
            const urls = data.results.map(img => img.urls.small); // Use small images for better size
            setImageUrls(urls); // Store image URLs in the state
          }
        })
        .catch(err => {
          console.error('Error fetching images from Unsplash:', err);
        });
    }
  }, [place]);

  // Fetch nearby places using the OpenTripMap API
  useEffect(() => {
    if (place) {
      axios
        .get("https://api.opentripmap.com/0.1/en/places/geoname", {
          params: {
            name: place,
            apikey: '5ae2e3f221c38a28845f05b64aae5c489bf2c22fcf0d40ffc261073c',
          },
        })
        .then((geoRes) => {
          const { lat, lon } = geoRes.data;
          if (lat && lon) {
            return axios.get("https://api.opentripmap.com/0.1/en/places/radius", {
              params: {
                radius: 5000,
                lon,
                lat,
                rate: 3,
                format: "json",
                limit: 10,
                apikey: '5ae2e3f221c38a28845f05b64aae5c489bf2c22fcf0d40ffc261073c',
              },
            });
          }
        })
        .then((placesRes) => {
          if (placesRes) {
            console.log('Nearby Places:', placesRes.data); // Log nearby places
            setNearby(placesRes.data);
          }
        })
        .catch((err) => console.error('Error fetching nearby places:', err));
    }
  }, [place]);

  return (
    <div className="places">
      <div className="list">
        {nearby.map((e, i) => (
          <div key={i} className="place-item">
            <a href={`http://localhost:3000/travel/${e.name}`}>
              {imageUrls[i] && (
                <img src={imageUrls[i]} alt={e.name} />
              )}
              <div>{e.name}</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
