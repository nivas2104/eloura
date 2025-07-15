import './navbar.css';
import { useEffect, useState } from 'react';
import { jwtVerify } from 'jose';

export default function Navbar() {
    function moveBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    const [login, setLogin] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const verifyToken = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                const secret = new TextEncoder().encode('nikash@123superSecret!');
                try {
                    const { payload } = await jwtVerify(accessToken, secret);
                    setLogin(true);
                    setUserName(payload.userName);
                } catch (error) {
                    console.error('Token verification failed:', error.message);
                }
            }
        };
        verifyToken();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3000/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                localStorage.removeItem("accessToken");
                setLogin(false);
                setUserName("");
                window.location.href = "/login";
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const [place, setPlace] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (place.trim().length === 0) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
                const data = await res.json();
                const cityNames = data.map(item => 
                    item.address?.city || item.address?.town || item.address?.village || item.display_name.split(",")[0]
                );
                const uniqueNames = [...new Set(cityNames)];
                setSuggestions(uniqueNames.slice(0, 5));
            } catch (error) {
                console.error("Suggestion fetch error:", error);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
        return () => clearTimeout(timeoutId);
    }, [place]);

    function handleSearch() {
        window.location.href = `http://localhost:3000/travel/${place}`;
    }

    function handleSuggestionClick(suggestion) {
        setPlace(suggestion);
        setSuggestions([]);
        window.location.href = `http://localhost:3000/travel/${suggestion}`;
    }

    return (
        <nav className="nav">
            <a className="logo1" href="http://localhost:3000/">
                <h2 className="logo dm-sans"><span className="logo-vr1">Elouraᨒ</span></h2>
            </a>

            <div id="search-box">
                <div className="search-wrapper">
                    <input
                        className="search-input"
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        placeholder="Search places..."
                    />
                    {suggestions.length > 0 && (
                        <div className="suggestion-list">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>

            <div className="nav-options">
                <ul className="nav-list">
                    <li><a href="http://localhost:3000/explore">EXPLORE</a></li>
                    {!login && <li className="darkB"><a href='http://localhost:3000/register'>REGISTER</a></li>}
                    {!login && <li className="darkB"><a href='http://localhost:3000/login'>SIGN IN</a></li>}
                    {login && <li className="darkB" onClick={handleLogout}>LOG OUT</li>}
                    <li onClick={moveBottom}><a href="#">CONTACT US</a></li>
                    <li className="user">{userName}</li>
                </ul>
            </div>
        </nav>
    );
}
