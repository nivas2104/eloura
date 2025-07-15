import React, { useState } from 'react';
import './register.css';

function Register() {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    favourites: [],
    error: ''
  });

  const placeCategories = {
    Beaches: ['Goa', 'Pondicherry', 'Andaman'],
    Mountains: ['Manali', 'Ladakh', 'Darjeeling'],
    Heritage: ['Jaipur', 'Hampi', 'Khajuraho']
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "favourites") {
      setFormData(prevState => {
        const updatedFavourites = checked
          ? [...prevState.favourites, value]
          : prevState.favourites.filter(item => item !== value);
        return { ...prevState, favourites: updatedFavourites };
      });
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormData(prevState => ({ ...prevState, error: "Passwords don't match" }));
    } else {
      fetch('http://localhost:2000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.userName,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          favourites: formData.favourites
        })
      })
        .then((response) => response.json())
        .then((data) => {
          alert("User Created!!");
          console.log('Response:', data);
          setFormData({
            userName: '',
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            favourites: [],
            error: ''
          });
        })
        .catch(error => {
          alert("Not Created");
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Favourite Places:</label>
          <div className="favourites-section">
            {Object.entries(placeCategories).map(([category, places]) => (
              <div key={category} className="category-group">
                <strong>{category}</strong>
                {places.map(place => (
                  <label key={place} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="favourites"
                      value={place}
                      checked={formData.favourites.includes(place)}
                      onChange={handleChange}
                    />
                    {place}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">Sign Up</button>
        {formData.error && <p className="error-msg">{formData.error}</p>}
      </form>
    </div>
  );
}

export default Register;
