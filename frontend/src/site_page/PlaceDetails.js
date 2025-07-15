import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PlaceDetails.css';
import Navbar from '../components/navbar/navbar';
import Nearby from './Nearby';
import Chatbox from '../Chatbox/chatbox';
import robot from './robot.avif';
import StreetView from '../pages2/streetView/streetView';


const UNSPLASH_ACCESS_KEY = 'laf-OQQgROwdyKh5C_X3EBPx2I2iS4-ghCtkSLMkQMg';

const PlaceDetails = () => {
  const { place } = useParams();
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [displayChat, setChat] = useState(false);


  useEffect(() => {
    if (!place) return;

    setLoading(true);
    setImageUrls([]); // Reset images when place changes

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${place}`)
      .then(res => res.json())
      .then(data => {
        if (data.extract) setDescription(data.extract);
        if (data.originalimage?.source) {
          setImageUrls(prev => [...prev, data.originalimage.source]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Wiki error:', err);
        setLoading(false);
      });

    fetch(`https://api.unsplash.com/search/photos?query=${place}&client_id=${UNSPLASH_ACCESS_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.results?.length) {
          const urls = data.results.map(img => img.urls.regular);
          setImageUrls(prev => [...prev, ...urls]);
        }
      })
      .catch(err => console.error('Unsplash error:', err));
  }, [place]);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  //chat box
  const toggleChatbox = (e) => {
    e.stopPropagation();
    setChat(!displayChat);
  };
  const handleChatboxClick = (e) => {
    e.stopPropagation();
  };
  const [highlight, setHighlight] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlight(false);
    }, 5000); // 5000 ms = 5 sec

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Navbar />
      <div className="place-details">
        <h2 className="place-title">{place}</h2>

        {imageUrls.length > 0 && (
          <div className="slider-container">
            <button className="slider-btn left" onClick={prevImage}>❮</button>
            <img src={imageUrls[currentIndex]} alt={`${place}-${currentIndex}`} className="place-image" />
            <button className="slider-btn right" onClick={nextImage}>❯</button>
          </div>
        )}

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
            <Nearby place={place}/>
            <div className="map-container">
              <iframe
                title="map"
                src={`https://www.google.com/maps?q=${place}&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div className="map-container">
            <StreetView place={place} />
            </div>
          </>
        )}
      </div>
      <div className='boxc' onClick={toggleChatbox}>
        <h2 className={`chat-text ${highlight?"highlight":""}`}>queries about {place}?</h2>
              {displayChat && (
                <div onClick={handleChatboxClick}>
                  <Chatbox place={place}/>
                </div>
              )}
              <img alt="robot" src={robot} className='robot' />
      </div>
    </>
  );
};

export default PlaceDetails;
