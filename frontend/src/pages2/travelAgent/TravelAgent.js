import React, { useState } from "react";
import "./TravelAgent.css";
import axios from "axios";
import Itinerary from "../itenary/itinerary"; 
import Navbar from "../../components/navbar/navbar";

const TravelAgent = () => {
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    preferences: "",
  });

  const [chat, setChat] = useState(""); // Add state for chat history
  const [input, setInput] = useState(""); // Add state for user input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);

    try {
      const response = await axios.post('http://localhost:2001/api/plan', {
        ...formData,
        history: chat,
      });
      console.log("Response:", response.data.generatedText);
      // Update chat with user input and response
      setChat(
        response.data.generatedText
        
      );

      // Clear the input field
      setInput("");
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div className="travel-main">
      <div className="navbar">
      <Navbar/>
      </div>
      <div className="travel-container">
        <h2>🧳 Travel Planner Assistant</h2>
        <form onSubmit={handleSubmit} className="travel-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination (e.g., Kyoto)"
            value={formData.destination}
            onChange={handleChange}
          />
          <div className="date-group">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
          <input
            type="number"
            name="budget"
            placeholder="Budget (INR)"
            value={formData.budget}
            onChange={handleChange}
          />
          <textarea
            name="preferences"
            placeholder="Travel preferences (e.g., culture, food, nature)"
            value={formData.preferences}
            onChange={handleChange}
            rows={4}
          />
          <button type="submit">Plan My Trip</button>
        </form>
        
        
      </div>
        {chat && 
          <div className="chat-container">
            <Itinerary itinerary={chat} /> 
          </div>
        }
    </div>
  );
};

export default TravelAgent;
