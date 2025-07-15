import Navbar from './components/navbar/navbar';
import Hero from './components/hero/hero.js';
import './App.css';
import Button from './components/button/button.js';
import Month from './components/month/month.js';
import Todo from './components/todo/todo.js';
import Footer from './components/footer/footer.js';
import Feedback from './components/feedback/feedback.js';
import Calender from './components/calender/calender.js';
import Chatbox from './Chatbox/chatbox.js';
import { useState, useEffect } from 'react';
import robot from './robot.avif';
import Recommendation from './components/recommendation/recommendation.js';

function App() {
  const [displayChat, setChat] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const loadFavourites = () => {
    const favFromStorage = localStorage.getItem("favourites");
    if (favFromStorage) {
      try {
        const parsedFav = JSON.parse(favFromStorage);
        setFavourites(parsedFav);
      } catch (err) {
        console.error("Error parsing favourites from localStorage:", err);
      }
    }
  };

  useEffect(() => {
    loadFavourites(); // Load on initial render

    // Listen for manual storage event dispatch (after login)
    const handleStorageChange = () => {
      loadFavourites();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleChatboxClick = (e) => {
    e.stopPropagation();
  };

  const toggleChatbox = (e) => {
    e.stopPropagation();
    setChat(!displayChat);
  };

  return (
    <div className="App dm-sans" onClick={() => setChat(false)}>
      <Navbar />
      <Hero />
      <Button />
      <Month />
      <div className='agent-button'>
        <h2>🧳 Travel Planner Assistant</h2>
        <h3>Plan your trip with our AI Travel Assistant</h3>
        <a href='http://localhost:3000/travel-agent'>
          <button  className='button-main'>Plan Trip</button>
        </a>
      </div>
      {favourites.length > 0 && <Recommendation places={favourites} />}
      <Feedback />
      <Footer />

      <div className='boxc' onClick={toggleChatbox}>
        {displayChat && (
          <div onClick={handleChatboxClick}>
            <Chatbox />
          </div>
        )}
        <img alt="robot" src={robot} className='robot' />
      </div>
    </div>
  );
}

export default App;
