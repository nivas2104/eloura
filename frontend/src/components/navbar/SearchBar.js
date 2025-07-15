import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "5ae2e3f221c38a28845f05b64aae5c489bf2c22fcf0d40ffc261073c";
const BASE_URL = "https://api.opentripmap.com/0.1/en/places";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length > 2) {
        fetchPlaces(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchPlaces = async (text) => {
    try {
      const res = await axios.get(`${BASE_URL}/autosuggest`, {
        params: {
          apikey: API_KEY,
          name: text,
          radius: 5000,          // required
          lon: 77.2090,          // Delhi longitude (can change)
          lat: 28.6139,          // Delhi latitude
          limit: 10,
        },
      });

      const places = res.data.features || [];
      setSuggestions(places);
    } catch (err) {
      console.error("Error fetching places:", err);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.properties.name);
    setSuggestions([]);
    if (onSelect) onSelect(place);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search a place..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-50 bg-white w-full mt-1 border rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {place.properties.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
