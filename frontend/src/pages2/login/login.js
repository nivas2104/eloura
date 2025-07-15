import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Importing external CSS

export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("signup") === "success") {
      setSuccessMessage("Successfully signed up! Please log in.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2000/login", formData);
      const { accessToken, favourites } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      window.dispatchEvent(new Event("storage"));

      alert("Login Successful!");
      navigate("/"); // Change as per your routing
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <div className="register-text">
          Not signed up?{" "}
          <span onClick={() => navigate("/register")} className="register-link">
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}
