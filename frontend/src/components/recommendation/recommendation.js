import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './recommendation.css';

const UNSPLASH_ACCESS_KEY = 'laf-OQQgROwdyKh5C_X3EBPx2I2iS4-ghCtkSLMkQMg';

export default function Recommendation({ places: favs }) {
  const [places, setPlaces] = useState([]);
  const [images, setImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:5000/recommend', {
          favorites: favs
        });
        const recommended = res.data.places;

        setPlaces(recommended);

        // fetch images from Unsplash
        recommended.forEach(async (place) => {
          try {
            const imgRes = await fetch(
              `https://api.unsplash.com/search/photos?query=${place}&client_id=${UNSPLASH_ACCESS_KEY}`
            );
            const imgData = await imgRes.json();
            if (imgData.results?.[0]) {
              setImages((prev) => ({
                ...prev,
                [place]: imgData.results[0].urls.regular
              }));
            }
          } catch (err) {
            console.error(`Error loading image for ${place}:`, err);
          }
        });
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };

    if (favs.length > 0) fetchRecommendations();
  }, [favs]);

  return (
    <div className="recommendation-section">
      <h2 className="recommendation-title">Recommended Places</h2>
      <div className="recommendation-grid">
        {places.map((place, idx) => (
          <div
            className="place-card"
            key={idx}
            onClick={() => navigate(`/travel/${place}`)}
          >
            <img
              src={images[place]}
              alt={place}
              className="place-image"
              loading="lazy"
            />
            <div className="place-name">{place}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
